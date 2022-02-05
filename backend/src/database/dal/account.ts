import { Op } from "sequelize";
import Account from "../models/Account";
import { AccountInput, AccountOutput } from "../models/Account";

export const create = async (payload: AccountInput): Promise<AccountOutput> => {
	const account = await Account.create(payload);
	return account;
};

export const update = async (
	id: number,
	payload: Partial<AccountInput>
): Promise<AccountInput> => {
	const account = await Account.findByPk(id);
	if (!account) {
		throw new Error(`Account intsance with acc_id ${id} not found`);
	}
	const updatedAccount = await (account as Account).update(payload);
	return updatedAccount;
};

export const getById = async (id: number): Promise<AccountOutput> => {
	const account = await Account.findByPk(id);
	if (!account) {
		throw new Error(`Account intance with acc_id ${id} not found`);
	}
	return account;
};

export const getByUsername = async (
	username: string
): Promise<AccountOutput> => {
	const account = await Account.findOne({ where: { username: username } });
	if (!account) {
		throw new Error(`Account instance with username ${username} not found`);
	}
	return account;
};

export const deleteById = async (id: number): Promise<boolean> => {
	const deletedAccount = await Account.destroy({
		where: { acc_id: id },
	});
	return !!deletedAccount;
};

export const getAll = async (): Promise<AccountOutput[]> => {
	return await Account.findAll();
};
