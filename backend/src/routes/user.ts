import express from "express";
import { Router } from "express";
import authenticateToken from "../server";

const router: Router = Router();

const userController = require("../controllers/user_profiles.ts");
const userListingsController = require("../controllers/user_listings.ts");
const listingsController = require("../controllers/listings.ts");

//Check if the user exists given the user object.
router.get("/profile", authenticateToken, userController.get);
//Change the user information given the user object.
router.post("/profile", authenticateToken, userController.post);

router.get("/listings/:id", userListingsController.get);
router.post("/listings/:id", userListingsController.post);
router.delete("/listings/:id/delete", userListingsController.delete);

router.get("/listings", listingsController.get);


module.exports = router;
