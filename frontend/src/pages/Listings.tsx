import React, { useEffect, useState } from "react";
import "../styles/listings.css";

type Listing = {
	listing_id: number;
	acc_id: number;
	items: Array<string>;
    weight: Array<string>;
    expiry: Array<Date>;
};

type Item = {
	item: String;
    weight: String;
    expiry: Date;
}


interface listingProps {
	data: Array<Listing>,
	deleteFunction: (number: number) => any,
	
}

interface newListingProps {
	data: Array<Item>,
}

function GenerateListings({data, deleteFunction}: listingProps) {

	return (
		(data.length) ?
		<table>
			<thead>
				<tr>
					<th className="tableval">ListingId</th>
					<th className="tableval">AccId</th>
					<th className="tableval">Items</th>
					<th className="tableval">Weight</th>
					<th className="tableval">Expiry</th>
					<th className="tableval">Edit</th>
					<th className="tableval">Delete</th>
				</tr>
			</thead>
			<tbody>
				{data.map((val) => (
					<tr className="tableval" key={"tr " + val.listing_id}>
						<td className="tableval" id= "listing_id" key={"listing " + val.listing_id}>{val.listing_id}</td>
						<td className="tableval" key={"accid " +  val.acc_id}>{val.acc_id}</td>
						<td className="tableval" key={"items " +  val.items.toString()}>{val.items.toString()}</td>
						<td className="tableval" key={"weight " +  val.weight.toString()}>{val.weight.toString()}</td>
						<td className="tableval" key={"expire " +  val.expiry.toString()}>{val.expiry.toString()}</td>
						<td className="tableval" key={"edit " +  val.listing_id}><button onClick={() => deleteFunction(val.listing_id)}>EDIT</button></td>
						<td className="tableval" key={"delete " +  val.listing_id}><button onClick={() => deleteFunction(val.listing_id)}>DELETE</button></td>
					</tr>
				))}
			</tbody>
		</table>
		: <div>User has no listings or you have not fetched yet.</div>
	);
}

function ListingTemplateBuilder() {
	const [newUserListings, setnewUserListings] = useState<Array<Item>>([] as Item[]);

	async function AddListingRow() {

		var listElement: Item;
		var newitem = (document.getElementById("newitem") as HTMLInputElement).innerHTML;
		var new_weight = (document.getElementById("neweight") as HTMLInputElement).innerHTML;
		var newexpiry = (document.getElementById("newexpiry") as HTMLInputElement).innerHTML;
		var today = new Date();
		var expiry = today.setDate(today.getDate() + Number(newexpiry));

		listElement = {
			item: newitem,
			weight: new_weight,
			expiry: new Date(expiry),
		}

		var listingArray = Array<Item>();
		for (var i = 0; i < newUserListings.length; i++) {
			listingArray.push(newUserListings[i]);
		}
		listingArray.push(listElement);
		setnewUserListings(listingArray);

		
	}


	function AddListings({data}: newListingProps) {
		useEffect(() => {
			console.log(newUserListings);
		
		});

		var newEntryField = <table>
			<thead>
				<tr>
					<th className="tableval">Item</th>
					<th className="tableval">Weight</th>
					<th className="tableval">Expiry</th>
				</tr>
			</thead>
			<tbody>

					
				<tr>
					<td contentEditable="true"className="tableval" id="newitem"></td>
					<td contentEditable="true" className="tableval" id="neweight"></td>
					<td contentEditable="true" className="tableval" id="newexpiry"></td>
				</tr>
				<tr>
				<td colSpan={3}><button id="moreItems" onClick={AddListingRow}>Add new item</button></td>
				</tr>
			</tbody>
		</table>


		return (
			(data.length) ?
			<table>
				<thead>
					<tr>
						<th className="tableval">Item</th>
						<th className="tableval">Weight</th>
						<th className="tableval">Expiry</th>
					</tr>
				</thead>
				<tbody>
					{data.map((val) => (
						<tr key={val.item.toString()}>
							<td className="tableval" >{val.item}</td>
							<td className="tableval" >{val.weight}</td>
							<td className="tableval" >{val.expiry.toDateString()}</td>
						</tr>
					))}
					<tr>
						<td contentEditable="true"className="tableval" id="newitem"></td>
						<td contentEditable="true" className="tableval" id="neweight"></td>
						<td contentEditable="true" className="tableval" id="newexpiry"></td>
					</tr>
					<tr>
					<td colSpan={3}><button id="moreItems" onClick={AddListingRow}>Add new item</button></td>
					</tr>
				</tbody>
			</table>

			:newEntryField
		)
	}	

	return (
		<AddListings data={newUserListings}/>
	)

}

function Listings() {
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
				alert("SERVER ERROR 501\n");
			}
		})
	}

	return (
		<div>
			<div id="mainDiv">
				<label htmlFor="AccID">AccID: </label>
				<input type="text" name="AccID" id="AccID"></input> <br /> <br />
				<hr />
				<h1>Add Listing</h1>
				Add a new listing below and hit Add Listing to add this listing. <br />
				<button onClick={fetchUserData}>Add Listing</button> <br /> <br />
				<ListingTemplateBuilder/>
				<br />
				<hr />	
			</div>
			<h1>FETCH ACC DATA</h1>
			<button onClick={fetchUserData}>Populate Data</button> <br />
			<br />
			<GenerateListings data={userListings} deleteFunction={DeleteListings}/>
		</div>
	);
}


export default Listings;