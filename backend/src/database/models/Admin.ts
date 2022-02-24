import { Model, DataTypes, literal } from "sequelize";
import sequelizeConnection from "../config";
import Account from "./Account";

interface AdminAttributes {
	acc_id: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface AdminInput extends AdminAttributes {}
export interface AdminOutput extends Required<AdminAttributes> {}

class Admin
	extends Model<AdminAttributes, AdminInput>
	implements AdminAttributes
{
	public acc_id!: number;
	public createdAt!: Date;
	public updatedAt!: Date;
}

Admin.init(
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

Admin.belongsTo(Account, {
    foreignKey: {
        name: "acc_id",
        allowNull: false,
    },
});

export default Admin;
