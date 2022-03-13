import { Model, DataTypes, literal } from "sequelize";
import sequelizeConnection from "../config";

interface CategoryAttributes {
  category_id: number;
  desc: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryInput extends CategoryAttributes {}
export interface CategoryOutput extends Required<CategoryAttributes> {}

class Category
  extends Model<CategoryAttributes, CategoryInput>
  implements CategoryAttributes
{
  public category_id!: number;
  public desc!: string;
  public name!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Category.init(
  {
    category_id: {
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
    sequelize: sequelizeConnection,
  }
);

export default Category;
