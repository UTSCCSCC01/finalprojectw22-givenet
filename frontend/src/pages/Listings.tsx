import React, { useEffect, useState } from "react";
import "../styles/listings.css";

//Custom types for data iteration
type Listing = {
	listing_id?: number;
	acc_id: number;
	items: Array<String>;
    weight: Array<String>;
    expiry: Array<Date>;
};

type Item = {
	item: String;
    weight: String;
    expiry: Date;
}


//Props
interface listingProps {
	data: Array<Listing>,
	deleteFunction: (number?: number) => any,
	
}

interface newListingProps {
	data: Array<Item>,
}

interface templateProp {
	add: boolean,
}

//Maybe not necessary anymore
var set = 0;
var lock = 0;

//Listings Display Component: Generates the table of user listings.
function GenerateListings({data, deleteFunction}: listingProps) {

	//Unmaps a datestring to readable date string objects.
	function dateString(data: Array<Date>): string {
		var s = ""
		for (let i = 0; i < data.length; i ++) {
			let date = new Date(data[i]);
			s += date.toDateString() + ", ";
		}
		return s.substring(0, s.length - 2);
	}

	return (
		//Build the table based on current information stores in data.
		(data.length) ?
		<table>
			<thead>
				<tr>
					<th className="tableval">ListingId</th>
					<th className="tableval">AccId</th>
					<th className="tableval">Items</th>
					<th className="tableval">Weight</th>
					<th className="tableval">Days until expiry</th>
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
						<td className="tableval" key={"expire " +  val.expiry.toString()}>{dateString(val.expiry)}</td>
						<td className="tableval" key={"edit " +  val.listing_id}><button>EDIT</button></td>
						<td className="tableval" key={"delete " +  val.listing_id}><button onClick={() => deleteFunction(val.listing_id)}>DELETE</button></td>
					</tr>
				))}
			</tbody>
		</table>
		: <div>User has no listings or you have not fetched yet.</div>
	);
}

//Template componenet: Builds the template form that users interact with to create a nwe listing.
function ListingTemplateBuilder({add}: templateProp) {
	const [newUserListings, setnewUserListings] = useState<Array<Item>>([] as Item[]);
	useEffect(() => {
		if (lock == 1) {
			set = 1;
		}
	}, [newUserListings]);

	//Table shell.
	var newEntryField = <table>
		<thead>
			<tr>
				<th className="tableval">Item</th>
				<th className="tableval">Weight</th>
				<th className="tableval">Days until expiry</th>
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
	
	//Adds a new row to the current table build and appends the current row to an array.
	async function AddListingRow() {

		var listElement: Item;
		var newitem = (document.getElementById("newitem") as HTMLInputElement).innerHTML;
		var new_weight = (document.getElementById("neweight") as HTMLInputElement).innerHTML;
		var newexpiry = (document.getElementById("newexpiry") as HTMLInputElement).innerHTML;
		var today = new Date();
		var expiry;
		if (parseInt(newexpiry)) {
			expiry = today.setDate(today.getDate() + parseInt(newexpiry));
		} else {
			expiry = today.setDate(today.getDate());
		}
		 
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

	//Function which generates the table to be displayed to the user.
	function AddListings({data}: newListingProps) {
		return (
			(data.length) ?
			<table>
				<thead>
					<tr>
						<th className="tableval">Item</th>
						<th className="tableval">Weight</th>
						<th className="tableval">Days until expiry</th>
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

	//Add = add to database, not add = add row.
	if (!add) {
		return (
			<AddListings data={newUserListings}/>
		)
	} 
	//Code that adds the data in newUserListings to the database when the user hits add Listing.
	if (newUserListings.length > 0 && set == 0) {
		var accID = (document.getElementById("Listing_AccID") as HTMLInputElement).value;

		var listingToAdd: Listing = {
			acc_id: Number(accID),
			items: [],
			weight: [],
			expiry: []
		}

		for (let i = 0; i < newUserListings.length; i++) {
			listingToAdd.items.push(newUserListings[i].item)
			listingToAdd.weight.push(newUserListings[i].weight)
			listingToAdd.expiry.push(newUserListings[i].expiry)
		}

		const options = {
			headers: { "Content-Type": "application/json" },
			method: "POST",
			body: JSON.stringify(listingToAdd),
		};
		
		fetch(
			"/user/listings/" + String(accID),
			options
		)
		.then(response => {
			if (response.status !== 404) {
			} else {
				alert("SERVER ERROR 501\n");
			}
		})
		setnewUserListings([] as Item[]);
	}

	return newEntryField;
	

}

//Min function, contains two components Listings Display and Template.
function Listings() {
	const [userListings, setUserListings] = useState<Array<Listing>>([] as Listing[]);
	const [addListing, setAddListing] = useState<boolean>(false);

	//Custom "mutex" lock. May not be necessary.
	function waitForUpdate() {
		//if set isnt 1, timeout and wait until it is.
		if (set !== 1) {
			setTimeout(waitForUpdate, 50);
		} else {
			setAddListing(false);
			set = 0;
			lock = 0;
		}
	}

	function signalListingAdd() {

		//Lock == 0 implies first call, set = 0, tell listing component to add a listing and mutex lock.
		set = 0;
		setAddListing(true);
		lock = 1;

		//wait until it updates.
		waitForUpdate();
	}

	//Fetches data and signals Listing Display to rerender.
	async function fetchUserData() {
		var accID = (document.getElementById("Listing_AccID") as HTMLInputElement).value;
	
		const response = await fetch("/user/listings/" + String(accID) , {
			method: "GET",
		});
	
		setUserListings(await response.json());
	}

	//Deletes data and signals Listing Display to rerender
	async function DeleteListings(id?: number) {

		if (id) {
			const options = {
				headers: { "Content-Type": "application/json" },
				method: "DELETE",
				body: JSON.stringify({}),
			};
		
			fetch(
				"/user/listings/" + String(id) + "/delete",
				options
			)
			.then(response => {	
				if (response.status != 404) {
					setUserListings(userListings.filter(Listing => Listing.listing_id !== id));
				} else {
					alert("SERVER ERROR 501\n");
				}
			})
		}
	}

	//Main page
	return (
		<div>
			<div id="mainDiv">
				<label htmlFor="AccID">AccID: </label>
				<input type="text" name="AccID" id="Listing_AccID"></input> <br /> <br />
				<hr />
				<h1>Add Listing</h1>
				Add a new listing below and hit Add Listing to add this listing. <br />
				<button onClick={() => signalListingAdd()}>Add Listing</button> <br /> <br />
				<ListingTemplateBuilder add={addListing}/>
				<br />
				<hr />	
			
				<h1>FETCH ACC DATA</h1>
				<button onClick={fetchUserData}>Populate Data</button> <br />
				<br />
				<GenerateListings data={userListings} deleteFunction={DeleteListings}/>
			</div>	
		</div>
	);
}


export default Listings;
