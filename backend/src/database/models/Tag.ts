import { Model, DataTypes, literal } from "sequelize";
import sequelizeConnection from "../config";

interface TagAttributes {
    tag_id: number;
    category: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface TagInput extends TagAttributes {}
export interface TagOutput extends Required<TagAttributes> {}

class Tag
    extends Model<TagAttributes, TagInput>
    implements TagAttributes
{
    public tag_id!: number;
    public name!: string;
    public category!: number;
    public createdAt!: Date;
    public updatedAt!: Date;
}

Tag.init(
    {
        tag_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        category: {
            type: DataTypes.INTEGER,
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

export default Tag;
