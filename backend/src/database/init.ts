import Account from "./models/Account";
import AccountDetails from "./models/AccountDetails";
import SocialMedia from "./models/SocialMedia";
import Item from "./models/Item";
import CharityWants from "./models/CharityWants";
import Category from "./models/Category";
import Listing from "./models/Listing";
import Pickup from "./models/Pickup";
import DonorHas from "./models/DonorHas";
import Tag from "./models/Tag";

import sequelizeConnection from "./config";

const force = false;
const dbInit = async () => {

	await sequelizeConnection.sync({ force });

	await Category.sync({force });
	await Item.sync({ force });
	await Account.sync({ force });
	await Listing.sync({ force });
	await Pickup.sync({ force });
	await CharityWants.sync({ force });
	await AccountDetails.sync({ force });
	await SocialMedia.sync({ force });
	await DonorHas.sync({ force });
	await Tag.sync({ force });

	console.log("All models were synchronized successfully.");

	// console.log(sequelizeConnection.models);
	//
	// for (let [key, value] of Object.entries(sequelizeConnection.models)) {
	// 	console.log(value.tableName);
	// 	console.log(value.associations);
	// 	console.log(value.prototype);
	// }
};

export default dbInit;
