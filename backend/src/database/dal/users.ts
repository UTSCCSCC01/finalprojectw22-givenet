import { Op } from "sequelize";
import User from "../models/Users";
import { UserInput, UserOutput } from "../models/Users";

export const create = async (payload: UserInput): Promise<UserOutput> => {
	const user = await User.create(payload);
	return user;
};

export const update = async (
	id: number,
	payload: Partial<UserInput>
): Promise<UserInput> => {
	const user = await User.findByPk(id);
	if (!User) {
		throw new Error(`User instance with acc_id ${id} not found`);
	}
	const updatedUser = await (user as User).update(payload);
	return updatedUser;
};

export const getById = async (id: number): Promise<UserOutput> => {
	const user = await User.findByPk(id);
	if (!user) {
		throw new Error(`User instance with acc_id ${id} not found`);
	}
	return user;
};
