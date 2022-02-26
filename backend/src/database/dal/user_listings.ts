import { Op } from "sequelize";
import Listing from "../models/Listings";
import { ListingInput, ListingOutput } from "../models/Listings";

export const create = async (payload: ListingInput): Promise<ListingOutput> => {
	const listing = await Listing.create(payload);
	return listing;
};

export const update = async (
	id: number,
	payload: Partial<ListingInput>
): Promise<ListingInput> => {
	const listing = await Listing.findByPk(id);
	if (!listing) {
		throw new Error(`User instance with acc_id ${id} not found`);
	}
	const updateListing = await (listing as Listing).update(payload);
	return updateListing;
};

export const getById = async (id: number): Promise<Array<ListingOutput>> => {
	const listing = await Listing.findAll({
		where: {
			acc_id: id
		}
	});

	if (!listing) {
		throw new Error(`User has no listings`);
	}
	return listing;
};

export const deleteById = async (id: number) => {
	const listing = await Listing.findByPk(id);

	console.log("got id: " + id + "\n");

	if (!listing) {
		throw new Error(`Listing id does not exist`);
	}

	listing.destroy();
	return true;
};