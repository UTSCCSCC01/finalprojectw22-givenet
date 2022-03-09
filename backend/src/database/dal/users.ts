import { Op } from "sequelize";
import AccountDetails from "../models/AccountDetails";
import { AccDetailsInput, AccDetailsOutput } from "../models/AccountDetails";

export const create = async (payload: AccDetailsInput): Promise<AccDetailsOutput> => {
	const user = await AccountDetails.create(payload);
	return user;
};

export const update = async (
	id: number,
	payload: Partial<AccDetailsInput>
): Promise<AccDetailsInput> => {
	const user = await AccountDetails.findByPk(id);
	if (!AccountDetails) {
		throw new Error(`User instance with acc_id ${id} not found`);
	}
	const updatedUser = await (user as AccountDetails).update(payload);
	return updatedUser;
};

export const getById = async (id: number): Promise<AccDetailsOutput> => {
	const user = await AccountDetails.findByPk(id);
	if (!user) {
		throw new Error(`User instance with acc_id ${id} not found`);
	}
	return user;
};
