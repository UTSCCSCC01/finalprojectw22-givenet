import express from "express";
import { Router } from "express";

const router: Router = Router();

const profileController = require("../controllers/user_profiles.ts");
const listingsController = require("../controllers/user_listings.ts");

router.get("/:id/profile", profileController.get);
router.post("/:id/profile", profileController.post);

router.get("/listings/:id", listingsController.get);
//router.post("/listings/:id/edit", listingsController.post);
router.post("/listings/:id/delete", listingsController.post);

module.exports = router;
