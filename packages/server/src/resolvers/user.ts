import bcrypt from "bcrypt";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { v4 } from "uuid";
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX, __prod__ } from "../constants";
import Follow from "../entities/Follow";
import { Mealkit, User } from "../entities/";
import { isAuth } from "../middlware/isAuth";
import { MyContext } from "../types";
import { FieldError } from "../utils/FieldError";
import { sendEmail } from "../utils/sendEmail";
import { validateRegister } from "../utils/validateRegister";
import { UsernamePasswordInput } from "./UsernamePasswordInput";

// For User
@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field(() => User, { nullable: true })
  user?: User;
}

@ObjectType()
class UserReview {
  @Field(() => Int)
  reviewScore: number;
  @Field(() => Int)
  reviewCounter: number;
}

@InputType()
class UserInput {
  @Field()
  username: string;
  @Field()
  email: string;
  @Field()
  phonenumber: string;
  @Field()
  about?: string;
}

// Resolver starts
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

  @UseMiddleware(isAuth)
  @FieldResolver(() => Boolean)
  async isFollowed(@Root() parent: User, @Ctx() { req }: MyContext) {
    const isFollowing = await Follow.findOne({
      where: { userId: parent.id, followerId: req.session.userId },
    });

    if (isFollowing) {
      return true;
    }
    return false;
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
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    // user.password = await argon2.hash(newPassword);
    await User.update(
      { id: userId },
      {
        password: await bcrypt.hash(newPassword, salt),
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

  @FieldResolver(() => UserReview)
  async userReview(@Root() user: User): Promise<UserReview | Error> {
    try {
      const mealkits = await Mealkit.find({ where: { creatorId: user.id } });
      let sum: number = 0;
      let counter: number = 0;
      mealkits.map((mealkit) => {
        sum = sum + mealkit.reviewsSum;
        counter = counter + mealkit.reviewsCounter;
      });

      const avg = sum / counter || counter;
      console.log({ sum });
      console.log({ counter });
      console.log({ avg });
      return { reviewCounter: counter, reviewScore: avg };
    } catch (error) {
      console.log(error);
      return new Error("cannot find");
    }
  }

  @Query(() => [User])
  async users(): Promise<User[] | undefined> {
    return User.find();
  } // return a single user

  @Query(() => User)
  async user(@Arg("id") id: string): Promise<User | undefined> {
    return User.findOne(id);
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: MyContext) {
    //Destructure the parameter array to req
    if (!req.session.userId) {
      return null;
    }

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

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(data.password, salt);
    // const hash = await argon2.hash(data.password);

    // const newUser = User.create({
    //   username: data.username,
    //   email: data.email,
    //   password: hash,
    // });

    let phonenumber = data.phonenumber;

    if (/^[\+66\d+]{12}$/.test(phonenumber)) {
      phonenumber = phonenumber.slice(3);
    } else if (/^[0\d+]{10}$/.test(phonenumber)) {
      phonenumber = phonenumber.substring(1);
    }

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
            phonenumber: phonenumber,
            password: hash,
            isCreator: data.isCreator,
            avatar: `https://avatars.dicebear.com/api/open-peeps/${uuid}.svg`,
          },
        ])
        .returning("*") //RETURNING is sql statement
        .execute();

      // This query builder is an alternative of the .create.save
      user = result.raw[0];
    } catch (error) {
      console.log("err", error);
      if (error.detail.includes("username")) {
        //|| error.detail.includes("already exists"))
        return {
          errors: [
            {
              field: "username",
              message: "username already taken",
            },
          ],
        };
      } else if (error.detail.includes("email")) {
        return {
          errors: [
            {
              field: "email",
              message: "email already taken",
            },
          ],
        };
      } else if (error.detail.includes("phonenumber")) {
        return {
          errors: [
            {
              field: "phonenumber",
              message: "phonenumber already taken",
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

  @UseMiddleware(isAuth)
  @Mutation(() => User)
  async updateUser(
    @Arg("input", () => UserInput) input: UserInput,
    @Ctx() { req }: MyContext
  ) {
    const result = await getConnection()
      .createQueryBuilder()
      .update(User)
      .set({ ...input })
      .where("id = :id", {
        id: req.session.userId,
      })
      .returning("*")
      .execute();
    return result.raw[0];
  }

  @Mutation(() => UserResponse)
  async login(
    // @Arg("data") data: UsernamePasswordInput,
    @Arg("usernameOrEmailOrPhonenumber") usernameOrEmailOrPhonenumber: string,
    @Arg("password") password: string,
    @Ctx() { req, res }: MyContext
  ): Promise<UserResponse> {
    // 1) includes @ -> email
    // 2) all numbers -> phonenumber
    // 3) else -> username

    console.log("login from server");

    // check if starts with  +66 and length = 12
    if (/^[\+66\d+]{12}$/.test(usernameOrEmailOrPhonenumber)) {
      usernameOrEmailOrPhonenumber = usernameOrEmailOrPhonenumber.slice(3);
    } // check if starts with  0 and length = 10
    else if (/^[0\d+]{10}$/.test(usernameOrEmailOrPhonenumber)) {
      usernameOrEmailOrPhonenumber = usernameOrEmailOrPhonenumber.substring(1);
    }

    let user: User | undefined;
    if (usernameOrEmailOrPhonenumber.includes("@")) {
      user = await User.findOne({ email: usernameOrEmailOrPhonenumber });
    } else if (
      /^\d+$/.test(usernameOrEmailOrPhonenumber) &&
      usernameOrEmailOrPhonenumber.length === 9
    ) {
      user = await User.findOne({ phonenumber: usernameOrEmailOrPhonenumber });
    } else {
      user = await User.findOne({ username: usernameOrEmailOrPhonenumber });
    }

    console.log({ user });
    if (!user) {
      console.log("Cannot find a user");
      return {
        errors: [
          {
            field: "usernameOrEmailOrPhonenumber",
            message: "The username, email, or phone number does not exist",
          },
        ],
      };
    }
    // const valid = await argon2.verify(user.password, password);

    const valid = await bcrypt.compare(password, user.password);

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

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async switchAccountType(
    @Arg("becomeCreator") becomeCreator: boolean,
    @Ctx() { req, res }: MyContext
  ) {
    await User.update(
      { id: req.session.userId },
      {
        isCreator: becomeCreator,
      }
    );
    return true;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async updateAvatar(
    @Ctx() { req }: MyContext,
    @Arg("newAvatar") newAvatar: string
  ): Promise<boolean | Error> {
    try {
      User.update({ id: req.session.userId }, { avatar: newAvatar });
      return true;
    } catch (error) {
      console.log(error);
      return Error("cannot update avatar");
    }
  }
}
