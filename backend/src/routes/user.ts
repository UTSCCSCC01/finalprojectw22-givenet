import express from "express";
import { Router } from "express";
import authenticateToken from "../server";

const router: Router = Router();

const userController = require("../controllers/user_profiles.ts");

router.get("/profile", authenticateToken, userController.get);
router.post("/profile", authenticateToken, userController.post);

module.exports = router;
