import { Model, DataTypes, literal } from "sequelize";
import sequelizeConnection from "../config";
import ItemGroups from "./ItemGroups";

interface ItemAttributes {
  item_id: number;
  name: string;
  group: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ItemInput extends ItemAttributes {}
export interface ItemOutput extends Required<ItemAttributes> {}

class Items extends Model<ItemAttributes, ItemInput> implements ItemAttributes {
  public item_id!: number;
  public name!: string;
  public group!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Items.init(
  {
    item_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    group: {
      type: DataTypes.INTEGER,
      references: {
        model: "ItemGroups",
        key: "item_group_id",
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
    modelName: "Items",
  }
);

// Citation: https://sequelize.org/v3/docs/associations/
/*
    Adds groupID to Item as a foreign key into ItemGroups
    (don't forget to add the reference in the init attributes definition)
*/
Items.belongsTo(ItemGroups, {
  foreignKey: {
    name: "group",
    allowNull: false,
  },
});

export default Items;
