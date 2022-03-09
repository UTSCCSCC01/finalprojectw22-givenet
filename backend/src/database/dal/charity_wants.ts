import { Op } from "sequelize";
import CharityWants from "../models/CharityWants";
import { CharityWantsInput, CharityWantsOutput } from "../models/CharityWants";

export const create = async (payload: CharityWantsInput): Promise<CharityWantsOutput> => {
	return await CharityWants.create(payload);
};

export const update = async (
	id: number,
	payload: Partial<CharityWantsInput>
): Promise<CharityWantsInput> => {
	const result = await CharityWants.findByPk(id);
	if (!result) {
		throw new Error(`User instance with acc_id ${id} not found`);
	}
	return await (result as CharityWants).update(payload);
};

export const getById = async (id: number): Promise<CharityWantsOutput> => {
	const result = await CharityWants.findByPk(id);

	if (!result) {
		throw new Error(`User has no results`);
	}
	return result;
};

export const deleteById = async (id: number) => {
	const result = await CharityWants.findByPk(id);

	if (!result) {
		throw new Error(`CharityWants id does not exist`);
	}
	await result.destroy();
	return true;
};

export const getAll = async (): Promise<CharityWantsOutput[]> => {
	const results = await CharityWants.findAll();

	if (!results) {
		throw new Error("ERROR IN FINDALL");
	}

	return results;
};
