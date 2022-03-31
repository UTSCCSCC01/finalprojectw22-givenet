import express from "express";
import { create as createItem, deleteByListingId } from "../database/dal/item";
import Listing, { ListingOutput } from "../database/models/Listing";
import Item from "../database/models/Item";

import {
  create,
  getById,
  deleteById,
  getAll,
  getByAccId,
} from "../database/dal/listing";

import {
  inPickup,
  inPickupCompleted,
} from "../database/dal/pickup";

import { getByListingId } from "../database/dal/item";

import { getById as getUserbyId } from "../database/dal/account_details";

// These functions are simple and need no commenting.
module.exports = {
  get: async (req: express.Request, res: express.Response) => {
    const user: any = req.user;
    let id;
    if (user) {
      id = Number(user.dataValues.acc_id);
    } else {
      return res.send(403);
    }

    let user_listings = await getByAccId(id);

    if (!user_listings) {
      return res.send(404);
    }

    let returnListings = [];

    for (let listing of user_listings) {
      let ret = {
        listing_id: listing.listing_id,
        acc_id: listing.acc_id,
        container: listing.container,
        location: listing.location,
        notes: listing.notes,
        createdAt: listing.createdAt,
        updatedAt: listing.updatedAt,
        items: await getByListingId(listing.listing_id),
        user: await getUserbyId(listing.acc_id),
      };
      returnListings.push(ret);
    }

    return res.json(returnListings);
  },
  post: async (req: express.Request, res: express.Response) => {
    const user: any = req.user;
    let id;
    if (user) {
      id = Number(user.dataValues.acc_id);
    } else {
      return res.send(403);
    }
    // Create the listing in the listing table
    const listing = { ...req.body.listing, acc_id: id };
    let new_listing = await create(listing);

    if (!new_listing) {
      res.sendStatus(404);
    }
    //Create all the items in the listing
    const items = req.body.items;
    for (let item of items) {
      let new_item = { ...item, listing_id: new_listing.listing_id };
      await createItem(new_item);
    }

    return res.send(200);
  },
  delete: async (req: express.Request, res: express.Response) => {
    // if there are issues, add a check to make sure user owns listing
    let id = Number(req.params.id);
    try {
      await deleteById(id);
      await deleteByListingId(id);
      return res.sendStatus(200);
    } catch {
      return res.sendStatus(404);
    }
  },

  //A variation of GetAll returns only listings that have not been claimed yet.
  getAllValid: async (req: express.Request, res: express.Response) => {
    //Get user listings
    let allListings = await getAll();

    let returnListings = [];

    if (!allListings) {
      return res.send(404);
    }

    //Check if listings is in pickup, if it is its already claimed so dont return it.
    for (let listing of allListings) {
      let exists = await inPickup(listing.listing_id);
      if (!exists) {
        let ret = {
          listing_id: listing.listing_id,
          acc_id: listing.acc_id,
          container: listing.container,
          location: listing.location,
          notes: listing.notes,
          createdAt: listing.createdAt,
          updatedAt: listing.updatedAt,
          items: await getByListingId(listing.listing_id),
          user: await getUserbyId(listing.acc_id),
        };
        returnListings.push(ret);
      }
    }
    return res.json(returnListings);
  },

  //A variation of GetAll returns only listings that have been fully completed FOR A USER
  getCompleted: async (req: express.Request, res: express.Response) => {
    const user: any = req.user;
    let id;

    if (user) {
      id = Number(user.dataValues.acc_id);
    } else {
      return res.send(403);
    } 

    //Get user listings
    let user_listings = await getByAccId(id);
    let type = Boolean(req.params.type);
    let returnListings = [];

    if (!user_listings) {
      return res.send(404);
    }

    //Return only listings that are in pickup and marked as completed in the database
    for (let listing of user_listings) {
      let exists = await inPickupCompleted(listing.listing_id, type);
      if (exists) {
        let ret = {
          listing_id: listing.listing_id,
          acc_id: listing.acc_id,
          container: listing.container,
          location: listing.location,
          notes: listing.notes,
          createdAt: listing.createdAt,
          updatedAt: listing.updatedAt,
          items: await getByListingId(listing.listing_id),
          user: await getUserbyId(listing.acc_id),
        };
        returnListings.push(ret);
      }
    }
    return res.json(returnListings);
  },

  //Get all listings in the database.
  getAll: async (req: express.Request, res: express.Response) => {
    let allListings = await getAll();

    let returnListings = [];

    if (!allListings) {
      return res.send(404);
    }

    //Format listings and return
    for (let listing of allListings) {
      let ret = {
        listing_id: listing.listing_id,
        acc_id: listing.acc_id,
        container: listing.container,
        location: listing.location,
        notes: listing.notes,
        createdAt: listing.createdAt,
        updatedAt: listing.updatedAt,
        items: await getByListingId(listing.listing_id),
        user: await getUserbyId(listing.acc_id),
      };
      returnListings.push(ret);
    }
    return res.json(returnListings);
  },

  //A variation of GetAll returns only listings have not been claimed yet.
  getUnclaimed: async (req: express.Request, res: express.Response) => {
    const user: any = req.user;
    let id;

    if (user) {
      id = Number(user.dataValues.acc_id);
    } else {
      return res.send(403);
    }

    let user_listings = await getByAccId(id);
    let type = Boolean(req.params.type);
    let returnListings = [];

    if (!user_listings) {
      return res.send(404);
    }

    for (let listing of user_listings) {
      let exists = await inPickup(listing.listing_id);
      if (!exists) {
        let ret = {
          listing_id: listing.listing_id,
          acc_id: listing.acc_id,
          container: listing.container,
          location: listing.location,
          notes: listing.notes,
          createdAt: listing.createdAt,
          updatedAt: listing.updatedAt,
          items: await getByListingId(listing.listing_id),
          user: await getUserbyId(listing.acc_id),
        };
        returnListings.push(ret);
      }
    }
    return res.json(returnListings);
  },
};
