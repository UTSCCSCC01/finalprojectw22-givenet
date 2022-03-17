import express from "express";
import { create as createItem, deleteByListingId } from "../database/dal/item";
import Pickup, { PickupOutput } from "../database/models/Pickup";
import Listing, { ListingOutput } from "../database/models/Listing";
import { getById as getListingById } from "../database/dal/listing";

import {literal} from "sequelize";

import {
  create,
  getById,
  deleteById,
  getAll
} from "../database/dal/pickup";


// These functions are simple and need no commenting.
module.exports = {
  post: async (req: express.Request, res: express.Response) => {
    const user: any = req.user;
    let org_id;
    if (user) {
      org_id = Number(user.dataValues.acc_id);
    } else {
      return res.send(403);
    }

    // Make sure user coordinating pickup is charity
    if (user.dataValues.type != 2) {
        return res.send(403);
    }

    // Get listing
    let listing = await getListingById(req.body.listing_id);
    let donor_id = listing.acc_id;


    // Create a row on on the pickup relation
    const pickup = { ...req.body, org_id: org_id, donor_id: donor_id };
    console.log(pickup);
    let new_pickup = await create(pickup);
    // DEBUGGING STUFF
    // .then(response => {console.log(response)}).catch(error => console.log(error))


    if (!new_pickup) {
      res.sendStatus(404);
    }

    return res.send(200);
  },

  get: async (req: express.Request, res: express.Response) => {
    const user: any = req.user;
    let user_id;
    if (user) {
      user_id = Number(user.dataValues.acc_id);
    } else {
      return res.send(403);
    }

    let pickups = [];
    let allPickups = await getAll();
    for (let pickup of allPickups) {
        console.log(pickup.donor_id);
        console.log(user_id);
        if (pickup.donor_id == user_id || pickup.org_id == user_id) {
            let temp = {
                pickup_id: pickup.pickup_id,
                listing_id: pickup.listing_id,
                donor_id: pickup.donor_id,
                org_id: pickup.org_id,
                time: pickup.time,
                completed: pickup.completed,
                notes: pickup.notes,
                createdAt: pickup.createdAt,
                updatedAt: pickup.updatedAt
            }

            pickups.push(temp);
        }
    }

    return res.json(pickups);

  }
};
