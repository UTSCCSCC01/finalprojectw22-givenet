import { Op } from "sequelize";
import DonorHas from "../models/DonorHas";
import { DonorHasInput, DonorHasOutput } from "../models/DonorHas";

export const create = async (payload: DonorHasInput): Promise<DonorHasOutput> => {
	return await DonorHas.create(payload);
};

export const update = async (
	id: number,
	payload: Partial<DonorHasInput>
): Promise<DonorHasInput> => {
	const result = await DonorHas.findByPk(id);
	if (!result) {
		throw new Error(`User instance with acc_id ${id} not found`);
	}
	return await (result as DonorHas).update(payload);
};

export const getById = async (id: number): Promise<DonorHasOutput> => {
	const result = await DonorHas.findByPk(id);

	if (!result) {
		throw new Error(`User has no results`);
	}
	return result;
};

export const deleteById = async (id: number) => {
	const result = await DonorHas.findByPk(id);

	if (!result) {
		throw new Error(`DonorHas id does not exist`);
	}
	await result.destroy();
	return true;
};

export const getAll = async (): Promise<DonorHasOutput[]> => {
	const results = await DonorHas.findAll();

	if (!results) {
		throw new Error("ERROR IN FINDALL");
	}

	return results;
};
