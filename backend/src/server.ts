import express from "express";

const app: express.Application = express();
const PORT = 8000;

// Test (for sprint1)
const testRoute: express.Router = require("./routes/Test.ts");
app.use("/test", testRoute);

// Connect to the database
const db = require("./database");
db.authenticate()
	.then(() => {
		console.log("Connected to database");
	})
	.catch((error: Error) =>
		console.log("Error connecting to database", error)
	);
// db.sync({ force: true });

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
