import express from "express";
import { AccountInput, AccountOutput } from "../database/models/Account";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { create as createUser } from "../database/dal/user";
import {
	create as createAccount,
	update,
	getById,
	getAll,
	getByUsername,
	deleteById,
} from "../database/dal/account";
import { UserInput } from "../database/models/Users";

module.exports = {
	// Logging in
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
			res.json({ accessToken: accessToken });
		} else {
			res.send(401);
		}
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
			res.send(409);
			return next();
		}

		/* Create the user tuple in User*/
		const userPayload: Partial<UserInput> = {
			acc_id: newAccount.acc_id,
			name: req.body.name,
			location: req.body.location,
			hours: req.body.hours,
			email: req.body.email,
			phone: req.body.phone,
		};
		const newUser = await createUser(userPayload as UserInput);
		if (!newUser) {
			res.send(409);
			return next();
		}

		res.send(200);
		return next();
	},
};

const generateAccessToken = (user: AccountOutput) => {
	return jwt.sign(user, "secret");
};
