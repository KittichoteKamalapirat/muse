/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import bcrypt from "bcrypt";
import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { v4 } from "uuid";
import { rollbar } from "../config/initializers/rollbar";
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX, IS_PROD } from "../constants";
import { User } from "../entities";
import {
  UserInput,
  UsernamePasswordInput,
  UserResponse,
  UserReview,
} from "../entities/utils";
import { isAuth } from "../middlware/isAuth";
import { MyContext } from "../types";
import { validateRegister } from "../utils/validateRegister";

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
            field: "newPassword", // match the frontend Field
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
    redis.del(key); // so that token can be used once
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
    ); // 3days

    return true;
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
    // Destructure the parameter array to req
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
      // if no error, return null as defined
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

    let { phoneNumber } = data;

    if (/^[+66\d+]{12}$/.test(phoneNumber)) {
      phoneNumber = phoneNumber.slice(3);
    } else if (/^[0\d+]{10}$/.test(phoneNumber)) {
      phoneNumber = phoneNumber.substring(1);
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
            phoneNumber,
            password: hash,
            isCreator: data.isCreator,
            avatar: `https://avatars.dicebear.com/api/open-peeps/${uuid}.png`,
          },
        ])
        .returning("*") // RETURNING is sql statement
        .execute();

      // This query builder is an alternative of the .create.save
      [user] = result.raw; // zeroth index
    } catch (error) {
      console.log("err", error);
      if (error.detail.includes("username")) {
        // || error.detail.includes("already exists"))
        return {
          errors: [
            {
              field: "username",
              message: "username already taken",
            },
          ],
        };
      }
      if (error.detail.includes("email")) {
        return {
          errors: [
            {
              field: "email",
              message: "email already taken",
            },
          ],
        };
      }
      if (error.detail.includes("phoneNumber")) {
        return {
          errors: [
            {
              field: "phoneNumber",
              message: "phoneNumber already taken",
            },
          ],
        };
      }
    }
    // automatically logged in after register
    // set a cookie on the user
    req.session.userId = user.id;
    return { user };
  }

  // create random username, email,
  @Mutation(() => UserResponse)
  async guestLogin(@Ctx() { req }: MyContext): Promise<UserResponse> {
    const uuid = v4();
    try {
      const user = await User.create({
        id: uuid,
        isGuest: true,
        username: uuid,
        email: uuid,
        phoneNumber: uuid,
        password: uuid,
        avatar: `https://avatars.dicebear.com/api/open-peeps/${uuid}.svg`,
      }).save();

      req.session.userId = user.id;
      return { user };
    } catch (error) {
      console.log("err", error);
      return {
        errors: [
          {
            field: "guest",
            message: "cannot log in as a guest",
          },
        ],
      };
    }
    // automatically logged in after register
    // set a cookie on the user
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
    @Arg("usernameOrEmailOrPhoneNumber") usernameOrEmailOrPhoneNumber: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    // 1) includes @ -> email
    // 2) all numbers -> phoneNumber
    // 3) else -> username

    // check if starts with  +66 and length = 12
    if (/^[+66\d+]{12}$/.test(usernameOrEmailOrPhoneNumber)) {
      usernameOrEmailOrPhoneNumber = usernameOrEmailOrPhoneNumber.slice(3);
    } // check if starts with  0 and length = 10
    else if (/^[0\d+]{10}$/.test(usernameOrEmailOrPhoneNumber)) {
      usernameOrEmailOrPhoneNumber = usernameOrEmailOrPhoneNumber.substring(1);
    }

    let user: User | undefined;
    if (usernameOrEmailOrPhoneNumber.includes("@")) {
      user = await User.findOne({ email: usernameOrEmailOrPhoneNumber });
    } else if (
      /^\d+$/.test(usernameOrEmailOrPhoneNumber) &&
      usernameOrEmailOrPhoneNumber.length === 9
    ) {
      user = await User.findOne({ phoneNumber: usernameOrEmailOrPhoneNumber });
    } else {
      user = await User.findOne({ username: usernameOrEmailOrPhoneNumber });
    }

    if (!user) {
      console.log("Cannot find a user");
      return {
        errors: [
          {
            field: "usernameOrEmailOrPhoneNumber",
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

    return { user };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) => {
      // remove the session in redis`
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME, {
          // maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
          httpOnly: true,
          sameSite: "lax",
          secure: IS_PROD,
        });
        if (err) {
          resolve(false);
          return;
        }
        resolve(true); // logged out
      });
    });
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async switchAccountType(
    @Arg("becomeCreator") becomeCreator: boolean,
    @Ctx() { req }: MyContext
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
  @Mutation(() => User)
  async updateAvatar(
    @Ctx() { req }: MyContext,
    @Arg("newAvatar") newAvatar: string
  ): Promise<User | Error | undefined> {
    try {
      await User.update({ id: req.session.userId }, { avatar: newAvatar });
      const user = await User.findOne(req.session.userId);
      console.log(user);

      return user;
    } catch (error) {
      rollbar.log(error);
      return Error("cannot update avatar");
    }
  }
}
