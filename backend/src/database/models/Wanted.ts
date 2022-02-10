import { Model, DataTypes, literal } from "sequelize";
import sequelizeConnection from "../config";

interface WantedAttributes {
	acc_id: number;
	items: Array<number>;
	createdAt: Date;
	updatedAt: Date;
}

export interface WantedInput extends WantedAttributes {}
export interface WantedOutput extends Required<WantedAttributes> {}

class Wanted
	extends Model<WantedAttributes, WantedInput>
	implements WantedAttributes
{
	public acc_id!: number;
	public items!: Array<number>;
	public createdAt!: Date;
	public updatedAt!: Date;
}

Wanted.init(
	{
		acc_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		items: {
			type: DataTypes.ARRAY(DataTypes.INTEGER),
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
		// timestamps: true,
		sequelize: sequelizeConnection,
	}
);

export default Wanted;
