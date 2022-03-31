import Account from "../models/Account";
import { AccountInput, AccountOutput } from "../models/Account";
import sequelizeConnection from "../config";

export const create = async (payload: AccountInput): Promise<AccountOutput> => {
	return await Account.create(payload);
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
): Promise<AccountOutput | null> => {
	const account = await Account.findOne({ where: { username: username } });
	if (!account) {
		return null;
	}
	return account;
};

export const deleteById = async (id: number): Promise<boolean> => {
	const deletedAccount = await Account.destroy({
		where: { acc_id: id },
	});
	return !!deletedAccount;
};

type nameAndCount = {
	name: string,
	count: number
}

export const getCommonDonationItemsById = async (id: number): Promise<nameAndCount[]> => {
	/* Query that retrieves the 5 most commonly occuring donated item names donated by the given account id */
	const [results, metadata] = await sequelizeConnection.query(`SELECT i.name, COUNT(i.name)
													FROM
															"Items" i JOIN "Listings" l ON i.listing_id = l.listing_id
													WHERE
															l.acc_id = ${id}
													GROUP BY 
															i.name
													ORDER BY 
															COUNT(i.name) DESC
													LIMIT 5`);

	if (!results) {
		throw new Error("ERROR IN getCommonDonationItemsById");
	}

	return results as nameAndCount[];
}

export const getAllDonationItems = async (id: number): Promise<nameAndCount[]> => {
	/* Query that retrieves all donation items */
	const [results, metadata] = await sequelizeConnection.query(`SELECT i.name, COUNT(i.name)
													FROM
															"Items" i JOIN "Listings" l ON i.listing_id = l.listing_id
													WHERE
															l.acc_id = ${id}
													GROUP BY 
															i.name
													ORDER BY 
															COUNT(i.name) DESC`);

	if (!results) {
		throw new Error("ERROR IN getCommonDonationItemsById");
	}

	return results as nameAndCount[];
}


