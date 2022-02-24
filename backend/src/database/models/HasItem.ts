import { Model, DataTypes, literal } from "sequelize";
import { createScanner } from "typescript";
import sequelizeConnection from "../config";
import CharitableOrg from "./CharitableOrg";
import Donor from "./Donor";
import Item from "./Item";
import Listing from "./Listing";
import Pickup from "./Pickup";

interface HasItemAttributes {
    listing_id: number;
    item_id: number;
    weight: number;
    expiry: Date;
	createdAt: Date;
	updatedAt: Date;
}

export interface HasItemInput extends HasItemAttributes {}
export interface HasItemOutput extends Required<HasItemAttributes> {}

class HasItem
	extends Model<HasItemAttributes, HasItemInput>
	implements HasItemAttributes
{
    public listing_id!: number;
    public item_id!: number;
    public weight!: number;
    public expiry!: Date;
	public createdAt!: Date;
	public updatedAt!: Date;
}

HasItem.init(
	{
        listing_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: Listing.tableName,
                key: "listing_id",
            },
        },
        item_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: Item.tableName,
                key: "item_id",
            },
        },
        weight: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        expiry: {
            type: DataTypes.DATE,
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

Listing.belongsToMany(Item, {
    foreignKey: {
        name: "item_id",
        allowNull: false,
    },
    through: HasItem.tableName,
});

Item.belongsToMany(Listing, {
    foreignKey: {
        name: "listing_id",
        allowNull: false,
    },
    through: HasItem.tableName,
});

export default HasItem;
