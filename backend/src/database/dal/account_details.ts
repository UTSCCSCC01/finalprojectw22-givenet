import AccountDetails from "../models/AccountDetails";
import { AccDetailsInput, AccDetailsOutput } from "../models/AccountDetails";

export const create = async (payload: AccDetailsInput): Promise<AccDetailsOutput> => {
	return await AccountDetails.create(payload);
};

export const update = async (
	id: number,
	payload: Partial<AccDetailsInput>
): Promise<AccDetailsInput> => {
	const user = await AccountDetails.findByPk(id);
	if (!AccountDetails) {
		throw new Error(`User instance with acc_id ${id} not found`);
	}
	return await (user as AccountDetails).update(payload);
};

export const getById = async (id: number): Promise<AccDetailsOutput> => {
	const user = await AccountDetails.findByPk(id);
	if (!user) {
		throw new Error(`User instance with acc_id ${id} not found`);
	}
	return user;
};
export const getAll = async (): Promise<AccDetailsOutput[]> => {
	return await AccountDetails.findAll();
};