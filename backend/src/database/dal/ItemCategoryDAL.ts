import ItemCategory, {
  ItemCategoryInput,
  ItemCategoryOutput,
} from "../models/ItemCategory";

export const create = async (
  payload: ItemCategoryInput
): Promise<ItemCategoryOutput> => {
  const itemCategory = await ItemCategory.create(payload);
  return itemCategory;
};

export const update = async (
  id: number,
  payload: Partial<ItemCategoryInput>
): Promise<ItemCategoryOutput> => {
  const itemCategory = await ItemCategory.findByPk(id);
  if (!itemCategory) {
    throw new Error(`Item instance with item_id ${id} not found`);
  }
  const updatedItemCategory = await (itemCategory as ItemCategory).update(payload);
  return updatedItemCategory;
};

export const getByItemGroupId = async (
  id: number
): Promise<ItemCategoryOutput> => {
  const itemCategory = await ItemCategory.findByPk(id);
  if (!itemCategory) {
    throw new Error(`Item instance with itemID ${id} not found`);
  }
  return itemCategory;
};

export const deleteByItemGroupId = async (id: number): Promise<boolean> => {
  const numDeleted = await ItemCategory.destroy({
    where: { item_category_id: id },
  });
  return numDeleted > 0;
};

export const getAll = async (): Promise<ItemCategoryOutput[]> => {
  return await ItemCategory.findAll();
};
