import { Model, DataTypes, literal } from "sequelize";
import sequelizeConnection from "../config";
import Account from "./Account";
import Item from "./Item";

interface CharityWantsAttributes {
	acc_id: number;
	item_id: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface CharityWantsInput extends CharityWantsAttributes {}
export interface CharityWantsOutput extends Required<CharityWantsAttributes> {}

class CharityWants
	extends Model<CharityWantsAttributes, CharityWantsInput>
	implements CharityWantsAttributes
{
	public acc_id!: number;
	public item_id!: number;
	public createdAt!: Date;
	public updatedAt!: Date;
}

CharityWants.init(
	{
		acc_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			references: {
				model: Account,
				key: "acc_id",
			},
		},
		item_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			references: {
				model: Item,
				key: "item_id",
			},
		},
		createdAt: {
			type: "TIMESTAMP",
			defaultValue: literal("CURRENT_TIMESTAMP"),
		},
		updatedAt: {
			type: "TIMESTAMP",
			defaultValue: literal("CURRENT_TIMESTAMP"),
		},
	},
	{
		sequelize: sequelizeConnection,
	}
);

export default CharityWants;
