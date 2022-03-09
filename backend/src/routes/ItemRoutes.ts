import express from "express";
import { Router } from "express";

const router: Router = Router();

const itemController = require("../controllers/ItemController.ts");

// Create a new item tag
router.post("/item", itemController.post);

// Update an item tag
router.put("/item/:id", itemController.put);

// Remove an item tag
router.delete("/item/:id", itemController.delete);

// Get an item group by id
router.get("/item/:id", itemController.get);

// Return all item groups
router.get("/allitems", itemController.getAll);

module.exports = router;
