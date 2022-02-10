import express from "express";
import { StatusCodes } from "http-status-codes";

import { ItemInput, ItemOutput } from "../database/models/Items";
import Items from "../database/models/Items";

import {
  create,
  update,
  getByItemId,
  getAll,
  deleteByItemId,
} from "../database/dal/ItemsDAL";
import { nextTick } from "process";

module.exports = {
  post: async (req: express.Request, res: express.Response) => {
    try {
      const itemInput: ItemInput = req.body;
      const newItem: ItemOutput = await create(itemInput);
      res.status(StatusCodes.CREATED);
      res.json(newItem);
    } catch (error) {
      console.log(error);
      res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
  put: async (req: express.Request, res: express.Response) => {
    const id: number = +req.params.id;
    try {
      const updatedItem: ItemOutput = await update(id, req.body);
      res.status(StatusCodes.OK);
      res.json(updatedItem);
    } catch (error) {
      console.log(error);
      res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
  delete: async (req: express.Request, res: express.Response) => {
    const id: number = +req.params.id;
    try {
      const itemIsDeleted: boolean = await deleteByItemId(id);
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
      const item: ItemOutput = await getByItemId(id);
      res.status(StatusCodes.OK);
      res.json(item);
    } catch (error) {
      console.log(error);
      res.sendStatus(StatusCodes.NOT_FOUND);
    }
  },
  getAll: async (req: express.Request, res: express.Response) => {
    try {
      const allItems: ItemOutput[] = await getAll();
      res.status(StatusCodes.OK);
      res.json(allItems);
    } catch (error) {
      console.log(error);
      res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
};
