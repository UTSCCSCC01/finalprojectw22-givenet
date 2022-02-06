import express from "express";

import {
	create,
	update,
	getById,
} from "../database/dal/users";

module.exports = {
	get: async (req: express.Request, res: express.Response) => {
		res.send("Hello");
	},
	post: async (req: express.Request, res: express.Response) => {
		res.send(200);
	},
};
