import {Router} from "express";
import authenticateToken from "../server";

const router: Router = Router();

const pickupController = require("../controllers/pickup.ts");

//Route: /pickup

// Create/schedule a pickup
router.post("/", authenticateToken, pickupController.post);


module.exports = router;
