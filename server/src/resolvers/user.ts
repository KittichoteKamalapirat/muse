import { User } from "../entities/User";
import {
  Arg,
  Ctx,
  Root,
  Field,
  FieldResolver,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import argon2 from "argon2";
import { MyContext } from "../types";
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX, __prod__ } from "../constants";
import { emitWarning } from "process";
import { UsernamePasswordInput } from "./UsernamePasswordInput";
import { validateRegister } from "../utils/validateRegister";
import { sendEmail } from "../utils/sendEmail";
import { v4 } from "uuid";
import { ContainerInterface, getConnection } from "typeorm";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/open-peeps";

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}
// For User
@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver(User)
export class UserResolver {
  @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { req }: MyContext) {
    if (user.id === req.session.userId) {
      // This is the current user and its ok to show them their own emails
      return user.email;
    }
    // current user watns to see someone elses email
    return "";
  }
  @Mutation(() => UserResponse)
  async changePassword(
    @Arg("newPassword") newPassword: string,
    @Arg("token") token: string,
    @Ctx() { req, redis }: MyContext
  ): Promise<UserResponse> {
    if (newPassword.length <= 2) {
      return {
        errors: [
          {
            field: "newPassword", //match the frontend Field
            message: "Length must be greater than 2",
          },
        ],
      };
    }

    const key = FORGET_PASSWORD_PREFIX + token;
    const userId = await redis.get(key);
    if (!userId) {
      // this means 1) token expired 2)token invalid (unlikely)
      return {
        errors: [
          {
            field: "token",
            message: "token expired",
          },
        ],
      };
    }

    // const userIdNum = parseInt(userId);
    const user = await User.findOne(userId);

    if (!user) {
      return {
        errors: [
          {
            field: "token",
            message: "user no longer exists",
          },
        ],
      };
    }
    user.password = await argon2.hash(newPassword);
    await User.update(
      { id: userId },
      {
        password: await argon2.hash(newPassword),
      }
    );
    redis.del(key); //so that token can be used once
    //  log in user after change password
    req.session.userId = user.id;

    return { user };
  }
  // └ return UserResponse so we can login user after changing the password

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { redis }: MyContext
  ) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      // do nothing and don't tell user anything
      return true;
    }

    const token = v4();
    await redis.set(
      FORGET_PASSWORD_PREFIX + token,
      user.id,
      "ex",
      1000 * 60 * 60 * 24 * 3
    ); //3days

    await sendEmail(
      email,
      `<a href="http://localhost:3000/change-password/${token}">Reset Password</a>`
    );
    return true;
  }
  @Query(() => [User])
  async users(): Promise<User[] | undefined> {
    return User.find();
  } // return a single user
  @Query(() => User)
  async user(@Arg("id") id: number): Promise<User | undefined> {
    return User.findOne(id);
  }

  //

  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: MyContext) {
    //Destructure the parameter array to req
    if (!req.session.userId) {
      return null;
    }
    console.log(req.session);
    // no need to await, why?
    return User.findOne(req.session.userId);
  }
  @Mutation(() => UserResponse)
  async register(
    @Arg("data") data: UsernamePasswordInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const errors = validateRegister(data);
    if (errors) {
      //if no error, return null as defined
      return { errors };
    }

    const hash = await argon2.hash(data.password);
    // const newUser = User.create({
    //   username: data.username,
    //   email: data.email,
    //   password: hash,
    // });

    let user;
    const uuid = v4();
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([
          {
            id: uuid,
            username: data.username,
            email: data.email,
            password: hash,
            avatar: `https://avatars.dicebear.com/api/open-peeps/${uuid}.svg`,
          },
        ])
        .returning("*") //RETURNING is sql statement
        .execute();

      // This query builder is an alternative of the .create.save
      user = result.raw[0];
    } catch (error) {
      console.log("err", error);
      if (error.code === "23505") {
        //|| error.detail.includes("already exists"))
        return {
          errors: [
            {
              field: "username",
              message: "username already taken",
            },
          ],
        };
      }
    }
    // automatically logged in after register
    // set a cookie on the user
    req.session.userId = user.id;

    return { user: user };
  }

  @Mutation(() => UserResponse)
  async login(
    // @Arg("data") data: UsernamePasswordInput,
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { req, res }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne(
      usernameOrEmail.includes("@")
        ? { email: usernameOrEmail }
        : { username: usernameOrEmail }

      // ben did{ where: {username: usernameOrEmail }}
    );
    if (!user) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: "The username or email does not exist",
          },
        ],
      };
    }
    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "Incorrect password",
          },
        ],
      };
    }
    req.session.userId = user.id;
    console.log(req.session);
    return { user: user };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) => {
      //remove the session in redis`
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME, {
          // maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
          httpOnly: true,
          sameSite: "lax",
          secure: __prod__,
        });
        if (err) {
          // console.log(err);
          resolve(false);
          return;
          //return so it doesn't go on
        }
        // console.log(res.cookie);
        console.log("logged out");
        resolve(true);
      });
    });
  }
}
