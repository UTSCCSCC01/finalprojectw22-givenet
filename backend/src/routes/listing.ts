import {Router} from "express";

const router: Router = Router();

const listingController = require("../controllers/listing.ts");

//Route: /listing

// Retrieve the listing with userid, id
router.get("/", listingController.get);

// Create a new listing from the data in the post body
router.post("/", listingController.post);

// View all valid listings
router.get("/all", listingController.getAllValid);

// Delete the listing with id, id
router.delete("/:id", listingController.delete);

// Get in progress or completed listings for a user.
router.get("/completed/:state", listingController.getCompleted);

// Get unclaimed listings
router.get("/unclaimed/", listingController.getUnclaimed);

module.exports = router;
