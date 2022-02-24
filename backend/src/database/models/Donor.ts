import { Model, DataTypes, literal } from "sequelize";
import sequelizeConnection from "../config";
import Account from "./Account";

interface DonorAttributes {
	acc_id: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface DonorInput extends DonorAttributes {}
export interface DonorOutput extends Required<DonorAttributes> {}

class Donor
	extends Model<DonorAttributes, DonorInput>
	implements DonorAttributes
{
	public acc_id!: number;
	public createdAt!: Date;
	public updatedAt!: Date;
}

Donor.init(
	{
		acc_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
            references: {
                model: Account.tableName,
                key: "acc_id",
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
	}
);

Donor.belongsTo(Account, {
    foreignKey: {
        name: "acc_id",
        allowNull: false,
    },
});

export default Donor;
