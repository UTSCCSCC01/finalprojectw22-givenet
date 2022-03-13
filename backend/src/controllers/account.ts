import express from "express";
import { StatusCodes } from "http-status-codes";
import { AccountInput, AccountOutput } from "../database/models/Account";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { create as createUser } from "../database/dal/account_details";
import {
  create as createAccount,
  getByUsername,
  getById as getAccountById,
  getCommonDonationItemsById,
} from "../database/dal/account";
import { getByAccId as getListingsByAccId } from "../database/dal/listing";
import { AccDetailsInput } from "../database/models/AccountDetails";
import { ListingOutput } from "../database/models/Listing";

module.exports = {
  postLogin: async (req: express.Request, res: express.Response) => {
    const { username, password } = req.body;
    console.log({ username, password });
    const account = await getByUsername(username);
    if (!account) {
      res.send(401);
      return;
    }
    const signAccount = { ...account };
    if (await bcrypt.compare(password, account.password)) {
      const accessToken = generateAccessToken(signAccount);
      res.json({ accessToken });
    } else {
      res.send(401);
    }
  },
  post: async (req: express.Request, res: express.Response) => {
    res.send(StatusCodes.CREATED);
  },
  // Signing up
  postSignup: async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    /* Check if the user already exists */
    const existingUser = await getByUsername(req.body.username);
    if (existingUser) {
      res.send(401);
      return next();
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    /* Create the account tuple in Account*/
    const accountPayload: Partial<AccountInput> = {
      username: req.body.username,
      password: hashedPassword,
      type: req.body.type,
    };
    const newAccount = await createAccount(accountPayload as AccountInput);
    if (!newAccount) {
      res.sendStatus(409);
      return next();
    }

    /* Create the user tuple in User */
    const userPayload: Partial<AccDetailsInput> = {
      acc_id: newAccount.acc_id,
      name: req.body.name,
      location: req.body.location,
      operating_hours: req.body.hours,
      email: req.body.email,
      phone: req.body.phone,
    };
    const newUser = await createUser(userPayload as AccDetailsInput);
    if (!newUser) {
      res.sendStatus(409);
      return next();
    }

    res.sendStatus(200);
    return next();
  },
  
  getCommonDonationItems: async (
    req: express.Request,
    res: express.Response
  ) => {
    const user: any = req.user;
    let id;
    if (user) {
      id = Number(user.dataValues.acc_id);
    } else {
      return res.sendStatus(StatusCodes.FORBIDDEN);
    }

    try {
      const account: AccountOutput = await getAccountById(id);
      if (account.type != 1) {
        return res.sendStatus(StatusCodes.PRECONDITION_FAILED);
      }
      const commonlyDonatedItems = await getCommonDonationItemsById(id);
      res.status(StatusCodes.OK);
      res.json({ items: commonlyDonatedItems });
    } catch (error) {
      console.log(error);
      res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
};

const generateAccessToken = (user: AccountOutput) => {
  return jwt.sign(user, "secret");
};
