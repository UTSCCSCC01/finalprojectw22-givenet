import express from "express";
import user from "../database/models/Users"

import {
	create,
	update,
	getById,
} from "../database/dal/users";


module.exports = {
	get: async (req: express.Request, res: express.Response) => {
		let id = Number(req.params.id);

		let fetched = getById(id);

		fetched.then(
			value => {res.send(value)}
		)
		
	},
	post: async (req: express.Request, res: express.Response) => {
		let id = Number(req.params.id);

		let queried = req.query;
		
		console.log(queried);

		/*queried['updatedAt'] = Date.toString();
		let updated = update(id, queried);

		updated.then(
			value => {res.send(value)}
		) */
	},
};
