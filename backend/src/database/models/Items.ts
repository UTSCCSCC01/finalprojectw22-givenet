import { Model, DataTypes, literal } from "sequelize";
import sequelizeConnection from "../config";

interface ItemAttributes {
	item_id: number;
	name: string;
	group: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface ItemInput extends ItemAttributes {}
export interface ItemOutput extends Required<ItemAttributes> {}

class Item
	extends Model<ItemAttributes, ItemInput>
	implements ItemAttributes
{
	public item_id!: number;
	public name!: string;
	public group!: string;
	public createdAt!: Date;
	public updatedAt!: Date;
}

Item.init(
	{
		item_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		group: {
			type: DataTypes.STRING,
			allowNull: false,
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
		// timestamps: true,
		sequelize: sequelizeConnection,
	}
);

export default Item;
