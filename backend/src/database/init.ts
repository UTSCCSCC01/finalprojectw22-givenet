import Account from "./models/Account";
import User from "./models/Users";
import Social_Media from "./models/SocialMedia";
import Item from "./models/Items";
import Wanted from "./models/Wanted";

const dbInit = () => {
	Account.sync({ force: false });
	User.sync({ force: false });
	Social_Media.sync({ force: false });
	Item.sync({ force: false });
	Wanted.sync({ force: false });
};

export default dbInit;
