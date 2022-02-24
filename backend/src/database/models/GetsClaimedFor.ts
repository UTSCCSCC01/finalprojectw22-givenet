import { Model, DataTypes, literal } from "sequelize";
import { createScanner } from "typescript";
import sequelizeConnection from "../config";
import CharitableOrg from "./CharitableOrg";
import Donor from "./Donor";
import Listing from "./Listing";
import Pickup from "./Pickup";

interface GetsClaimedForAttributes {
	charitable_org_id: number;
    listing_id: number;
    pickup_id: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface GetsClaimedForInput extends GetsClaimedForAttributes {}
export interface GetsClaimedForOutput extends Required<GetsClaimedForAttributes> {}

class GetsClaimedFor
	extends Model<GetsClaimedForAttributes, GetsClaimedForInput>
	implements GetsClaimedForAttributes
{
	public charitable_org_id!: number;
    public listing_id!: number;
    public pickup_id!: number;
	public createdAt!: Date;
	public updatedAt!: Date;
}

GetsClaimedFor.init(
	{
		charitable_org_id: {
			type: DataTypes.INTEGER,
            references: {
                model: CharitableOrg.tableName,
                key: "acc_id",
            },
		},
        listing_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: Listing.tableName,
                key: "listing_id",
            },
        },
        pickup_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: Pickup.tableName,
                key: "pickup_id",
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

GetsClaimedFor.belongsTo(Listing, {
    foreignKey: {
        name: "listing_id",
        allowNull: false,
    },
});

GetsClaimedFor.belongsTo(Pickup, {
    foreignKey: {
        name: "pickup_id",
        allowNull: false,
    },
});

Pickup.belongsToMany(CharitableOrg, {
    foreignKey: {
        name: "acc_id",
        allowNull: false,
    },
    through: GetsClaimedFor.tableName,
});

export default GetsClaimedFor;
