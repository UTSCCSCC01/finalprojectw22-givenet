import Tag, { TagInput, TagOutput } from "../models/Tag";
import AccountDetails from "../models/AccountDetails";

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

export const getAll = async (): Promise<TagOutput[]> => {
  return await Tag.findAll();
};
