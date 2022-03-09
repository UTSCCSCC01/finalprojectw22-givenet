import express from "express";
import { Router } from "express";

const router: Router = Router();

const itemController = require("../controllers/ItemController.ts");

// Create a new item tag
router.post("/", itemController.post);

// Update an item tag
router.put("/:id", itemController.put);

// Remove an item tag
router.delete("/:id", itemController.delete);

// Get an item group by id
router.get("/:id", itemController.get);

// Return all item groups
router.get("/all", itemController.getAll);

module.exports = router;
