import express from "express";
import dbInit from "./database/init";

const app: express.Application = express();
const PORT = 8000;

/* Server Setup */

/* Intialize the database */
dbInit();

/* Routes */
const accountRoute = require("./routes/account.ts");
app.use("/account", accountRoute);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
