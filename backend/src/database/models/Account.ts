import { Model, DataTypes, literal } from "sequelize";
import sequelizeConnection from "../config";

interface AccountAttributes {
	acc_id: number;
	username: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface AccountInput extends AccountAttributes {}
export interface AccountOutput extends Required<AccountAttributes> {}

class Account
	extends Model<AccountAttributes, AccountInput>
	implements AccountAttributes
{
	public acc_id!: number;
	public username!: string;
	public password!: string;
	public createdAt!: Date;
	public updatedAt!: Date;
}

Account.init(
	{
		acc_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		username: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		password: {
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

export default Account;
