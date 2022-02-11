import ItemGroup, {
  ItemGroupInput,
  ItemGroupOutput,
} from "../models/ItemGroups";

export const create = async (
  payload: ItemGroupInput
): Promise<ItemGroupOutput> => {
  const itemGroup = await ItemGroup.create(payload);
  return itemGroup;
};

export const update = async (
  id: number,
  payload: Partial<ItemGroupInput>
): Promise<ItemGroupOutput> => {
  const itemGroup = await ItemGroup.findByPk(id);
  if (!itemGroup) {
    throw new Error(`Item instance with itemID ${id} not found`);
  }
  const updatedItemGroup = await (itemGroup as ItemGroup).update(payload);
  return updatedItemGroup;
};

export const getByItemGroupId = async (
  id: number
): Promise<ItemGroupOutput> => {
  const itemGroup = await ItemGroup.findByPk(id);
  if (!itemGroup) {
    throw new Error(`Item instance with itemID ${id} not found`);
  }
  return itemGroup;
};

export const deleteByItemGroupId = async (id: number): Promise<boolean> => {
  const numDeleted = await ItemGroup.destroy({
    where: { item_group_id: id },
  });
  return numDeleted > 0;
};

export const getAll = async (): Promise<ItemGroupOutput[]> => {
  return await ItemGroup.findAll();
};
