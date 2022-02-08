import { Model, DataTypes, literal } from "sequelize";
import sequelizeConnection from "../config";
import ItemGroups from './ItemGroups';

interface ItemAttributes {
	item_id: number;
	name: string;
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
	public createdAt!: Date;
	public updatedAt!: Date;
}

// Citation: https://sequelize.org/master/manual/assocs.html
ItemGroups.hasOne(Item, {
	foreignKey: {
		name: 'groupID',
		allowNull: false
	}
});
Item.belongsTo(ItemGroups);

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
