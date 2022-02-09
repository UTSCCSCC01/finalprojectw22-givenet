import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ProfPage from "./ProfilePage"
import Side_Bar from "./SideBar";

ReactDOM.render(
	<React.StrictMode>
		<App />
		<Side_Bar />
	</React.StrictMode>,
	document.getElementById("root")
);
