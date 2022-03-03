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

import sequelizeConnection from "./config";

const dbInit = async () => {

	// await sequelizeConnection.sync({ force: true });

	await ItemCategory.sync({ force: true });
	await Item.sync({ force: true });
	await Account.sync({ force: true });
	await Admin.sync({ force: true });
	await CharitableOrg.sync({ force: true });
	await Donor.sync({ force: true });
	await Listing.sync({ force: true });
	await Pickup.sync({ force: true });
	await WantsItem.sync({ force: true });
	await AccountDetails.sync({ force: true });
	await SocialMedia.sync({ force: true });
	await Created.sync({ force: true });
	await GetsClaimedFor.sync({ force: true });
	await HasItem.sync({ force: true });

	console.log("All models were synchronized successfully.");

	console.log(sequelizeConnection.models);

	for(let [key, value] of Object.entries(sequelizeConnection.models)) {
		console.log(value.tableName);
		console.log(value.associations);
		console.log(value.prototype);
	}
};

export default dbInit;

