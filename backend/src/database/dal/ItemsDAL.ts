import { Op } from "sequelize";
import { AccountInput } from "../models/Account";
import Items from "../models/Items";
import { ItemInput, ItemOutput } from "../models/Items";

export const create = async (payload: ItemInput): Promise<ItemOutput> => {
    const item = await Items.create(payload);
    return item;
};

export const update = async (
    id: number,
    payload: Partial<ItemInput>
): Promise<ItemInput> => {
    const item = await Items.findByPk(id);
    if (!item) {
        throw new Error(`Item instance with itemID ${id} not found`);
    }
    const updatedItem = await (item as Items).update(payload);
    return updatedItem;
};

export const getByItemId = async (id: number): Promise<ItemOutput> => {
	const item = await Items.findByPk(id);
	if (!item) {
		throw new Error(`Item instance with itemID ${id} not found`);
	}
	return item;
};