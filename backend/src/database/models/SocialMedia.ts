import { Model, DataTypes, literal } from "sequelize";
import sequelizeConnection from "../config";
import Account from "./Account";

interface SocialAttributes {
	acc_id: number;
	website: string;
	twitter: string;
	instagram: string;
	facebook: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface SocialInput extends SocialAttributes {}
export interface SocialOutput extends Required<SocialAttributes> {}

class SocialMedia
	extends Model<SocialAttributes, SocialInput>
	implements SocialAttributes
{
	public acc_id!: number;
	public website!: string;
	public twitter!: string;
	public instagram!: string;
	public facebook!: string;
	public createdAt!: Date;
	public updatedAt!: Date;
}

SocialMedia.init(
	{
		acc_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			references: {
				model: Account,
				key: "acc_id",
			},
		},
		website: {
			type: DataTypes.STRING,
		},
		twitter: {
			type: DataTypes.STRING,
		},
		instagram: {
			type: DataTypes.STRING,
		},
		facebook: {
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
		sequelize: sequelizeConnection,
	}
);
export default SocialMedia;
