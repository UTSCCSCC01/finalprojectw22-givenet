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

// Edit account details
router.post("/profile", authenticateToken, profileController.post);

module.exports = router;
