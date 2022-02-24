import { Model, DataTypes, literal } from "sequelize";
import sequelizeConnection from "../config";

interface ItemCategoryAttributes {
  item_category_id: number;
  desc: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ItemCategoryInput extends ItemCategoryAttributes {}
export interface ItemCategoryOutput extends Required<ItemCategoryAttributes> {}

class ItemCategory
  extends Model<ItemCategoryAttributes, ItemCategoryInput>
  implements ItemCategoryAttributes
{
  public item_category_id!: number;
  public desc!: string;
  public name!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

ItemCategory.init(
  {
    item_category_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
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
    modelName: "ItemCategory"
  }
);

export default ItemCategory;
