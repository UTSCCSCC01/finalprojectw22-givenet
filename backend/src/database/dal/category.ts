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

export const deleteTagWithCategoryId = async (id: number): Promise<boolean> => {
  try {
    await Category.destroy({
      where: { category_id: id },
    });
    return true;
  } catch {
    return false;
  }
};

export const getAll = async (): Promise<CategoryOutput[]> => {
  return await Category.findAll();
};

export const existsName = async (name: string): Promise<boolean> => {
  let retval = await Category.findAll({
    where: {name: name}
  });

  return retval.length > 0;
};
