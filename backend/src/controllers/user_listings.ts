import express from "express";

import {
	create,
	update,
	getById,
	deleteById,
} from "../database/dal/user_listings";


module.exports = {
	get: async (req: express.Request, res: express.Response) => {
		let id = Number(req.params.id);

		let fetched = await getById(id);

		if (fetched) {
			res.send(fetched)
		}
		else {
			res.send(412)
		}
		
	},
	post: async (req: express.Request, res: express.Response) => {
		let id = Number(req.params.id);

		let fetched = await deleteById(id);

		if (fetched) {
			res.sendStatus(200)
		}
		else {
			res.sendStatus(404)
		}
	},
};
