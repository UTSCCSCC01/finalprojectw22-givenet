import { Router } from "express";

const router: Router = Router();

const itemCategoryController = require("../controllers/ItemCategoryController.ts");

// Create a new item category
router.post("/itemcategory", itemCategoryController.post);

// Update an item category
router.put("/itemcategory/:id", itemCategoryController.put);

// Remove an item category
router.delete("/itemcategory/:id", itemCategoryController.delete);

// Get an item category by id
router.get("/itemcategory/:id", itemCategoryController.get);

// Return all item categories
router.get("/allitemcategories", itemCategoryController.getAll);

module.exports = router;
