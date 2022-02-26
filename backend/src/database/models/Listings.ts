import { Model, DataTypes, literal } from "sequelize";
import sequelizeConnection from "../config";

interface ListingAttributes {
	listing_id: number;
    acc_id: number;
	items: Array<string>;
    weight: Array<string>;
    expiry: Array<Date>;
	createdAt: Date;
	updatedAt: Date;
}

export interface ListingInput extends ListingAttributes {}
export interface ListingOutput extends Required<ListingAttributes> {}

class Listing
	extends Model<ListingAttributes, ListingInput>
	implements ListingAttributes
{
	public listing_id!: number;
	public acc_id!: number;
	public location!: string;
	public items!: Array<string>;
    public weight!: Array<string>;
    public expiry!: Array<Date>;
	public createdAt!: Date;
	public updatedAt!: Date;
}

Listing.init(
	{
		listing_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
        acc_id: {
			type: DataTypes.INTEGER,
		},
        items: {
			type: DataTypes.ARRAY(DataTypes.STRING),
		},
        weight: {
			type: DataTypes.ARRAY(DataTypes.STRING),
		},
        expiry: {
			type: DataTypes.ARRAY(DataTypes.DATE),
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

export default Listing;
