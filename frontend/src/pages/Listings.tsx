import React, { useState } from "react";
import "../styles/listings.css";

type Listing = {
	listing_id: number;
	acc_id: number;
	location: string;
	items: Array<string>;
    weight: Array<string>;
    expiry: Array<Date>;
};




interface listingProps {
	data: Array<Listing>,
	deleteFunction: (number: number) => any 
}


function GenerateListings({data, deleteFunction}: listingProps) {

	return (
		(data.length) ?
		<table>
			<thead>
				<tr>
					<th>ListingId</th>
					<th>AccId</th>
					<th>Items</th>
					<th>Weight</th>
					<th>Expiry</th>
					<th>Edit</th>
					<th>Delete</th>
				</tr>
			</thead>
			<tbody>
				{data.map((val) => (
					<tr key={"tr " + val.listing_id}>
						<td id= "listing_id" key={"listing " + val.listing_id}>{val.listing_id}</td>
						<td key={"accid " +  val.acc_id}>{val.acc_id}</td>
						<td key={"items " +  val.items.toString()}>{val.items.toString()}</td>
						<td key={"weight " +  val.weight.toString()}>{val.weight.toString()}</td>
						<td key={"expire " +  val.expiry.toString()}>{val.expiry.toString()}</td>
						<td key={"edit " +  val.listing_id}><button onClick={() => deleteFunction(val.listing_id)}>EDIT</button></td>
						<td key={"delete " +  val.listing_id}><button onClick={() => deleteFunction(val.listing_id)}>DELETE</button></td>
					</tr>
				))}
			</tbody>
		</table>
		: <div>User has no listings or you have not fetched yet.</div>
	);
}

function Listings() {

	// var data = [] as Listing[];
	const [userListings, setUserListings] = useState<Array<Listing>>([] as Listing[]);

	async function fetchUserData() {
		var accID = (document.getElementById("AccID") as HTMLInputElement).value;
	
		const response = await fetch("/user/listings/" + String(accID) , {
			method: "GET",
		});
	
		setUserListings(await response.json());
	}

	async function DeleteListings(id: number) {

		const options = {
			headers: { "Content-Type": "application/json" },
			method: "POST",
			body: JSON.stringify({}),
		};
	
		fetch(
			"/user/listings/" + String(id) + "/delete",
			options
		)
		.then(response => {
			if (response.status != 404) {
				console.log("Successful delete wahooololoolo");
				setUserListings(userListings.filter(Listing => Listing.listing_id !== id));
			} else {
				alert("You idiot dumb dog looking stupid crap\n");
			}
		});

		// if (response == 0) {
		// 	console.log("Successful delete wahooololoolo")
		// }

		// setUserListings(userListings.filter(Listing => Listing.listing_id !== id));
	}

	return (
		<div>
			<div id="mainDiv">
				<br /> <br /><br />
				<h1>FETCH ACC DATA</h1>
				<div>
					<label htmlFor="AccID">AccID: </label>
					<input type="text" name="AccID" id="AccID"></input> <br /> <br />
					<button onClick={fetchUserData}>Populate Data</button> <br />
				</div>
				<br />
				<hr />	
			</div>
			<GenerateListings data={userListings} deleteFunction={DeleteListings}/>
		</div>
	);
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

}


export default Listings;