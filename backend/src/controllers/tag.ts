import express from "express";
import { StatusCodes } from "http-status-codes";
import { TagInput, TagOutput } from "../database/models/Tag";

import {
  create,
  update,
  getAll,
  deleteByTagId,
  getByTagId,
  existsName,
} from "../database/dal/tag";

module.exports = {
  post: async (req: express.Request, res: express.Response) => {
    try {
      const itemInput: TagInput = req.body;

      const alreadyExists = await existsName(itemInput.name);
      if (alreadyExists) {
        return res.sendStatus(StatusCodes.CONFLICT);
      }

      const newTag: TagOutput = await create(itemInput);
      res.status(StatusCodes.CREATED);
      res.json(newTag);
    } catch (error) {
      console.log(error);
      res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
  put: async (req: express.Request, res: express.Response) => {
    const id: number = +req.params.id;
    try {
      const updatedTag: TagOutput = await update(id, req.body);
      res.status(StatusCodes.OK);
      res.json(updatedTag);
    } catch (error) {
      console.log(error);
      res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
  delete: async (req: express.Request, res: express.Response) => {
    const id: number = +req.params.id;
    try {
      const itemIsDeleted: boolean = await deleteByTagId(id);
      if (itemIsDeleted) {
        res.sendStatus(StatusCodes.OK);
      } else {
        res.sendStatus(StatusCodes.NOT_FOUND);
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
  get: async (req: express.Request, res: express.Response) => {
    const id: number = +req.params.id;
    try {
      const item: TagOutput = await getByTagId(id);
      res.status(StatusCodes.OK);
      res.json(item);
    } catch (error) {
      console.log(error);
      res.sendStatus(StatusCodes.NOT_FOUND);
    }
  },
  getAll: async (req: express.Request, res: express.Response) => {
    try {
      const allTags: TagOutput[] = await getAll();
      res.status(StatusCodes.OK);
      res.json(allTags);
    } catch (error) {
      console.log(error);
      res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
};
