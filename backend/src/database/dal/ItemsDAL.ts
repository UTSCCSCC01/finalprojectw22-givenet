import Items, { ItemInput, ItemOutput } from "../models/Items";

export const create = async (payload: ItemInput): Promise<ItemOutput> => {
  const item = await Items.create(payload);
  return item;
};

export const update = async (
  id: number,
  payload: Partial<ItemInput>
): Promise<ItemOutput> => {
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

export const deleteByItemId = async (id: number): Promise<boolean> => {
  const numDeleted = await Items.destroy({
    where: { item_id: id },
  });
  return numDeleted > 0;
};

export const getAll = async (): Promise<ItemOutput[]> => {
  return await Items.findAll();
};
