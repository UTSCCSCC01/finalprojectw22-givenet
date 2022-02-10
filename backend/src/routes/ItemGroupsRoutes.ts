import { Router } from "express";

const router: Router = Router();

const itemsGroupsController = require("../controllers/ItemGroupsController.ts");

// Create a new item group
router.post("/itemgroup", itemsGroupsController.post);

// Update an item group
router.put("/itemgroup/:id", itemsGroupsController.put);

// Remove an item group
router.delete("/itemgroup/:id", itemsGroupsController.delete);

// Get an item group by id
router.get("/itemgroup/:id", itemsGroupsController.get);

// Return all item groups
router.get("/allitemgroups", itemsGroupsController.getAll);

module.exports = router;
