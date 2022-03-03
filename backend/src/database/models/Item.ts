import { Model, DataTypes, literal } from "sequelize";
import sequelizeConnection from "../config";
import ItemCategory from "./ItemCategory";

interface ItemAttributes {
  item_id: number;
  name: string;
  category: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ItemInput extends ItemAttributes {}
export interface ItemOutput extends Required<ItemAttributes> {}

class Item extends Model<ItemAttributes, ItemInput> implements ItemAttributes {
  public item_id!: number;
  public name!: string;
  public category!: number;
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
      allowNull: false,
    },
    category: {
      type: DataTypes.INTEGER,
      references: {
        model: ItemCategory,
        key: "item_category_id",
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

// Citation: https://sequelize.org/v3/docs/associations/
/*
    Adds groupID to Item as a foreign key into ItemGroups
    (don't forget to add the reference in the init attributes definition)
*/
Item.belongsTo(ItemCategory, {
  foreignKey: {
    name: "category",
    allowNull: false,
  },
});

export default Item;
