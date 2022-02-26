import express from "express";
import { Router } from "express";
import authenticateToken from "../server";

const router: Router = Router();

const userController = require("../controllers/user_profiles.ts");
const listingsController = require("../controllers/user_listings.ts");

router.get("/profile", authenticateToken, userController.get);
router.post("/profile", authenticateToken, userController.post);

router.get("/listings/:id", listingsController.get);
//router.post("/listings/:id/edit", listingsController.post);
router.post("/listings/:id/delete", listingsController.post);

module.exports = router;
