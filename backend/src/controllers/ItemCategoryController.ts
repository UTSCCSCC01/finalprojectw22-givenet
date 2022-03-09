import express from "express";
import { StatusCodes } from "http-status-codes";

import { CategoryInput, CategoryOutput } from "../database/models/Category";

import {
  create,
  update,
  getByItemGroupId,
  getAll,
  deleteByItemGroupId,
} from "../database/dal/category";

module.exports = {
  post: async (req: express.Request, res: express.Response) => {
    try {
      const itemCategoryInput: CategoryInput = req.body;
      const newCategory: CategoryOutput = await create(itemCategoryInput);
      res.status(StatusCodes.CREATED);
      res.json(newCategory);
    } catch (error) {
      console.log(error);
      res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
  put: async (req: express.Request, res: express.Response) => {
    const id: number = +req.params.id;
    try {
      const updatedCategory: CategoryOutput = await update(id, req.body);
      res.status(StatusCodes.OK);
      res.json(updatedCategory);
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
      const itemCategory: CategoryOutput = await getByItemGroupId(id);
      res.status(StatusCodes.OK);
      res.json(itemCategory);
    } catch (error) {
      console.log(error);
      res.sendStatus(StatusCodes.NOT_FOUND);
    }
  },
  getAll: async (req: express.Request, res: express.Response) => {
    try {
      const allCategory: CategoryOutput[] = await getAll();
      res.status(StatusCodes.OK);
      res.json(allCategory);
    } catch (error) {
      console.log(error);
      res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
};
