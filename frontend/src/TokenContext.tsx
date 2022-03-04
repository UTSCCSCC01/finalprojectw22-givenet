import { createContext } from "react";

export interface TokenContextInterface {
	token: string;
	setToken: React.Dispatch<React.SetStateAction<string>>;
}

export const TokenContext = createContext({} as TokenContextInterface);
