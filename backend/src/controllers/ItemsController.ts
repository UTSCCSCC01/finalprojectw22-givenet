import express from "express";

import {
	create,
	update,
	getByItemId,
	getAll,
	deleteByItemId,
} from "../database/dal/ItemsDAL";

module.exports = {
	post: async (req: express.Request, res: express.Response) => {
		res.send(200);
	},
	put: async (req: express.Request, res: express.Response) => {
		res.send("Hello");
	},
	delete: async (req: express.Request, res: express.Response) => {
		res.send("Hello");
	},

};