import express from "express";

import { create, update, getById } from "../database/dal/users";

module.exports = {
	get: async (req: express.Request, res: express.Response) => {
		var user: any = req.user;
		if (user) {
			console.log("id", user.dataValues.acc_id);
			let id = Number(user.dataValues.acc_id);

			let fetched = await getById(id);

			if (fetched) {
				console.log("fetched", fetched);
				return res.json(JSON.stringify(fetched));
			} else {
				return res.send(401);
			}
		}
		return res.sendStatus(401);
	},
	post: async (req: express.Request, res: express.Response) => {
		const user: any = req.user;

		let queried = await req.body;
		console.log("queried", queried);
		queried["updatedAt"] = Date.toString();
		let updated = await update(user.dataValues.acc_id, queried);
		console.log("updatedd", updated);

		if (updated) {
			return res.json(JSON.stringify(updated));
		} else {
			return res.send(401);
		}
	},
};
