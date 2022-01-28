import { Sequelize, DataTypes, Model } from "sequelize";

const sequelize: Sequelize = require("../database.ts");

interface TestInstance extends Model {
	firstAttribute: number;
}

const Test = sequelize.define<TestInstance>("Test", {
	firstAttribute: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
});

module.exports = Test;
