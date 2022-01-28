import { Sequelize } from "sequelize";

const sequelize: Sequelize = new Sequelize(
	"postgres://zmfxgbwj:9wldgE2wVShm0Jf_Tk8fQ_JC69eQoOqL@raja.db.elephantsql.com/zmfxgbwj"
);

module.exports = sequelize;
