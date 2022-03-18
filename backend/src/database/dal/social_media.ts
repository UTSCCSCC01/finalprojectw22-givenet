import { Op } from "sequelize";
import SocialMedia from "../models/SocialMedia";
import SocialMediaInput from "../models/SocialMedia";
import SocialMediaOutput from "../models/SocialMedia";


export const create = async (payload: SocialMediaInput): Promise<SocialMediaOutput> => {
	return await SocialMedia.create(payload);
};

export const update = async (
	id: number,
	payload: Partial<SocialMediaInput>
): Promise<SocialMediaInput> => {
	const result = await SocialMedia.findByPk(id);
	if (!result) {
		throw new Error(`User instance with acc_id ${id} not found`);
	}
	return await (result as SocialMedia).update(payload);
};

export const getById = async (id: number): Promise<SocialMediaOutput> => {
	const result = await SocialMedia.findByPk(id);

	if (!result) {
		throw new Error(`User has no results`);
	}
	return result;
};

export const deleteById = async (id: number) => {
	const result = await SocialMedia.findByPk(id);

	if (!result) {
		throw new Error(`SocialMedia id does not exist`);
	}
	await result.destroy();
	return true;
};

export const getAll = async (): Promise<SocialMediaOutput[]> => {
	const results = await SocialMedia.findAll();

	if (!results) {
		throw new Error("ERROR IN FINDALL");
	}

	return results;
};
