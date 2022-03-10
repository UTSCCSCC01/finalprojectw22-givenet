import { Sequelize } from "sequelize";

const sequelizeConnection: Sequelize = new Sequelize(
	"postgres://zmfxgbwj:9wldgE2wVShm0Jf_Tk8fQ_JC69eQoOqL@raja.db.elephantsql.com/zmfxgbwj"
	// "GiveNet",
	// "postgres",
	// "password",
	// { host: "localhost", port: 5432, dialect: "postgres", logging: false }
);

export default sequelizeConnection;
