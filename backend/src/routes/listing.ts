import {Router} from "express";

const router: Router = Router();

const listingController = require("../controllers/listing.ts");

//Route: /listing

// Retrieve the listing with userid, id
router.get("/", listingController.get);

// Create a new listing from the data in the post body
router.post("/", listingController.post);

// View all listings
router.get("/all", listingController.getAll);

// Delete the listing with id, id
router.delete("/:id", listingController.delete);

module.exports = router;
