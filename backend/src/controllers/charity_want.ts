import express from "express";
import { StatusCodes } from "http-status-codes";
import { CharityWantsInput, CharityWantsOutput } from "../database/models/CharityWants";

import{
    create,
    update,
    getById,
    deleteCharityWants,
    getAll,
    getByAcc,
    getByItem,
    exists,
} from "../database/dal/charity_wants";

module.exports = {
    post: async (req: express.Request, res: express.Response) => {
        try{
            const newInput: CharityWantsInput = req.body;
            
            const alreadyExists = await exists(newInput.acc_id, newInput.item_id);
            if (alreadyExists){
                return res.sendStatus(StatusCodes.CONFLICT);
            }

            const newWanted: CharityWantsOutput = await create(newInput);
            res.status(StatusCodes.CREATED);
            res.json(newWanted);
        }catch(error){
            console.log(error);
            res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
        }
    },
    delete: async (req: express.Request, res: express.Response) => {
        try{
            const newInput: CharityWantsInput = req.body;

            const isDeleted = await deleteCharityWants(newInput.acc_id, newInput.item_id);
            if(!isDeleted){
                return res.sendStatus(StatusCodes.NOT_FOUND);
            }
            res.sendStatus(StatusCodes.OK);
        }catch(error){
            console.log(error);
            res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
        }
    },
    getAll: async (req: express.Request, res: express.Response)=>{
        try{
            const allCharityWants: CharityWantsOutput[] = await getAll();
            res.status(StatusCodes.OK);
            res.json(allCharityWants);
        }catch(error){
            console.log(error)
            res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
        }
    },
    getByItem: async (req: express.Request, res: express.Response)=>{
        const itemId = +req.params.id;
        try{
            const charityWant: CharityWantsOutput[] = await getByItem(itemId);
            res.status(StatusCodes.OK);
            res.json(charityWant);
        }catch(error){
            console.log(error);
            res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
        }
    },
    getByAcc: async (req: express.Request, res: express.Response) =>{
        try{
            const newInput = req.body;
            const charityWant: CharityWantsOutput[] = await getByAcc(newInput.acc_id);
            if (charityWant === []){
                return res.sendStatus(StatusCodes.NOT_FOUND);
            }
            res.status(StatusCodes.OK);
            res.json(charityWant);
        }catch(error){
            console.log(error);
            res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}
