import {Router} from "express";
import authenticateToken from "../server";

const router: Router = Router();

const pickupController = require("../controllers/pickup.ts");

//Route: /pickup

// Create/schedule a pickup
router.post("/", authenticateToken, pickupController.post);

// View all pickups scheduled with me
router.get("/", authenticateToken, pickupController.get);

//Get all yoour past completed pickups
router.get("/pastPickups", authenticateToken, pickupController.completePickups);

//Set pickup as completed.
router.post("/completePickup", authenticateToken, pickupController.setPickupCompleted);


module.exports = router;
