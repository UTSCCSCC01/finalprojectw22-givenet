import { Model, DataTypes, literal } from "sequelize";
import sequelizeConnection from "../config";
import Account from "./Account";

interface CharitableOrgAttributes {
	acc_id: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface CharitableOrgInput extends CharitableOrgAttributes {}
export interface CharitableOrgOutput extends Required<CharitableOrgAttributes> {}

class CharitableOrg
	extends Model<CharitableOrgAttributes, CharitableOrgInput>
	implements CharitableOrgAttributes
{
	public acc_id!: number;
	public createdAt!: Date;
	public updatedAt!: Date;
}

CharitableOrg.init(
	{
		acc_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
            references: {
                model: "Accounts",
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

CharitableOrg.belongsTo(Account, {
    foreignKey: {
        name: "acc_id",
        allowNull: false,
    },
});

export default CharitableOrg;
