import React, {useContext, useEffect, useState} from "react";
import "../styles/listings.css";
import {Alert, Button, Col, Form, Row, Table} from "react-bootstrap";
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
    const [formErrorMessage, setFormErrorMessage] = useState("");
    const [itemErrorMessage, setItemErrorMessage] = useState("");

    const [listings, setListings] = useState<Listing[]>([]);

    const {token} = useContext(TokenContext);

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
            if (allTags.length > 0) {
                setItem((old) => {
                    old.tag_id = allTags[0].tag_id;
                    old.tag_name = allTags[0].name;
                    return old;
                })
            }
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

        let newListing = {
            ...form,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        let newItems = Array<any>();

        for (let i of items) {
            let newItem = {...i, createdAt: new Date(), updatedAt: new Date()}
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

        setItems([]);
        setItem({...item,
            expiry: new Date(),
            name: "",
            weight: 0,
        });
        setForm({
            container: "",
            notes: "",
            location: ""
        });

        await loadListings();

    }


    const validateFormInput = () => {
        if (form.container === "") {
            return setFormErrorMessage("Please provide a container!");
        }
        if (form.location === "") {
            return setFormErrorMessage("Please provide a location!")
        }
        if (items.length === 0) {
            return setFormErrorMessage("Please add items to your listing!")
        }

        setFormErrorMessage("");

        createListing().then(r => console.log("done"));
    }

    const validateItemInput = () => {
        if (item.name == "") {
            return setItemErrorMessage("Please enter an item name!");
        }
        if (items.filter(e => e.name === item.name).length > 0) {
            return setItemErrorMessage("That item is already in this listing!");
        }
        if (item.weight <= 0) {
            return setItemErrorMessage("Weight should be a positive number!");
        }
        console.log(item.expiry);
        console.log((new Date()));
        if (item.expiry <= new Date((new Date()))) {
             return setItemErrorMessage("The expiry date must be atleast tomorrow!");
        }
        setItemErrorMessage("");


        setItems([...items, item]);
        setItem({
            ...item,
            weight: 0,
            name: "",
            expiry: new Date(),
        })

    }


    async function deleteListing(id: any) {
        await fetch("/listing/" + id, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${token}`,
            },
        });

        await loadListings();

    }

    useEffect(() => {
        loadTags().then(value => console.log("loaded tags"));
        loadListings().then(value => console.log("loaded your listings"));
    }, []);

    return (
        <div className="container mt-5">
            <h1>Create a listing</h1>
            {formErrorMessage ? <Alert variant="danger">
                {formErrorMessage}
            </Alert> : null}
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>Container</Form.Label>
                        <Form.Control type="text" placeholder="container"
                                      value={form.container}
                                      onChange={(e) => {
                                          setForm({
                                              ...form,
                                              container: e.target.value
                                          });
                                      }}/>
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Location</Form.Label>
                        <Form.Control type="text" placeholder="location"
                                      value={form.location}
                                      onChange={(e) => {
                                          setForm({
                                              ...form,
                                              location: e.target.value
                                          });
                                      }}/>
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group className="mb-3">
                        <Form.Label>Notes</Form.Label>
                        <Form.Control as="textarea"
                                      type="text"
                                      placeholder="add any details you think are necessary"
                                      value={form.notes}
                                      onChange={(e) => {
                                          setForm({
                                              ...form,
                                              notes: e.target.value
                                          });
                                      }}/>
                    </Form.Group>
                </Row>

                <div className="border p-5 rounded">
                    <h4>Add an item to the listing</h4>
                    {itemErrorMessage ? <Alert variant="danger">
                        {itemErrorMessage}
                    </Alert> : null}
                    <Row>
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="name"
                                          value={item.name}
                                          onChange={(e) => {
                                              setItem({
                                                  ...item,
                                                  name: e.target.value
                                              })
                                          }}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Weight (kg)</Form.Label>
                            <Form.Control type="number" placeholder="weight"
                                          value={item.weight}
                                          onChange={(e) => {
                                              setItem({
                                                  ...item,
                                                  weight: +e.target.value
                                              })
                                          }}/>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Expiry</Form.Label>
                            <Form.Control type="date" placeholder="expiry date"
                                          onChange={(e) => {
                                              setItem({
                                                  ...item,
                                                  expiry: new Date(e.target.value)
                                              })
                                          }}/>
                        </Form.Group>
                        <Form.Group as={Col} id={item.tag_name}>
                            <Form.Label>Tag</Form.Label>
                            <Form.Select
                                onChange={(e) => {
                                    console.log("id", e.target.children[e.target.selectedIndex].getAttribute('id'), e.target.value);
                                    setItem({
                                        ...item,
                                        tag_name: e.target.children[e.target.selectedIndex].getAttribute('id') || "",
                                        tag_id: +e.target.value
                                    })
                                }
                                }>
                                {tags.map((tag, i) => (
                                    <option
                                        selected={i === 0 && !tag.tag_id}
                                        value={tag.tag_id}
                                        id={tag.name}>
                                        {tag.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Button className="mt-2" onClick={(e) => {
                        validateItemInput();
                    }} disabled={tags.length <= 0}>
                        Add item
                    </Button>
                </div>
                <div className="border p-5 rounded mt-3">
                    <h4>Items in the current listing</h4>
                    {items.length <= 0 ?
                        <p>There are no items in this listing right now!</p> :
                        <Table striped bordered hover responsive>
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
                                    <td> {object.expiry.toLocaleDateString()} </td>
                                    <td> {object.tag_name} </td>
                                </tr>

                            ))}
                            </tbody>
                        </Table>}

                </div>
                <Button className="mt-2" onClick={validateFormInput}
                        disabled={tags.length <= 0}>
                    Create new listing
                </Button>
            </Form>
        </div>
    )

}