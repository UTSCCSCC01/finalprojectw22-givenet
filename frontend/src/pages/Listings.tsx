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
	data: Array<Listing>
}

function DeleteListings() {

}

function GenerateListings({data}: listingProps) {


	const exData = {
		listing_id: 3,
		acc_id: 1235,
		items: ["Fruits", "Bread", "Milk"],
		weight: ["10kg", "5kg", "66kg"],
		expiry: ["date", "date", "date"]
	}
	const divElements = []

	var element = (
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
						<td key={"edit " +  val.listing_id}><button onClick={DeleteListings}>EDIT</button></td>
						<td key={"delete " +  val.listing_id}><button onClick={DeleteListings}>DELETE</button></td>
					</tr>
				))}
			</tbody>
		</table>
		: <div>User has no listings or you have not fetched yet.</div>
	);
	return element;
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
			<GenerateListings data={userListings}/>
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

	console.log(response);
}


export default Listings;