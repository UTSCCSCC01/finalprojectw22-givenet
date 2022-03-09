import Category, {
  CategoryInput,
  CategoryOutput,
} from "../models/Category";

export const create = async (
  payload: CategoryInput
): Promise<CategoryOutput> => {
  return await Category.create(payload);
};

export const update = async (
  id: number,
  payload: Partial<CategoryInput>
): Promise<CategoryOutput> => {
  const category = await Category.findByPk(id);
  if (!category) {
    throw new Error(`Item instance with item_id ${id} not found`);
  }
  return await (category as Category).update(payload);
};

export const getByItemGroupId = async (
  id: number
): Promise<CategoryOutput> => {
  const category = await Category.findByPk(id);
  if (!category) {
    throw new Error(`Item instance with itemID ${id} not found`);
  }
  return category;
};

export const deleteByItemGroupId = async (id: number): Promise<boolean> => {
  const numDeleted = await Category.destroy({
    where: { category_id: id },
  });
  return numDeleted > 0;
};

export const getAll = async (): Promise<CategoryOutput[]> => {
  return await Category.findAll();
};
