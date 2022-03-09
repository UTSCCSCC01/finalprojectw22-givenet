import { Model, DataTypes, literal } from "sequelize";
import sequelizeConnection from "../config";

interface ListingAttributes {
  listing_id: number;
  container: string;
  location: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ListingInput extends ListingAttributes {}
export interface ListingOutput extends Required<ListingAttributes> {}

class Listing extends Model<ListingAttributes, ListingInput> implements ListingAttributes {
  public listing_id!: number;
  public container!: string;
  public location!: string;
  public notes!: string;
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
    container: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    notes: {
        type: DataTypes.STRING,
        allowNull: true,
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
