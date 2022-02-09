import { createContext } from "react";

interface TokenContextInterface {
	tokenState: string;
	setTokenState: React.Dispatch<React.SetStateAction<string>>;
}

export const TokenContext = createContext({} as TokenContextInterface);
