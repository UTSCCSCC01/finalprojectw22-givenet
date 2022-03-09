import { Model, DataTypes, literal } from "sequelize";
import sequelizeConnection from "../config";
import ItemCategory from "./Category";

interface ItemAttributes {
  item_id: number;
  listing_id: number;
  tag_id: number;
  name: string;
  weight: string;
  expiry: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ItemInput extends ItemAttributes {}
export interface ItemOutput extends Required<ItemAttributes> {}

class Item extends Model<ItemAttributes, ItemInput> implements ItemAttributes {
  public item_id!: number;
  public listing_id!: number;
  public tag_id!: number;
  public name!: string;
  public weight!: string;
  public expiry!: string;
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
    listing_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiry: {
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
