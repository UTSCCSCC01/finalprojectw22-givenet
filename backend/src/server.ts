import express from "express";

const app: express.Application = express();
const PORT = 8000;

app.get(
	"/",
	(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		res.send("Hello");
	}
);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
