import { Router } from "express";

const router: Router = Router();

const categoryController = require("../controllers/category.ts");

//Route: /category

// Create a new category
router.post("/", categoryController.post);

// Update a category
router.put("/:id", categoryController.put);

// Remove a category
router.delete("/:id", categoryController.delete);

// Get a category by id
router.get("/:id", categoryController.get);

// Return all categories
router.get("/all", categoryController.getAll);

module.exports = router;
