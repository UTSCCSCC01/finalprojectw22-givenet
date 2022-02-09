import Account from "./models/Account";
import User from "./models/Users";
import Social_Media from "./models/SocialMedia";
import Items from "./models/Items";
import Wanted from "./models/Wanted";

const dbInit = () => {
	Account.sync({ force: false });
	User.sync({ force: false });
	Social_Media.sync({ force: false });
	Items.sync({ force: false });
	Wanted.sync({ force: false });
};

export default dbInit;
