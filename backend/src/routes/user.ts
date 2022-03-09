import express from "express";
import { Router } from "express";
import authenticateToken from "../server";

const router: Router = Router();

const userController = require("../controllers/user_profiles.ts");
const listingsController = require("../controllers/user_listings.ts");
const listingController = require("../controllers/listings.ts");

//Check if the user exists given the user object.
router.get("/profile", authenticateToken, userController.get);
//Change the user information given the user object.
router.post("/profile", authenticateToken, userController.post);

//Retrieve the listing with userid, id
router.get("/listings/:id", listingsController.get);
//Create a new listing from the data in the post body
router.post("/listings/:id", listingsController.post);
//Delete the listing with id, id
router.delete("/listings/:id/delete", listingsController.delete);

//View all listings
router.get("/listings", listingController.get);

module.exports = router;
