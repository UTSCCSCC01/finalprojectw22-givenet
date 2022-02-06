import express from "express";
import { Router } from "express";

const router: Router = Router();

const authenticateController = require("../controllers/user_profiles.ts");

router.get("/:id/profile", authenticateController.get);
router.post("/:id/profile", authenticateController.post);

module.exports = router;
