import { Model, DataTypes, literal } from "sequelize";
import sequelizeConnection from "../config";

interface UserAttributes {
	acc_id: number;
	name: string;
	location: string;
	hours: string;
	phone: string;
	email: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface UserInput extends UserAttributes {}
export interface UserOutput extends Required<UserAttributes> {}

class User
	extends Model<UserAttributes, UserInput>
	implements UserAttributes
{
	public acc_id!: number;
	public name!: string;
	public location!: string;
	public hours!: string;
	public phone!: string;
	public email!: string;
	public createdAt!: Date;
	public updatedAt!: Date;
}

User.init(
	{
		acc_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		location: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		hours: {
			type: DataTypes.STRING,
		},
		phone: {
			type: DataTypes.STRING,
		},
		email: {
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

export default User;
