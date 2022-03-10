import express from "express";
import { StatusCodes } from "http-status-codes";

import Category, { CategoryInput, CategoryOutput } from "../database/models/Category";

import {
  create,
  update,
  getByItemGroupId,
  getAll,
  deleteByItemGroupId,
  existsName,
} from "../database/dal/category";
import {deleteByCategoryId} from "../database/dal/tag";

module.exports = {
  post: async (req: express.Request, res: express.Response) => {
    try {
      const category: CategoryInput = req.body;
      const alreadyExists = await existsName(category.name)
      if (alreadyExists) {
        return res.sendStatus(StatusCodes.CONFLICT);
      }

      const newCategory: CategoryOutput = await create(category);
      res.status(StatusCodes.CREATED);
      return res.json(newCategory);
    } catch (error) {
      console.log(error);
      return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
  put: async (req: express.Request, res: express.Response) => {
    const id: number = +req.params.id;
    try {
      const updatedCategory: CategoryOutput = await update(id, req.body);
      res.status(StatusCodes.OK);
      return res.json(updatedCategory);
    } catch (error) {
      console.log(error);
      return res.sendStatus(StatusCodes.NOT_FOUND);
    }
  },
  delete: async (req: express.Request, res: express.Response) => {
    const id: number = +req.params.id;
    try {
      await deleteByItemGroupId(id);
      await deleteByCategoryId(id);
        return res.sendStatus(StatusCodes.OK);
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
