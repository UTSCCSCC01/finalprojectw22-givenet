import React, { useEffect, useState } from "react";
import ItemOutput from "../../../backend/src/database/models/Items";
import ItemGroupOutput from "../../../backend/src/database/models/ItemGroups";

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
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newItem)
        });
        return postResponse.json();
    } catch (error) {
        console.log(error);
        return {};
    }
}

async function addItemTag(items: ItemOutput[], name: string, group_id: number) {
    // Citation: https://stackoverflow.com/questions/4020796/finding-the-max-value-of-an-attribute-in-an-array-of-objects
    const newItemID = Math.max.apply(Math, items.map(function(o) { return o.item_id; })) + 1;
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
        const allItemCategories: ItemGroupOutput[] = await allCategoriesResponse.json();
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
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCategory)
        });
        return postResponse.json();
    } catch (error) {
        console.log(error);
        return {};
    }
}

async function addCategory(categories: ItemGroupOutput[], name: string, desc: string) {
    // Citation: https://stackoverflow.com/questions/4020796/finding-the-max-value-of-an-attribute-in-an-array-of-objects
    const newCategoryID = Math.max.apply(Math, categories.map(function(o) { return o.item_group_id; })) + 1;
    return await postCategory(newCategoryID, name, desc);
}

async function deleteItemCategory(category_id: number) {
    try {
        const deleteItemCategoryResponse = await fetch("/itemgroup/" + String(category_id), {
            method: "DELETE",
        });
    } catch (error) {
        console.log(error);
    }
}


export default function TaggingSystem() {
    const [tagItems, setTagItems] = useState<ItemOutput[]>([]);
    const [tagCategories, setTagCategories] = useState<ItemGroupOutput[]>([]);
    const [newItemName, setNewItemName] = useState("");
    const [newItemGroupID, setNewItemGroupID] = useState(Number());
    const [newCategoryName, setNewCategoryName] = useState("");
    const [newCategoryDesc, setNewCategoryDesc] = useState("");

    useEffect(() => {
        const fetchTagItems = async () => {
            const tags = await getAllItemTags();
            setTagItems(tags);
        }
        const fetchTagCategories = async () => {
            const categories = await getAllItemCategories();
            setTagCategories(categories);
        }

        fetchTagItems();
        fetchTagCategories();
    }, []);

    const addNewItemTag = async () => {
        const newItem = await addItemTag(tagItems, newItemName, newItemGroupID);
        setTagItems([...tagItems, newItem]);
    }

    const addNewCategory = async () => {
        const newCategory = await addCategory(tagCategories, newCategoryName, newCategoryDesc);
        setTagCategories([...tagCategories, newCategory]);
    }

    return (
        <div className="container">
            <h1>TAGGING SYSTEM</h1>
            <div id="edittagcontainer">
                <input type="text" placeholder="NEW TAG" id="addtagname" value={newItemName} onChange={e => setNewItemName(e.target.value)}></input>
                <input type="number" placeholder="GROUP ID FOR NEW TAG" id="addtaggroupid" value={newItemGroupID} onChange={e => setNewItemGroupID(+e.target.value)}></input>
                <button className="addItemBtn" onClick={addNewItemTag}>ADD TAG</button>
            </div>
            <div id="editcategoriescontainer">
                <input type="text" placeholder="NEW CATEGORY" id="addcategoryname" value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)}></input>
                <input type="text" placeholder="DESC OF NEW CATEGORY" id="addcategorydesc" value={newCategoryDesc} onChange={e => setNewCategoryDesc(e.target.value)}></input>
                <button className="addCategoryBtn" onClick={addNewCategory}>ADD TAG</button>
            </div> 

            <div id="tagview">
                {tagItems.map((itemTag: ItemOutput) => (
					<div className="tags">
                        <label className="tagLabel">{itemTag.name + " | ID: " + itemTag.item_id}</label>
                        <button className="tagDel" onClick={() => {
                            deleteItemTag(itemTag.item_id);
                            const filteredArray = tagItems.filter(item => item !== itemTag);
                            setTagItems(filteredArray);
                            }}>X</button>
					</div>
				))}
            </div>

            <div id="tagview">
                {tagCategories.map((itemCategory: ItemGroupOutput) => (
					<div className="tags">
                        <label className="tagLabel">{itemCategory.name + " | ID: " + itemCategory.item_group_id}</label>
                        <button className="tagDel" onClick={() => {
                            deleteItemCategory(itemCategory.item_group_id);
                            const filteredArray = tagCategories.filter(category => category !== itemCategory);
                            setTagCategories(filteredArray);
                            }}>X</button>
					</div>
				))}
            </div>
                
        
        
        </div>

    )
}
