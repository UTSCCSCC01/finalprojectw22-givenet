import express from "express";
import { Router } from "express";

const router: Router = Router();

const authenticateController = require("../controllers/account_authenticate.ts");

router.get("/authenticate", authenticateController.get);
router.post("/authenticate", authenticateController.post);

module.exports = router;
