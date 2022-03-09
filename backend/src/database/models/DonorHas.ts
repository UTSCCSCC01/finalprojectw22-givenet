import { Model, DataTypes, literal } from "sequelize";
import sequelizeConnection from "../config";
import Account from "./Account";
import Item from "./Item";

interface DonorHasAttributes {
    acc_id: number;
    item_id: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface DonorHasInput extends DonorHasAttributes {}
export interface DonorHasOutput extends Required<DonorHasAttributes> {}

class DonorHas
    extends Model<DonorHasAttributes, DonorHasInput>
    implements DonorHasAttributes
{
    public acc_id!: number;
    public item_id!: number;
    public createdAt!: Date;
    public updatedAt!: Date;
}

DonorHas.init(
    {
        acc_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: Account,
                key: "acc_id",
            },
        },
        item_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: Item,
                key: "item_id",
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

export default DonorHas;