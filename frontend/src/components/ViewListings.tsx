import React, {useContext, useEffect, useState} from 'react'
import {
    ListGroup,
    Container,
    Dropdown,
    Accordion,
    Table
} from "react-bootstrap";
import "../styles/viewlistings.css";
import {TokenContext} from "../TokenContext";

type Listing = {
    listing_id: number;
    acc_id: number;
    container: string;
    location: string;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
    items: Array<any>;  //item object
    user: any; //user object
};
// Accname and address are filled out in useeffect


const ViewListings = () => {

    // This state will be used for storing data retrieved from request for all listings
    const [allListings, setAllListings] = useState<Listing[]>([] as Listing[]);
    const {token} = useContext(TokenContext);

    // Makes requests on component load and stores in state ^
    useEffect(() => {

        async function getListings() {
            const response = await fetch("/listing/all", {
                method: "GET",
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });

            let all_listings = await response.json();
            // Need to query user data: wait for backend overhaul next sprint

            const listings = [];
            for (let listing of all_listings) {
                let new_listing: Listing = {} as Listing;
                let {
                    listing_id, container, acc_id, location, notes, createdAt,
                    updatedAt
                } = listing.dataValues;
                new_listing.listing_id = listing_id;
                new_listing.container = container;
                new_listing.acc_id = acc_id;
                new_listing.location = location;
                new_listing.notes = notes;
                new_listing.updatedAt = updatedAt;
                new_listing.createdAt = createdAt;
                new_listing.items = listing.item;
                new_listing.user = listing.owner;
                listings.push(new_listing);
            }
            setAllListings(listings);
            console.log(listings);
        }

        getListings();

    }, [])

    // If listings retrieved then render listings view
    return (
        <div className="container">
        <Accordion id="lv">
            {allListings.map(listing => (
                <Accordion.Item eventKey={listing.listing_id.toString() || "0"}>
                    <Accordion.Header>
                        {`#${listing.listing_id} - ${listing.user.name}`}
                    </Accordion.Header>
                    <Accordion.Body>
                        <h6>Name: {listing.user.name}</h6>
                        <h6>Phone: {listing.user.phone}</h6>
                        <h6>Email: {listing.user.email}</h6>
                        <h6>Container: {listing.container}</h6>
                        <h6>Location: {listing.location}</h6>
                        <p>{listing.notes}</p>
                        <div className="container">
                            <h5>Items</h5>
                            <Table striped bordered hover responsive>
                                <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Weight (kg)</th>
                                    <th scope="col">Expiry</th>
                                    <th scope="col">Tag</th>
                                </tr>
                                </thead>
                                <tbody>
                                {listing.items.map(item => (
                                    <tr>
                                        <td> {item.name} </td>
                                        <td> {item.weight} </td>
                                        <td> {new Date(item.expiry).toDateString()} </td>
                                        <td> {item.tag_id} </td>
                                    </tr>

                                ))}
                                </tbody>
                            </Table>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            ))}
        </Accordion>
        </div>
    )

}

export default ViewListings
