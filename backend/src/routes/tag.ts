import express from "express";
import { Router } from "express";

const router: Router = Router();

const tagController = require("../controllers/tag.ts");

// Create a new tag
router.post("/", tagController.post);

// Update a tag
router.put("/:id", tagController.put);

// Remove a tag
router.delete("/:id", tagController.delete);

// Get a tag by id
router.get("/:id", tagController.get);

// Return all tags
router.get("/all", tagController.getAll);

module.exports = router;
