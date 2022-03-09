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
	if (!authHeader) {
		return res.sendStatus(401);
	}
	const token = authHeader && authHeader.split(" ")[1];
	if (token == null) return res.sendStatus(401);

	jwt.verify(token, "secret", (err, user) => {
		// console.log(err);
		if (err) return res.sendStatus(401);
		req.user = user;
		next();
	});
};
export default authenticateToken;

/* Routes */
const accountRoute = require("./routes/account.ts");
const accountDetailsRoute = require("./routes/AccountDetailsRoutes.ts");

app.use("/account", accountRoute);
app.use("/user", accountDetailsRoute);

app.get("/testlogin", authenticateToken, async (req, res) => {
	res.send(200);
});

const itemRoute = require("./routes/ItemRoutes.ts");
app.use(itemRoute);

const itemCategoryRoute = require("./routes/ItemCategoryRoutes.ts");
app.use(itemCategoryRoute);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
