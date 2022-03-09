import express from "express";

import { getAll } from "../database/dal/user_listings";


module.exports = {
	get: async (req: express.Request, res: express.Response) => {

		let fetched = await getAll();

		if (fetched) {
			res.send(fetched)
		}
		else {
			res.send(412)
		}
		
	},
};