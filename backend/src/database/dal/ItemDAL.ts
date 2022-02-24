import Item, { ItemInput, ItemOutput } from "../models/Item";

export const create = async (payload: ItemInput): Promise<ItemOutput> => {
  const item = await Item.create(payload);
  return item;
};

export const update = async (
  id: number,
  payload: Partial<ItemInput>
): Promise<ItemOutput> => {
  const item = await Item.findByPk(id);
  if (!item) {
    throw new Error(`Item instance with itemID ${id} not found`);
  }
  const updatedItem = await item.update(payload);
  return updatedItem;
};

export const getByItemId = async (id: number): Promise<ItemOutput> => {
  const item = await Item.findByPk(id);
  if (!item) {
    throw new Error(`Item instance with itemID ${id} not found`);
  }
  return item;
};

export const deleteByItemId = async (id: number): Promise<boolean> => {
  const numDeleted = await Item.destroy({
    where: { item_id: id },
  });
  return numDeleted > 0;
};

export const getAll = async (): Promise<ItemOutput[]> => {
  return await Item.findAll();
};
