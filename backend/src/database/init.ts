import Account from "./models/Account";
import AccountDetails from "./models/AccountDetails";
import SocialMedia from "./models/SocialMedia";
import Item from "./models/Item";
import WantsItem from "./models/WantsItem";
import Admin from "./models/Admin";
import CharitableOrg from "./models/CharitableOrg";
import Created from "./models/Created";
import Donor from "./models/Donor";
import GetsClaimedFor from "./models/GetsClaimedFor";
import HasItem from "./models/HasItem";
import ItemCategory from "./models/ItemCategory";
import Listing from "./models/Listing";
import Pickup from "./models/Pickup";

const dbInit = () => {
	ItemCategory.sync({ force: true });
	Admin.sync({ force: true });
	CharitableOrg.sync({ force: true });
	Donor.sync({ force: true });
	Account.sync({ force: true });
	Listing.sync({ force: true });
	Pickup.sync({ force: true });
	WantsItem.sync({ force: true });
	AccountDetails.sync({ force: true });
	SocialMedia.sync({ force: true });
	Created.sync({ force: true });
	GetsClaimedFor.sync({ force: true });
	HasItem.sync({ force: true });
	Item.sync({ force: true });
};

export default dbInit;

