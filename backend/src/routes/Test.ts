import express from "express";
import { Router } from "express";

const router: Router = Router();

const controller = require("../controllers/TestController.ts");

router.get("/", controller.get);
router.post("/", controller.post);

module.exports = router;
