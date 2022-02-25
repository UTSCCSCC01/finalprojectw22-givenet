import express from "express";

import {
	create,
	update,
	getById,
} from "../database/dal/users";


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

		let queried = req.body;

		queried['updatedAt'] = Date.toString();
		let updated = update(id, queried);

		if (updated) {
			res.send(updated)
		}
		else {
			res.send(413)
		}
	},
};
