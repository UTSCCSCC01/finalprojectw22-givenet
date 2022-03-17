import express from "express";
import {Router} from "express";

const router: Router = Router();
const charityWantController = require("../controllers/charity_want.ts");


// Create new wanted list
router.post("/", charityWantController.post);

// Delete charity wanted list by charity ID
router.delete("/", charityWantController.delete);

// Get all wanted lists
router.get("/all", charityWantController.getAll);

// Get wanted list by item Id
router.get("/:id", charityWantController.getByItem);

// Get wanted list by charity Id
router.get("/charity", charityWantController.getByAcc);

module.exports = router;