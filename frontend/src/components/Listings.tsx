import React, {useContext, useEffect, useState} from "react";
import "../styles/listings.css";
import {Alert, Button, Col, Form, Row} from "react-bootstrap";
import {TokenContext} from "../TokenContext";

//Custom types for data iteration
type Listing = {
	listing_id?: number;
	acc_id: number;
    container: string;
    location: string;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
    items: Array<any>;  //item object
};

type Item = {
	name: string;
    weight: number;
    expiry: Date;
	tag_id: number;
	tag_name: string;
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

type Form = {
	container: string;
	location: string,
	notes: string;
}

//Listings Display Component: Generates the table of user listings.
export default function Listing() {

	const [tags, setTags] = useState<any[]>([]);
	const [item, setItem] = useState<Item>({
		expiry: new Date(),
		name: "",
		tag_id: 0,
		tag_name: "",
		weight: 0,
	});
	const [items, setItems] = useState<Item[]>([]);
	const [form, setForm] = useState<Form>({
		container: "",
		notes: "",
		location: ""
	});

	const [listings, setListings] = useState<Listing[]>([]);

	const { token } = useContext(TokenContext);

	const loadTags = async () => {
		const allItemsResponse = await fetch("/tag/all/", {
			method: "GET",
			headers: {
				authorization: `Bearer ${token}`,
			},
		});

		if (allItemsResponse.status !== 200) {
			return {};
		} else {
			let allTags = await allItemsResponse.json();
			setItem((old) => {
				old.tag_id = allTags[0].tag_id;
				old.tag_name = allTags[0].name;
				return old;
			})
			setTags(allTags);
		}
	}

	const loadListings = async () => {
		const allListings = await fetch("/listing/", {
			method: "GET",
			headers: {
				authorization: `Bearer ${token}`,
			},
		});

		setListings(await allListings.json());
	}
	
	const createListing = async () => {
		  
		let newListing = {...form, createdAt: new Date(), updatedAt: new Date()};
		let newItems = Array<any>();
		  
		for (let i of items) {
			let newItem = {...i,  createdAt: new Date(), updatedAt: new Date()}
			newItems.push(newItem);
		}

		const packagedListing = {
			listing: newListing,
			items: newItems,
		}
		
		console.log(packagedListing)
		let result = await fetch("/listing/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(packagedListing)
		});
	}

	useEffect(() => {
		loadTags().then(value => console.log("loaded tags"));
		loadListings().then(value => console.log("loaded your listings"));
	}, []);

	return (
		<div className="container mt-5">
			<h1>Create a listing</h1>
		<Form>
			<Row className="mb-3">
				<Form.Group as={Col}>
					<Form.Label>Container</Form.Label>
					<Form.Control type="text" placeholder="container" onChange={(e) => {
						setForm((old) => {
							old.container = e.target.value
							return old;
						});
					}}/>
				</Form.Group>

				<Form.Group as={Col} controlId="formGridPassword">
					<Form.Label>Location</Form.Label>
					<Form.Control type="text" placeholder="location" onChange={(e) => {
						setForm((old) => {
							old.location = e.target.value
							return old;
						});
					}}/>
				</Form.Group>
			</Row>

			<Row>
			<Form.Group className="mb-3" controlId="formGridAddress1">
				<Form.Label>Notes</Form.Label>
				<Form.Control as="textarea"
							  type="text"
							  placeholder="add any details you think are necessary"
							  onChange={(e) => {
								  setForm((old) => {
									  old.notes = e.target.value
									  return old;
								  });
							  }}/>
			</Form.Group>
			</Row>

			<div className="border p-5 rounded">
				<h4>Add an item to the listing</h4>
			<Row>
				<Form.Group as={Col} controlId="formGridPassword">
					<Form.Label>Name</Form.Label>
					<Form.Control type="text" placeholder="name" onChange={(e) => {
						setItem((old) => {
							old.name = e.target.value;
							return old;
						})
					}}/>
				</Form.Group>
				<Form.Group as={Col} controlId="formGridPassword">
					<Form.Label>Weight (kg)</Form.Label>
					<Form.Control type="number" placeholder="weight" onChange={(e) => {
						setItem((old) => {
							old.weight = +e.target.value;
							return old;
						})
					}}/>
				</Form.Group>
				<Form.Group as={Col}>
					<Form.Label>Expiry</Form.Label>
					<Form.Control type="date" placeholder="expiry date" onChange={(e) => {
						setItem((old) => {
							old.expiry = new Date(e.target.value);
							return old;
						})
					}}/>
				</Form.Group>
				<Form.Group as={Col} controlId="formGridPassword">
					<Form.Label>Tag</Form.Label>
					<Form.Select
						onChange={(e) => {
							setItem((old) => {
								old.tag_id = +e.target.value;
								old.tag_name = e.target.id;
								return old;
							});
						}}>
						{tags.map(tag => (
							<option
								value={tag.tag_id}
								id={tag.name}>
								{tag.name}
							</option>
						))}
					</Form.Select>
				</Form.Group>
			</Row>
			<Button className="mt-2" onClick={(e) => {
				console.log(item)
				setItems([...items, item]);
				setItem({weight: 0, name: "", expiry: new Date(), tag_id: 0, tag_name: ""})
			}}>
				Add item
			</Button>
		</div>
		</Form>
			<table className="table table-bordered">
				<thead>
				<tr>
					<th scope="col">Name</th>
					<th scope="col">Weight</th>
					<th scope="col">Expiry</th>
					<th scope="col">Tag</th>
				</tr>
				</thead>
				<tbody>
				{items.map(object => (
					<tr>
					<td> {object.name} </td>
						<td> {object.weight} </td>
						<td> {object.expiry.toDateString()} </td>
						<td> {object.tag_name} </td>
					</tr>

				))}
				</tbody>
			</table>
			<Button className="mt-2" onClick={createListing}>
				Create new listing
			</Button>
			<br /><br /><br /><br /><br />
			<h4>Your listings</h4>
			<table className="table table-bordered">
				<thead>
				<tr>
					<th scope="col">Listing ID</th>
					<th scope="col">Container</th>
					<th scope="col">Location</th>
					<th scope="col">Notes</th>
					<th scope="col">Items</th>
				</tr>
				</thead>
				<tbody>
				{listings.map(object => (
					<tr>
					<td> {object.listing_id} </td>
						<td> {object.container} </td>
						<td> {object.location} </td>
						<td> {object.notes} </td>
						<td> hai </td>
					</tr>

				))}
				</tbody>
			</table>
		</div>
	)

}
