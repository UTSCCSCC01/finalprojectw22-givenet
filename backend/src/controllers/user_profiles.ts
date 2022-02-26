import express from "express";

import { create, update, getById } from "../database/dal/users";

module.exports = {
	get: async (req: express.Request, res: express.Response) => {
		var user: any = req.user;
		if (user) {
			let id = Number(user.acc_id);

			let fetched = await getById(id);

			if (fetched) {
				res.send(fetched);
			} else {
				res.send(401);
			}
		}
		res.sendStatus(401);
	},
	post: async (req: express.Request, res: express.Response) => {
		const user: any = req.user;
		
		let queried = req.body;
		console.log(queried);

		queried["updatedAt"] = Date.toString();
		let updated = update(user.acc_id, queried);

		if (updated) {
			res.send(updated);
		} else {
			res.send(401);
		}
	},
};
