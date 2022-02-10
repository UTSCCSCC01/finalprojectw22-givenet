import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { TokenContext } from "./TokenContext";

async function fetchUserData() {
	var accID = (document.getElementById("AccID") as HTMLInputElement).value;

	const response = await fetch("/user/" + String(accID) + "/profile", {
		method: "GET",
	});
	const result = await response.json();

	console.log(result);
	(document.getElementById("Name") as HTMLInputElement).value = result.name;
	(document.getElementById("Location") as HTMLInputElement).value =
		result.location;
	(document.getElementById("HoO") as HTMLInputElement).value = result.hours;
	(document.getElementById("Phone") as HTMLInputElement).value = result.phone;
	(document.getElementById("Email") as HTMLInputElement).value = result.email;
}

async function updateUserData() {
	const newData = {
		name: (document.getElementById("Name") as HTMLInputElement).value,
		location: (document.getElementById("Location") as HTMLInputElement)
			.value,
		hours: (document.getElementById("HoO") as HTMLInputElement).value,
		email: (document.getElementById("Phone") as HTMLInputElement).value,
		phone: (document.getElementById("Email") as HTMLInputElement).value,
	};

	const options = {
		headers: { "Content-Type": "application/json" },
		method: "POST",
		body: JSON.stringify(newData),
	};

	var accID = (document.getElementById("AccID") as HTMLInputElement).value;
	const response = await fetch(
		"/user/" + String(accID) + "/profile",
		options
	);

	console.log(response);
}

function App() {
	const [tokenState, setTokenState] = useState("");

	return (
		<div className="App">
			<header className="App-header"></header>
			<br />
			<hr />
			<h1>FETCH ACC DATA</h1>
			<label htmlFor="AccID">AccID: </label>
			<input type="text" name="AccID" id="AccID"></input> <br /> <br />
			<button onClick={fetchUserData}>Populate Data</button> <br />
			<br />
			<hr />
			<h1>UPDATE ACC DATA</h1>
			<form>
				<label htmlFor="name">Name: </label>
				<input type="text" name="name" id="Name"></input> <br />
				<br />
				<label htmlFor="location">Location: </label>
				<input type="text" name="location" id="Location"></input> <br />
				<br />
				<label htmlFor="hours">HoO: </label>
				<input type="text" name="hours" id="HoO"></input> <br />
				<br />
				<label htmlFor="phone">Phone: </label>
				<input type="text" name="phone" id="Phone"></input> <br />
				<br />
				<label htmlFor="email">Email: </label>
				<input type="email" name="email" id="Email"></input> <br />
				<br />
			</form>
			<button onClick={updateUserData}>Submit Changes</button>
			<SignUpPage />
			<TokenContext.Provider value={{ tokenState, setTokenState }}>
				<LoginPage />
			</TokenContext.Provider>
			<button>Logout</button>
		</div>
	);
}

export default App;
