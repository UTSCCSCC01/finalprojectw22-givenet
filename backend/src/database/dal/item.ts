import {Op} from "sequelize";
import Item from "../models/Item";
import {ItemInput, ItemOutput} from "../models/Item";

export const create = async (payload: ItemInput): Promise<ItemOutput> => {
    return await Item.create(payload);
};

export const update = async (
    id: number,
    payload: Partial<ItemInput>
): Promise<ItemInput> => {
    const result = await Item.findByPk(id);
    if (!result) {
        throw new Error(`User instance with acc_id ${id} not found`);
    }
    return await (result as Item).update(payload);
};

export const getById = async (id: number): Promise<ItemOutput> => {
    const result = await Item.findByPk(id);
    if (!result) {
        throw new Error(`User has no results`);
    }
    return result;
};

export const deleteById = async (id: number) => {
    const result = await Item.destroy({where: {item_id: id}})
    if (!result) {
        throw new Error(`Item id does not exist`);
    }
    return true;
};

export const deleteByListingId = async (id: number) => {
    const result = await Item.destroy({where: {listing_id: id}})
    if (!result) {
        throw new Error(`No items for that listing exist`);
    }
    return true;
}

export const getAll = async (): Promise<ItemOutput[]> => {
    const results = await Item.findAll();
    if (!results) {
        throw new Error("ERROR IN FINDALL");
    }
    return results;
};

export const getByListingId = async (id: number): Promise<ItemOutput[]> => {
    const results = await Item.findAll({where: {listing_id: id}})
    
    if (!results) {
        throw new Error("ERROR IN getByListingId");
    }
    return results;
};
