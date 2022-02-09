import express from "express";
import dbInit from "./database/init";
import expressSession from "express-session";
import jwt from "jsonwebtoken";

const app: express.Application = express();
const PORT = 8000;

/* Server Setup */
app.use(express.json());
app.use(
	expressSession({
		secret: "secret",
		resave: true,
		saveUninitialized: true,
	})
);
app.use(express.urlencoded({ extended: true }));

/* Intialize the database */
dbInit();

/* Authentication Middleware */
const authenticateToken = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	const authHeader = req.headers["authorization"];
	console.log(authHeader);
	const token = authHeader && authHeader.split(" ")[1];
	if (token == null) return res.sendStatus(401);

	jwt.verify(token, "secret", (err, user) => {
		// console.log(err);
		if (err) return res.sendStatus(403);
		req.user = user;
		next();
	});
};

/* Routes */
const accountRoute = require("./routes/account.ts");
app.use("/account", accountRoute);

app.get("/testlogin", authenticateToken, async (req, res) => {
	res.send(200);
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));