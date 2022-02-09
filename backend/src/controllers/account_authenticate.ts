import express from "express";
import { StatusCodes } from "http-status-codes";

import {
	create,
	update,
	getById,
	getAll,
	getByUsername,
	deleteById,
} from "../database/dal/account";

module.exports = {
	get: async (req: express.Request, res: express.Response) => {
		res.send("Hello");
	},
	post: async (req: express.Request, res: express.Response) => {
		res.send(StatusCodes.CREATED);
	},
};
