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

export const deleteCharityWants = async (acc_id: number, item_id: number) => {
	const numDeleted = await CharityWants.destroy({
		where:{
			acc_id: acc_id,
			item_id: item_id
		}
	});
	return numDeleted > 0;
};

export const getAll = async (): Promise<CharityWantsOutput[]> => {
	const results = await CharityWants.findAll();
	return results;
};

export const getByAcc = async (id: number): Promise<CharityWantsOutput[]> =>{
	const results = await CharityWants.findAll({where: {acc_id: id}});
	if (!results){
		throw new Error("ERROR IN getByAcc");
	}
	return results;
}

export const getByItem = async (id: number): Promise<CharityWantsOutput[]> =>{
	const results = await CharityWants.findAll({where: {item_id: id}});
	if (!results){
		throw new Error("ERROR IN getByItem");
	}
	return results;
}

export const exists = async(acc_id: number, item_id:number): Promise<boolean> =>{
	let retval =  await CharityWants.findAll({
		where:{
			acc_id: acc_id,
			item_id: item_id
		}
	});
	return retval.length > 0;
}