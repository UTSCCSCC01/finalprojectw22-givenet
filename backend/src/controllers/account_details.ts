import express from "express";

import { update, getById, getAll } from "../database/dal/account_details";

//These functions are simple and need no commenting.
module.exports = {
  get: async (req: express.Request, res: express.Response) => {
    const user: any = req.user;
    if (user) {
      console.log("id", user.dataValues.acc_id);
      let id = Number(user.dataValues.acc_id);

      let fetched = await getById(id);

      if (fetched) {
        return res.json(JSON.stringify(fetched));
      } else {
        return res.send(401);
      }
    }
    return res.sendStatus(401);
  },
  post: async (req: express.Request, res: express.Response) => {
    const user: any = req.user;

    let queried = await req.body;
    console.log("queried", queried);
    queried["updatedAt"] = Date.toString();
    let updated = await update(user.dataValues.acc_id, queried);

    if (updated) {
      return res.json(JSON.stringify(updated));
    } else {
      return res.send(401);
    }
  },
  
  getById: async (req: express.Request, res: express.Response) => {
    const acc_id: number = +req.params.acc_id;

    let fetched = await getById(acc_id);

    if (fetched) {
      return res.json(JSON.stringify(fetched));
    } else {
      return res.send(401);
    }

  },
  getAll: async (
    req: express.Request,
    res: express.Response
    )=>{
      try{
        const allAccounts = await getAll();
        res.status(200);
        res.json(allAccounts);
      }catch(error){
        console.log(error);
        res.send(500)
      }
    },
};
