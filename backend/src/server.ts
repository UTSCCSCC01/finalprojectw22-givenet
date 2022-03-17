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
app.use(express.urlencoded({extended: true}));

/* Initialize the database */
dbInit().then(r => console.log("Database initialized")).catch(e => console.log("Error starting database"));

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
        if (err) return res.sendStatus(401);
        req.user = user;
        next();
    });
};
export default authenticateToken;

/* Routes */
const accountRoute = require("./routes/account.ts");
app.use("/account", accountRoute);

const listingRouter = require("./routes/listing.ts");
app.use("/listing", authenticateToken, listingRouter);

const tagRoute = require("./routes/tag.ts");
app.use("/tag", tagRoute);

const categoryRoute = require("./routes/category.ts");
app.use("/category", categoryRoute);

const wantedRoute = require("./routes/charity_wants.ts");
app.use("/wanted", wantedRoute);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
