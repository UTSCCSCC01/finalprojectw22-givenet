import Account from "./models/Account";

const dbInit = () => {
	Account.sync({ force: true });
};

export default dbInit;
