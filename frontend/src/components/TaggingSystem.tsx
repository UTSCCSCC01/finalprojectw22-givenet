import React, { useEffect, useState } from "react";
import ItemOutput from "../../../backend/src/database/models/Items";
import ItemGroupOutput from "../../../backend/src/database/models/ItemGroups";
import {
	Button,
	Card,
	CloseButton,
	Col,
	Container,
	Form,
	Row,
} from "react-bootstrap";

/* Helpers for CRUD operations */

async function postItemTag(item_id: number, name: string, group_id: number) {
	try {
		const newItem = {
			item_id: item_id,
			name: name,
			group: group_id,
		};
		const postResponse = await fetch("/item", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newItem),
		});
		return postResponse.json();
	} catch (error) {
		console.log(error);
		return {};
	}
}

async function addItemTag(items: ItemOutput[], name: string, group_id: number) {
	// Citation: https://stackoverflow.com/questions/4020796/finding-the-max-value-of-an-attribute-in-an-array-of-objects
	const newItemID =
		Math.max.apply(
			Math,
			items.map(function (o) {
				return o.item_id;
			})
		) + 1;
	return await postItemTag(newItemID, name, group_id);
}

async function getAllItemTags() {
	try {
		const allItemsResponse = await fetch("/allitems", {
			method: "GET",
		});
		const allItemTags: ItemOutput[] = await allItemsResponse.json();
		return allItemTags;
	} catch (error) {
		console.log(error);
		return [];
	}
}

async function deleteItemTag(tag_id: number) {
	try {
		const deleteItemResponse = await fetch("/item/" + String(tag_id), {
			method: "DELETE",
		});
	} catch (error) {
		console.log(error);
	}
}

async function getAllItemCategories() {
	try {
		const allCategoriesResponse = await fetch("/allitemgroups", {
			method: "GET",
		});
		const allItemCategories: ItemGroupOutput[] =
			await allCategoriesResponse.json();
		return allItemCategories;
	} catch (error) {
		console.log(error);
		return [];
	}
}

async function postCategory(category_id: number, name: string, desc: string) {
	try {
		const newCategory = {
			item_group_id: category_id,
			name: name,
			desc: desc,
		};
		const postResponse = await fetch("/itemgroup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newCategory),
		});
		return postResponse.json();
	} catch (error) {
		console.log(error);
		return {};
	}
}

async function addCategory(
	categories: ItemGroupOutput[],
	name: string,
	desc: string
) {
	// Citation: https://stackoverflow.com/questions/4020796/finding-the-max-value-of-an-attribute-in-an-array-of-objects
	const newCategoryID =
		Math.max.apply(
			Math,
			categories.map(function (o) {
				return o.item_group_id;
			})
		) + 1;
	return await postCategory(newCategoryID, name, desc);
}

async function deleteItemCategory(category_id: number) {
	try {
		const deleteItemCategoryResponse = await fetch(
			"/itemgroup/" + String(category_id),
			{
				method: "DELETE",
			}
		);
	} catch (error) {
		console.log(error);
	}
}

