import express from "express";
import { Router } from "express";

const router: Router = Router();

const itemsController = require("../controllers/ItemsController.ts");

// Create a new item tag
router.post("/item", itemsController.post);

// Update an item tag
router.put("/item/:id", itemsController.put);

// Remove an item tag
router.delete("/item/:id", itemsController.delete);

module.exports = router;
