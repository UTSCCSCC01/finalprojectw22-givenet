import express from "express";
import { Router } from "express";

const router: Router = Router();

const itemsGroupController = require("../controllers/ItemsGroupController.ts");

// Create a new item group
router.post("/itemgroup", itemsGroupController.post);

// Update an item group
router.put("/itemgroup/:id", itemsGroupController.put);

// Remove an item group
router.delete("/itemgroup/:id", itemsGroupController.delete);

module.exports = router;
