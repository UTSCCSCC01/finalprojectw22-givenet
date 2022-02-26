import express from "express";
import { Router } from "express";
import authenticateToken from "../server";

const router: Router = Router();

const userController = require("../controllers/user_profiles.ts");

router.get("/:id/profile", authenticateToken, userController.get);
router.post("/:id/profile", authenticateToken, userController.post);

module.exports = router;
