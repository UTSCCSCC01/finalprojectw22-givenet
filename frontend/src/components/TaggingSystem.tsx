import React, { useContext, useEffect, useState } from "react";
import TagOutput from "../../../backend/src/database/models/Tag";
import CategoryOutput from "../../../backend/src/database/models/Category";
import { TokenContext } from "../TokenContext";

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

async function postItemTag(name: string, group_id: number) {
	try {
		const newItem = {
			name: name,
			category: group_id,
		};

		const { token } = useContext(TokenContext);

		const postResponse = await fetch("/tag", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(newItem),
		});
		return postResponse.json();
	} catch (error) {
		console.log(error);
		return {};
	}
}

async function addItemTag(items: TagOutput[], name: string, group_id: number) {
	// Citation: https://stackoverflow.com/questions/4020796/finding-the-max-value-of-an-attribute-in-an-array-of-objects
	/*const newItemID =
		Math.max.apply(
			Math,
			items.map(function (o) {
				return o.tag_id;
			})
		) + 1;
	*/
	return await postItemTag(name, group_id);
}

async function getAllItemTags() {
	try {
		const { token } = useContext(TokenContext);

		const allItemsResponse = await fetch("/tag/all", {
			method: "GET",
			headers: {
				authorization: `Bearer ${token}`,
			},
		});
		const allItemTags: TagOutput[] = await allItemsResponse.json();
		return allItemTags;
	} catch (error) {
		console.log(error);
		return [];
	}
}

async function deleteItemTag(tag_id: number) {
	try {
		const { token } = useContext(TokenContext);

		const deleteItemResponse = await fetch("/tag/" + String(tag_id), {
			method: "DELETE",
			headers: {
				authorization: `Bearer ${token}`,
			},
		});
	} catch (error) {
		console.log(error);
	}
}

async function getAllItemCategories() {
	try {
		const { token } = useContext(TokenContext);
		const allCategoriesResponse = await fetch("/category/all", {
			method: "GET",
			headers: {
				authorization: `Bearer ${token}`,
			},
		});
		const allItemCategories: CategoryOutput[] =
			await allCategoriesResponse.json();
		return allItemCategories;
	} catch (error) {
		console.log(error);
		return [];
	}
}

async function postCategory(name: string, desc: string) {
	try {
		const newCategory = {
			name: name,
			desc: desc,
		};
		const { token } = useContext(TokenContext);
		const postResponse = await fetch("/category", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${token}`,
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
	categories: CategoryOutput[],
	name: string,
	desc: string
) {
	// Citation: https://stackoverflow.com/questions/4020796/finding-the-max-value-of-an-attribute-in-an-array-of-objects
	/*
	const newCategoryID =
		Math.max.apply(
			Math,
			categories.map(function (o) {	
				return o.category_id;
			})
		) + 1;
	*/
	return await postCategory(name, desc);
}

async function deleteItemCategory(category_id: number) {
	try {
		const { token } = useContext(TokenContext);
		const deleteItemCategoryResponse = await fetch(
			"/tag/" + String(category_id),
			{
				method: "DELETE",
				headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${token}`,
			},
			}
		);
	} catch (error) {
		console.log(error);
	}
}

export default function TaggingSystem() {
	// State for all the tags/categories etc.
	const [tagItems, setTagItems] = useState<TagOutput[]>([]);
	const [tagCategories, setTagCategories] = useState<CategoryOutput[]>([]);
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
					{tagItems.map((itemTag: TagOutput) => (
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
										Item Id: {itemTag.tag_id}
									</Card.Subtitle>
									<Card.Text>
										{" "}
										Group Id: {itemTag.category_id}{" "}
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
											deleteItemCategory(itemTag.tag_id);
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
					{tagCategories.map((itemCategory: CategoryOutput) => (
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
										ID: {itemCategory.category_id}{" "}
									</Card.Subtitle>
									<Card.Text> {itemCategory.desc} </Card.Text>
									<CloseButton
										className="mt-1 ml-1"
										onClick={() => {
											deleteItemCategory(
												itemCategory.category_id
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