export default function TaggingSystem() {
	// State for all the tags/categories etc.
	const [tagItems, setTagItems] = useState<ItemOutput[]>([]);
	const [tagCategories, setTagCategories] = useState<ItemGroupOutput[]>([]);
	const [newItemName, setNewItemName] = useState("");
	const [newItemGroupID, setNewItemGroupID] = useState(Number());
	const [newCategoryName, setNewCategoryName] = useState("");
	const [newCategoryDesc, setNewCategoryDesc] = useState("");

	// On page load, populate the item tags and categories on the page
	useEffect(() => {
		const fetchTagItems = async () => {
			const tags = await getAllItemTags();
			setTagItems(tags);
		};
		const fetchTagCategories = async () => {
			const categories = await getAllItemCategories();
			setTagCategories(categories);
		};

		fetchTagItems();
		fetchTagCategories();
	}, []);

	// Add an item tag using the current state
	const addNewItemTag = async () => {
		const newItem = await addItemTag(tagItems, newItemName, newItemGroupID);
		setTagItems([...tagItems, newItem]);
	};

	// Add a new cateogory using the current state
	const addNewCategory = async () => {
		const newCategory = await addCategory(
			tagCategories,
			newCategoryName,
			newCategoryDesc
		);
		setTagCategories([...tagCategories, newCategory]);
	};

	return (
		<div className="container">
			<h1 className="mt-5 mb-3">TAGGING SYSTEM</h1>
			<Container className="mb-3">
				<Row xs={10} lg={20}>
					<Col>
						<Form className="w-100">
							<Form.Group>
								<Form.Label> Tag Name </Form.Label>
								<Form.Control
									type="text"
									id="addtagname"
									placeholder="Enter a tag name"
									value={newItemName}
									onChange={(e) =>
										setNewItemName(e.target.value)
									}
								></Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label> Group Id </Form.Label>
								<Form.Control
									type="number"
									placeholder="Enter a group id"
									id="addtaggroupid"
									value={newItemGroupID}
									onChange={(e) =>
										setNewItemGroupID(+e.target.value)
									}
								></Form.Control>
							</Form.Group>
							<Button className="mt-1" onClick={addNewItemTag}>
								Add Tag
							</Button>
						</Form>
					</Col>
					<Col>
						<Form className="w-100">
							<Form.Group>
								<Form.Label> Category Name </Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter a category name"
									id="addcategoryname"
									value={newCategoryName}
									onChange={(e) =>
										setNewCategoryName(e.target.value)
									}
								></Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label> Description </Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter a description"
									id="addcategorydesc"
									value={newCategoryDesc}
									onChange={(e) =>
										setNewCategoryDesc(e.target.value)
									}
								></Form.Control>
							</Form.Group>
							<Button className="mt-1" onClick={addNewCategory}>
								Add Category
							</Button>
						</Form>
					</Col>
				</Row>
			</Container>

			<Container>
				<Row>
					{tagItems.map((itemTag: ItemOutput) => (
						<Col>
							<Card
								style={{ width: "100%" }}
								border="primary"
								className="mt-1 mb-1"
							>
								<Card.Body>
									<Card.Header className="mb-2">
										{" "}
										Item Tag{" "}
									</Card.Header>
									<Card.Title> {itemTag.name} </Card.Title>
									<Card.Subtitle>
										Item Id: {itemTag.item_id}
									</Card.Subtitle>
									<Card.Text>
										{" "}
										Group Id: {itemTag.group}{" "}
									</Card.Text>
									<Card.Text>
										{" "}
										Created: {itemTag.createdAt}{" "}
									</Card.Text>
									<Card.Text>
										{" "}
										Updated: {itemTag.updatedAt}{" "}
									</Card.Text>
									<CloseButton
										className="mt-1 ml-1"
										onClick={() => {
											deleteItemCategory(itemTag.item_id);
											const filteredArray =
												tagItems.filter(
													(item) => item !== itemTag
												);
											setTagItems(filteredArray);
										}}
									/>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>

				<Row>
					{tagCategories.map((itemCategory: ItemGroupOutput) => (
						<Col>
							<Card
								style={{ width: "100%" }}
								border="dark"
								className="mt-1 mb-1"
							>
								<Card.Body>
									<Card.Header className="mb-2">
										{" "}
										Item Category{" "}
									</Card.Header>
									<Card.Title>
										{" "}
										{itemCategory.name}{" "}
									</Card.Title>
									<Card.Subtitle>
										ID: {itemCategory.item_group_id}{" "}
									</Card.Subtitle>
									<Card.Text> {itemCategory.desc} </Card.Text>
									<CloseButton
										className="mt-1 ml-1"
										onClick={() => {
											deleteItemCategory(
												itemCategory.item_group_id
											);
											const filteredArray =
												tagCategories.filter(
													(category) =>
														category !==
														itemCategory
												);
											setTagCategories(filteredArray);
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
