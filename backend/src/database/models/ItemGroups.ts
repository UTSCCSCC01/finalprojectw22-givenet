import { Model, DataTypes, literal } from "sequelize";
import sequelizeConnection from "../config";

interface ItemGroupAttributes {
  item_group_id: number;
  desc: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ItemGroupInput extends ItemGroupAttributes {}
export interface ItemGroupOutput extends Required<ItemGroupAttributes> {}

class ItemGroup
  extends Model<ItemGroupAttributes, ItemGroupInput>
  implements ItemGroupAttributes
{
  public item_group_id!: number;
  public desc!: string;
  public name!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

ItemGroup.init(
  {
    item_group_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    desc: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
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
    modelName: "ItemGroups",
  }
);

export default ItemGroup;
