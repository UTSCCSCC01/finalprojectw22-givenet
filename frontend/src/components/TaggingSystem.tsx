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

export default function TaggingSystem() {
	// State for all the tags/categories etc.
	const [tagItems, setTagItems] = useState<TagOutput[]>([]);
	const [tagCategories, setTagCategories] = useState<CategoryOutput[]>([]);
	const [newItemName, setNewItemName] = useState("");
	const [newItemGroupID, setNewItemGroupID] = useState(Number());
	const [newCategoryName, setNewCategoryName] = useState("");
	const [newCategoryDesc, setNewCategoryDesc] = useState("");
	const [categoryNameMap, setCategoryNameMap] = useState({});
	const token = localStorage.getItem("token");

	//Fetch all existing item tags from the database
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
				return allItemsResponse.json();
			}
		} catch (error) {
			console.log(error);
			return [];
		}
	}
	//Add an item tag that the user created
	async function addItemTag(name: string, category_id: number) {
		try {
			const newItem = {
				name: name,
				category_id: category_id,
			};
			const postResponse = await fetch("/tag", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(newItem),
			});
			if (postResponse.status !== 200) {
				return {}
			} else {
				return postResponse.json();
			}
		} catch (error) {
			console.log(error);
			return {};
		}
	}
	//Delete a specefic item tag based on its id
	async function deleteItemTag(tag_id: number) {
		try {
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
	//Fetch al existing categories from the database.
	async function getAllCategories() {
		try {
			const allCategoriesResponse = await fetch("/category/all/", {
				method: "GET",
				headers: {
					authorization: `Bearer ${token}`,
				},
			})
			if (allCategoriesResponse.status !== 200) {
				console.log(allCategoriesResponse.status);
			} else {
				let map = {};
				let responsejson = await allCategoriesResponse.json()
				for (let category of responsejson) {
					// @ts-ignore
					map[+category.category_id] = category.name.toString();
				}
				setCategoryNameMap(map);

				console.log({map});

				return responsejson;
			}
		} catch (error) {
			console.log(error);
			return [];
		}
	}
	//Add a category that the user made
	async function addCategory(name: string, desc: string) {
		try {
			const newCategory = {
				name: name,
				desc: desc,
			};
			const postResponse = await fetch("/category", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(newCategory),
			});
			if (postResponse.status !== 200) {
				return {}
			} else {
				return await postResponse.json();
			}
		} catch (error) {
			console.log(error);
			return {};
		}
	}
	//Delete a category entirely.
	async function deleteCategory(category_id: number) {
		try {
			await fetch(
				"/category/" + String(category_id),
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

	// On page load, populate the item tags and categories on the page
	useEffect(() => {
		const fetchTagItems = async () => {
			const tags = await getAllItemTags();
			setTagItems(tags);
			console.log({tags});
		};
		const fetchTagCategories = async () => {
			const categories = await getAllCategories();
			setTagCategories(categories);
			if (categories.length > 0) {
				setNewItemGroupID(categories[0].category_id);
			}
		};
		fetchTagItems().then(r => console.log("done"));
		fetchTagCategories().then(r => console.log("done categories"));
	}, []);

	// Add an item tag using the current state
	const addNewItemTag = async () => {
		await addItemTag(newItemName, newItemGroupID);
		const tags = await getAllItemTags();
		setTagItems(tags);
	};

	// Add a new category using the current state
	const addNewCategory = async () => {
		await addCategory(newCategoryName, newCategoryDesc);
		const categories = await getAllCategories();
		setTagCategories(categories);
		if (categories.length > 0) {
			setNewItemGroupID(categories[0].category_id);
		}
	};

	//Delete all tags that belogn to this category but cascade it
	const deleteCategoryCascade = async (category_id: number) => {
		await deleteCategory(category_id);
		const categories = await getAllCategories();
		const tags = await getAllItemTags();
		setTagCategories(categories);
		setTagItems(tags);
	};


	//Function for deleting a tag by id
	const deleteTag = async (tag_id: number) => {
		await deleteItemTag(tag_id);
		const tags = await getAllItemTags();
		setTagItems(tags);
	};


	//Page structure below using data fetched
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
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label> Group Id </Form.Label>
								<Form.Select
									onChange={(e: any) => {
									setNewItemGroupID(+e.target.value)
									console.log(+e.target.value);
								}}>
									{tagCategories.map(category => (
										<option
											value={category.category_id}>
											{category.name}
										</option>
									))}
								</Form.Select>
							</Form.Group>
							<Button className="mt-1" onClick={addNewItemTag} disabled={tagCategories.length <= 0}>
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
								/>
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
								/>
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
					{tagItems.map((tag: TagOutput, i) => (
						i % 5 == 0 ?		
							<> 	
								<div className="w-100"></div>
								<Col>
								<Card
									style={{ width: "100%" }}
									border="dark"
									className="mt-1 mb-1">
									<Card.Body>
										<Card.Header className="mb-2 bg-dark text-light">
											Tag
										</Card.Header>
										<Card.Title> {tag.name} </Card.Title>
										<Card.Subtitle>
											{
											// @ts-ignore
											categoryNameMap[tag.category_id]
										}{" "}
										</Card.Subtitle>

										<CloseButton
											className="mt-1 ml-1"
											onClick={async () => {
												await deleteTag(tag.tag_id);
											}}
										/>
									</Card.Body>
								</Card>
								</Col>
							</>		
						:
							<Col>
							<Card
								style={{ width: "100%" }}
								border="dark"
								className="mt-1 mb-1"
							>
								<Card.Body>
									<Card.Header className="mb-2 bg-dark text-light">
										Tag
									</Card.Header>
									<Card.Title> {tag.name} </Card.Title>
									<Card.Subtitle>
										{
										// @ts-ignore
										categoryNameMap[tag.category_id]
									}{" "}
									</Card.Subtitle>

									<CloseButton
										className="mt-1 ml-1"
										onClick={async () => {
											await deleteTag(tag.tag_id);
										}}
									/>
								</Card.Body>
							</Card>
						</Col>
					
					))}
					</Row>


				<Row>
					{tagCategories.map((category: CategoryOutput, i) => (
						i % 3 == 0 ?
						<> 	
								<div className="w-100"></div>
							<Col>
								<Card
									style={{ width: "100%" }}
									border="dark"
									className="mt-1 mb-1"
								>
									<Card.Body>
										<Card.Header className="mb-2 bg-info">
											Category
										</Card.Header>
										<Card.Title>
											{" "}
											{category.name}{" "}
										</Card.Title>
										<Card.Text> {category.desc} </Card.Text>
										<CloseButton
											className="mt-1 ml-1"
											onClick={ async () => {
												await deleteCategoryCascade(
													category.category_id
												);
											}}
										/>
									</Card.Body>
								</Card>
							</Col>
						</>
						:
						<Col>
							<Card
								style={{ width: "100%" }}
								border="dark"
								className="mt-1 mb-1"
							>
								<Card.Body>
									<Card.Header className="mb-2 bg-info">
										Category
									</Card.Header>
									<Card.Title>
										{" "}
										{category.name}{" "}
									</Card.Title>
									<Card.Text> {category.desc} </Card.Text>
									<CloseButton
										className="mt-1 ml-1"
										onClick={ async () => {
											await deleteCategoryCascade(
												category.category_id
											);
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