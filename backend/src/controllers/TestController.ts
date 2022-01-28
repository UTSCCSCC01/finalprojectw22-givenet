import express from "express";

const Test = require("../model/TestModel.ts");
module.exports = {
	get: async (req: express.Request, res: express.Response) => {
		res.send("Hello");
	},
	post: async (req: express.Request, res: express.Response) => {
		await Test.create({ firstAttribute: 1234 });
		res.send(200);
	},
};
