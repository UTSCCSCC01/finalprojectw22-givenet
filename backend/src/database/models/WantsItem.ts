import { Model, DataTypes, literal } from "sequelize";
import sequelizeConnection from "../config";
import Account from "./Account";
import CharitableOrg from "./CharitableOrg";
import Item from "./Item";

interface WantsItemAttributes {
	acc_id: number;
	item_id: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface WantsItemInput extends WantsItemAttributes {}
export interface WantsItemOutput extends Required<WantsItemAttributes> {}

class WantsItem
	extends Model<WantsItemAttributes, WantsItemInput>
	implements WantsItemAttributes
{
	public acc_id!: number;
	public item_id!: number;
	public createdAt!: Date;
	public updatedAt!: Date;
}

WantsItem.init(
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
		// timestamps: true,
		sequelize: sequelizeConnection,
	}
);

Item.belongsToMany(CharitableOrg, {
	foreignKey: {
		name: "acc_id",
		allowNull: false,
	},
	through: WantsItem,
});

CharitableOrg.belongsToMany(Item, {
	foreignKey: {
		name: "item_id",
		allowNull: false,
	},
	through: WantsItem,
});

export default WantsItem;
