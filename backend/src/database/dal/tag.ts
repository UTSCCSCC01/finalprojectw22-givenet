import Tag, { TagInput, TagOutput } from "../models/Tag";
import AccountDetails from "../models/AccountDetails";
import Item from "../models/Item";

export const create = async (payload: TagInput): Promise<TagOutput> => {
  const tag = await Tag.create(payload);
  return tag;
};

export const update = async (
  id: number,
  payload: Partial<TagInput>
): Promise<TagOutput> => {
  const tag = await Tag.findByPk(id);
  if (!tag) {
    throw new Error(`tag instance with tagID ${id} not found`);
  }
  return await (tag as Tag).update(payload);
};

export const getByTagId = async (id: number): Promise<TagOutput> => {
  const tag = await Tag.findByPk(id);
  if (!tag) {
    throw new Error(`tag instance with tagID ${id} not found`);
  }
  return tag;
};

export const deleteByTagId = async (id: number): Promise<boolean> => {
  const numDeleted = await Tag.destroy({
    where: { tag_id: id },
  });
  return numDeleted > 0;
};

export const deleteByCategoryId = async (id: number) => {
  const result = await Tag.destroy({where: {category_id: id}})
  if (!result) {
    throw new Error(`No items for that listing exist`);
  }
  return true;
}

export const getAll = async (): Promise<TagOutput[]> => {
  return await Tag.findAll();
};

export const existsName = async (name: string): Promise<boolean> => {
  let retval = await Tag.findAll({
    where: {name: name}
  });

  return retval.length > 0;
};
