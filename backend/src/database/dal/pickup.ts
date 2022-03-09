import { Op } from "sequelize";
import Pickup from "../models/Pickup";
import { PickupInput, PickupOutput } from "../models/Pickup";

export const create = async (payload: PickupInput): Promise<PickupOutput> => {
	return await Pickup.create(payload);
};

export const update = async (
	id: number,
	payload: Partial<PickupInput>
): Promise<PickupInput> => {
	const result = await Pickup.findByPk(id);
	if (!result) {
		throw new Error(`User instance with acc_id ${id} not found`);
	}
	return await (result as Pickup).update(payload);
};

export const getById = async (id: number): Promise<PickupOutput> => {
	const result = await Pickup.findByPk(id);

	if (!result) {
		throw new Error(`User has no results`);
	}
	return result;
};

export const deleteById = async (id: number) => {
	const result = await Pickup.findByPk(id);

	if (!result) {
		throw new Error(`Pickup id does not exist`);
	}
	await result.destroy();
	return true;
};

export const getAll = async (): Promise<PickupOutput[]> => {
	const results = await Pickup.findAll();

	if (!results) {
		throw new Error("ERROR IN FINDALL");
	}

	return results;
};
