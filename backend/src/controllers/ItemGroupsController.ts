import express from "express";
import { StatusCodes } from "http-status-codes";

import { ItemGroupInput, ItemGroupOutput } from "../database/models/ItemGroups";

import {
  create,
  update,
  getByItemGroupId,
  getAll,
  deleteByItemGroupId,
} from "../database/dal/ItemGroupsDAL";

module.exports = {
  post: async (req: express.Request, res: express.Response) => {
    try {
      const itemGroupInput: ItemGroupInput = req.body;
      const newItemGroup: ItemGroupOutput = await create(itemGroupInput);
      res.status(StatusCodes.CREATED);
      res.json(newItemGroup);
    } catch (error) {
      console.log(error);
      res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
  put: async (req: express.Request, res: express.Response) => {
    const id: number = +req.params.id;
    try {
      const updatedItemGroup: ItemGroupOutput = await update(id, req.body);
      res.status(StatusCodes.OK);
      res.json(updatedItemGroup);
    } catch (error) {
      console.log(error);
      res.sendStatus(StatusCodes.NOT_FOUND);
    }
  },
  delete: async (req: express.Request, res: express.Response) => {
    const id: number = +req.params.id;
    try {
      const itemGroupIsDeleted: boolean = await deleteByItemGroupId(id);
      if (itemGroupIsDeleted) {
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
      const itemGroup: ItemGroupOutput = await getByItemGroupId(id);
      res.status(StatusCodes.OK);
      res.json(itemGroup);
    } catch (error) {
      console.log(error);
      res.sendStatus(StatusCodes.NOT_FOUND);
    }
  },
  getAll: async (req: express.Request, res: express.Response) => {
    try {
      const allItemGroups: ItemGroupOutput[] = await getAll();
      res.status(StatusCodes.OK);
      res.json(allItemGroups);
    } catch (error) {
      console.log(error);
      res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
};