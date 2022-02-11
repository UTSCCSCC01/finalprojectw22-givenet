import express from "express";
import { Router } from "express";

const router: Router = Router();

const authenticateController = require("../controllers/account_authenticate.ts");

router.post("/login", authenticateController.postLogin);
router.post("/signup", authenticateController.postSignup);

module.exports = router;
