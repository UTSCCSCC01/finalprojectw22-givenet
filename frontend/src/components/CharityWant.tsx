import {useState, useContext, useEffect } from "react";
import { Button, Form, Container, Row, Col, Card, CloseButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { TagOutput } from "../../../backend/src/database/models/Tag";
import { TokenContext } from "../TokenContext";
import { CharityWantsOutput } from "../../../backend/src/database/models/CharityWants"

export default function WantedItems() {
	const [accountId, setAccountId] = useState(Number());
	const [itemId, setItemId] = useState(Number());
	const [tagItems, setTagItems] = useState<TagOutput[]>([]);
	const [charityWants, setCharityWants] = useState<CharityWantsOutput[]>([]);
	const [itemMap, setItemMap] = useState({});
	const { token } = useContext(TokenContext);
	
	// Retrieve all item tags from the database.
	async function getAllItemTags() {
		try {
		  	const allItemsResponse = await fetch("/tag/all/", {
			method: "GET",
			headers: {
			  	authorization: `Bearer ${token}`,
			},
		  });
		  	if (allItemsResponse.status !== 200) {
				console.log(allItemsResponse.status);
				return {};
		  	} else {
				let map = {};
				let response = await allItemsResponse.json();
				for (let item of response){
					// @ts-ignore
					map[+item.item_id] = item.name.toString();
				}
				setItemMap(map);
				return response
		  	}
		} catch (error) {
		  console.log(error);
		  return [];
		}
	  }

	// Retrieve all Charity Wants lists from the database
	async function getAllWantedLists(){
		try{
			const allWantedListResponse = await fetch("/wanted/all", {
				method:"GET",
			});
			if(allWantedListResponse.status !== 200){
				console.log(allWantedListResponse.status);
				return [];
			}else{
				return await allWantedListResponse.json();
			}
		}catch(error){
			console.log(error);
			return [];
		}
	}

	async function addCharityWant(acc_id: number, item_id: number){
		try{
			const newCharityWant = {
				acc_id: acc_id,
				item_id: item_id,
			};
			const addCharityWantResponse = await fetch("/wanted", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				  },
				body: JSON.stringify(newCharityWant),
			});
			if (addCharityWantResponse.status !== 200){
				return {};
			}else{
				return await addCharityWantResponse.json();
			}
		}catch(error){
			console.log(error)
			return {};
		}
	}

	async function deleteCharityWant(acc_id: number, item_id: number){
		try{
			const target = {
				acc_id: acc_id,
				item_id: item_id,
			};
			const isDeleted = await fetch("wanted/",{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(target),
			});
			if (isDeleted.status !== 200){
				return {};
			}else{
				return await isDeleted.json();
			}
		}catch(error){
			console.log(error);
			return{};
		}
	}

	// On page load, populate  the items list and list of charity wants
	useEffect(() => {
		const fetchTagItems = async () =>{
			const tags = await getAllItemTags();
			setTagItems(tags);
		};
		const fetchWantedLists = async () =>{
			const lists = await getAllWantedLists();
			setCharityWants(lists);
		};
		setItemId(1);
		fetchTagItems().then((r) => console.log("done items"));
		fetchWantedLists().then((r) => console.log("done wanted lists"));
	}, []);

	const addNewCharityWant = async () =>{
		await addCharityWant(accountId, itemId);
		const lists = await getAllWantedLists();
		setCharityWants(lists);
	}

	async function delCharityWant(acc_id: number, item_id: number){
		await deleteCharityWant(acc_id, item_id);
		const lists = await getAllWantedLists();
		setCharityWants(lists);
	}

	return (
		<div className="container">
			<Container className="mb-3">
        	<Row xs={10} lg={20}>
          		<Col>
            		<Form className="w-100">
              			<Form.Group>
                			<Form.Label> Account ID </Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter account ID"
								name="acc_id"
								onChange={(e)=>{
									setAccountId(+e.target.value);
									console.log(+e.target.value);
								}}
							/>
              			</Form.Group>
						<Form.Group>
							<Form.Label> Add Item </Form.Label>
							<Form.Select
								onChange={(e: any) => {
									setItemId(+e.target.value);
									console.log(+e.target.value);
								  }}
							>
							{tagItems.map((item) => (
								<option value={item.tag_id}>
									{item.name}
								</option>
                  			))}	
							</Form.Select>
              			</Form.Group>
						<Button className="mt-1"onClick={addNewCharityWant} >
							Add to Charity Want
						</Button>
            		</Form>
          		</Col>
			</Row>
		</Container>
		
		<Container>
			<Row>
				{charityWants.map((listing: CharityWantsOutput) => (
					<Col>
						<Card
							style={{width: "100%"}}
							border="primary"
							className="mt-1 mb-1"
						>
							<Card.Body>
								<Card.Header> Charity Wants </Card.Header>
								<Card.Title>{listing.acc_id}</Card.Title>
								<Card.Subtitle>Item Id: {listing.item_id} </Card.Subtitle>
								<Card.Text>
									Item: {" "}
									{
										// @ts-ignore
										itemMap[listing.item_id]
									}{" "}
								</Card.Text>
								<CloseButton
									className="mt-1 ml-1"
									onClick={async () => {
										await delCharityWant(listing.acc_id, listing.item_id);
									}}
								/>
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>
		</Container>
		</div>
	);
}