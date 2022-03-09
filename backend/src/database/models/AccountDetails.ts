import { Model, DataTypes, literal } from "sequelize";
import sequelizeConnection from "../config";
import Account from "./Account";

interface AccDetailsAttributes {
	acc_id: number;
	name: string;
	location: string;
	operating_hours: string;
	phone: string;
	email: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface AccDetailsInput extends AccDetailsAttributes {}
export interface AccDetailsOutput extends Required<AccDetailsAttributes> {}

class AccountDetails
	extends Model<AccDetailsAttributes, AccDetailsInput>
	implements AccDetailsAttributes
{
	public acc_id!: number;
	public name!: string;
	public location!: string;
	public operating_hours!: string;
	public phone!: string;
	public email!: string;
	public createdAt!: Date;
	public updatedAt!: Date;
}

AccountDetails.init(
	{
		acc_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			references: {
				model: Account,
				key: "acc_id"
			},
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		location: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		operating_hours: {
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

export default AccountDetails;
