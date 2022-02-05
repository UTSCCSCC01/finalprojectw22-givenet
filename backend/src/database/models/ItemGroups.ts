import { Model, DataTypes, literal } from "sequelize";
import sequelizeConnection from "../config";

interface GroupAttributes {
	item_group: number;
	desc: string;
	name: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface GroupInput extends GroupAttributes {}
export interface GroupOutput extends Required<GroupAttributes> {}

class Group
	extends Model<GroupAttributes, GroupInput>
	implements GroupAttributes
{
	public item_group!: number;
	public desc!: string;
	public name!: string;
	public createdAt!: Date;
	public updatedAt!: Date;
}

Group.init(
	{
		item_group: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		desc: {
			type: DataTypes.INTEGER,
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
	}
);

export default Group;
