import SideBar from "./side_bar";

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
		phone: (document.getElementById("Phone") as HTMLInputElement).value,
		email: (document.getElementById("Email") as HTMLInputElement).value,
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
function Side_Bar() {
	return (
		<div className="pp">
				<br /> <br /><br />
				<h1>FETCH ACC DATA</h1>
				<div>
					<label htmlFor="AccID">AccID: </label>
					<input type="text" name="AccID" id="AccID"></input> <br /> <br />
					<button onClick={fetchUserData}>Populate Data</button> <br />
				</div>
                <br />
            <hr />
			<SideBar/>
			<button onClick={updateUserData}>Update</button>
		</div>
	);
}

export default Side_Bar;