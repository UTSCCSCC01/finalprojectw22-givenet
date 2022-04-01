import { Op } from "sequelize";
import Listing from "../models/Listing";
import { ListingInput, ListingOutput } from "../models/Listing";

export const create = async (payload: ListingInput): Promise<ListingOutput> => {
	return await Listing.create(payload);
};

export const update = async (
	id: number,
	payload: Partial<ListingInput>
): Promise<ListingInput> => {
	const listing = await Listing.findByPk(id);
	if (!listing) {
		throw new Error(`User instance with acc_id ${id} not found`);
	}
	return await (listing as Listing).update(payload);
};

export const getById = async (id: number): Promise<ListingOutput> => {
	const listing = await Listing.findByPk(id);

	if (!listing) {
		throw new Error(`User has no listings`);
	}
	return listing;
};

export const getByAccId = async (id: number): Promise<ListingOutput[]> => {
	const listing = await Listing.findAll({where: {acc_id: id }});

	if (!listing) {
		throw new Error(`User has no listings`);
	}

	return listing;
};

export const deleteById = async (id: number) => {
	const listing = await Listing.findByPk(id);

	if (!listing) {
		throw new Error(`Listing id does not exist`);
	}
	await listing.destroy();
	return true;
};

export const getAll = async (): Promise<ListingOutput[]> => {
	const listings = await Listing.findAll();

	console.log("im retriving all");
	if (!listings) {
		throw new Error("ERROR IN FINDALL");
	}
	console.log("im returning all");
	return listings;
};
