import { Model, DataTypes, literal } from "sequelize";
import { createScanner } from "typescript";
import sequelizeConnection from "../config";
import Donor from "./Donor";
import Listing from "./Listing";

interface CreatedAttributes {
	donor_id: number;
    listing_id: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface CreatedInput extends CreatedAttributes {}
export interface CreatedOutput extends Required<CreatedAttributes> {}

class Created
	extends Model<CreatedAttributes, CreatedInput>
	implements CreatedAttributes
{
	public donor_id!: number;
    public listing_id!: number;
	public createdAt!: Date;
	public updatedAt!: Date;
}

Created.init(
	{
		donor_id: {
			type: DataTypes.INTEGER,
            references: {
                model: Donor,
                key: "acc_id",
            },
		},
        listing_id: {
            type: DataTypes.INTEGER,
			primaryKey: true,
            references: {
                model: Listing,
                key: "listing_id",
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

Created.belongsTo(Listing, {
    foreignKey: {
        name: "listing_id",
        allowNull: false,
    },
});

Created.hasMany(Listing, {
    foreignKey: {
        name: "donor_id",
        allowNull: false,
    },
});

export default Created;
