import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ProfPage from "./ProfilePage"
import Side_Bar from "./SideBar";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);
