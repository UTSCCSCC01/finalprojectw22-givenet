import User from "../models/Users";
import { UserInput, UserOutput } from "../models/Users";

export const create = async (payload: UserInput): Promise<UserOutput> => {
	return await User.create(payload);
};
