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

function GenerateListings() {
	const exData = {
		ListingId: 3,
		AccId: 1235,
		Items: ["Fruits", "Bread", "Milk"],
		Weight: ["10kg", "5kg", "66kg"],
		Expiry: ["date", "date", "date"],
		Container: 2,
		Location: "213 Papa Johns Avenue, Peach's house",
		Notes: "Don't show up after 6 pm or before 6 am. No one is home."
	}

	const data = [];
	data.push(exData)
	const divElements = []

	return (
		<table>
			<thead>
				<th>ListingId</th>
				<th>AccId</th>
				<th>Items</th>
				<th>Weight</th>
				<th>Expiry</th>
				<th>Container</th>
				<th>Location</th>
				<th>Notes</th>
				<th>Edit</th>
			</thead>
			<tbody>
				{data.map((val) => (
					<tr>
						<td key={val.ListingId}>{val.ListingId}</td>
						<td key={val.AccId}>{val.AccId}</td>
						<td key={val.Items.toString()}>{val.Items.toString()}</td>
						<td key={val.Weight.toString()}>{val.Weight.toString()}</td>
						<td key={val.Expiry.toString()}>{val.Expiry.toString()}</td>
						<td key={val.Container}>{val.Container}</td>
						<td key={val.Location}>{val.Location}</td>
						<td key={val.Notes}>{val.Notes}</td>
						<td key={val.ListingId}><a href={'profile/listings/edit/' + val.ListingId}>EDIT</a></td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

function Listings() {
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
			
			<GenerateListings />
			<button onClick={updateUserData}>Update</button>
		</div>
	);
}

export default Listings;