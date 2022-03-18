import { profile } from "console";
import { Router } from "express";
import authenticateToken from "../server";

const router: Router = Router();

/* account/ */

const authenticateController = require("../controllers/account.ts");

// Logging in
router.post("/login", authenticateController.postLogin);

// Signing up
router.post("/signup", authenticateController.postSignup);



const profileController = require("../controllers/account_details");

// Get account details
router.get("/profile", authenticateToken, profileController.get);

// Get account details for specified account
router.get("/profile/:acc_id", profileController.getById);

// Edit account details
router.post("/profile", authenticateToken, profileController.post);

// Get list of food items commonly donated by the user
router.get("/commonDonations", authenticateToken, authenticateController.getCommonDonationItems);

// Get all accounts for search
router.get("/getAll", profileController.getAll)

module.exports = router;
