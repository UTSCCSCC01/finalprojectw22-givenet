import express from "express";
import { Router } from "express";
import authenticateToken from "../server";

const router: Router = Router();

const userController = require("../controllers/user_profiles.ts");
const listingsController = require("../controllers/user_listings.ts");

//Check if the user exists given the user object.
router.get("/profile", authenticateToken, userController.get);
//Change the user information given the user object.
router.post("/profile", authenticateToken, userController.post);

//
router.get("/listings/:id", listingsController.get);
router.post("/listings/:id", listingsController.post);
router.delete("/listings/:id/delete", listingsController.delete);

module.exports = router;
