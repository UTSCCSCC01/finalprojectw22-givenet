import express from "express";
import { StatusCodes } from "http-status-codes";

import { ItemCategoryInput, ItemCategoryOutput } from "../database/models/ItemCategory";

import {
  create,
  update,
  getByItemGroupId,
  getAll,
  deleteByItemGroupId,
} from "../database/dal/ItemCategoryDAL";

module.exports = {
  post: async (req: express.Request, res: express.Response) => {
    try {
      const itemCategoryInput: ItemCategoryInput = req.body;
      const newItemCategory: ItemCategoryOutput = await create(itemCategoryInput);
      res.status(StatusCodes.CREATED);
      res.json(newItemCategory);
    } catch (error) {
      console.log(error);
      res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
  put: async (req: express.Request, res: express.Response) => {
    const id: number = +req.params.id;
    try {
      const updatedItemCategory: ItemCategoryOutput = await update(id, req.body);
      res.status(StatusCodes.OK);
      res.json(updatedItemCategory);
    } catch (error) {
      console.log(error);
      res.sendStatus(StatusCodes.NOT_FOUND);
    }
  },
  delete: async (req: express.Request, res: express.Response) => {
    const id: number = +req.params.id;
    try {
      const itemCategoryIsDeleted: boolean = await deleteByItemGroupId(id);
      if (itemCategoryIsDeleted) {
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
      const itemCategory: ItemCategoryOutput = await getByItemGroupId(id);
      res.status(StatusCodes.OK);
      res.json(itemCategory);
    } catch (error) {
      console.log(error);
      res.sendStatus(StatusCodes.NOT_FOUND);
    }
  },
  getAll: async (req: express.Request, res: express.Response) => {
    try {
      const allItemCategory: ItemCategoryOutput[] = await getAll();
      res.status(StatusCodes.OK);
      res.json(allItemCategory);
    } catch (error) {
      console.log(error);
      res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
};
