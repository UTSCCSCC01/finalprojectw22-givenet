import express from "express";
import dbInit from "./database/init";

const app: express.Application = express();
const PORT = 8000;

/* Server Setup */
app.use(express.json());

/* Intialize the database */
dbInit();

/* Routes */
const accountRoute = require("./routes/account.ts");
app.use("/account", accountRoute);

const itemsRoute = require("./routes/ItemsRoutes");
app.use(itemsRoute);

const itemGroupsRoute = require("./routes/ItemGroupsRoutes");
app.use(itemGroupsRoute);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
