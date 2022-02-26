import Account from "./models/Account";
import User from "./models/Users";
import Social_Media from "./models/SocialMedia";
import Items from "./models/Items";
import Wanted from "./models/Wanted";
import ItemGroups from "./models/ItemGroups";

const force = false;
const dbInit = () => {
	Account.sync({ force });
	User.sync({ force });
	Social_Media.sync({ force });
	ItemGroups.sync({ force });
	Items.sync({ force });
	Wanted.sync({ force });
};

export default dbInit;
