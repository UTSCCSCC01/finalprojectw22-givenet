import AccountDetails from "../models/AccountDetails";
import { AccDetailsInput, AccDetailsOutput } from "../models/AccountDetails";

export const create = async (payload: AccDetailsInput): Promise<AccDetailsOutput> => {
	return await AccountDetails.create(payload);
};
