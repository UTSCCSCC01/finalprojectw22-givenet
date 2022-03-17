import { Model, DataTypes, literal } from "sequelize";
import sequelizeConnection from "../config";
import Listing from "./Listing";
import Account from "./Account";

interface PickupAttributes {
  pickup_id: number;
  listing_id: number;
  donor_id: number;
  org_id: number;
  time: Date;
  completed: boolean;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PickupInput extends PickupAttributes {}
export interface PickupOutput extends Required<PickupAttributes> {}

class Pickup extends Model<PickupAttributes, PickupInput> implements PickupAttributes {
  public pickup_id!: number;
  public listing_id!: number;
  public donor_id!: number;
  public org_id!: number;
  public time!: Date;
  public completed!: boolean;
  public notes!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Pickup.init(
  {
    pickup_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    listing_id: {
      type: DataTypes.INTEGER
    },
    donor_id: {
      type: DataTypes.INTEGER
    },
    org_id: {
      type: DataTypes.INTEGER,
    },
    time: {
      type: "TIMESTAMP",
      unique: false,
      allowNull: true,
    },
    completed: {
      type: DataTypes.BOOLEAN,
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
    sequelize: sequelizeConnection,
  }
);

export default Pickup;
