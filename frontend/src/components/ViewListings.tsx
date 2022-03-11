import React, {useContext, useEffect, useState} from 'react'
import {
    ListGroup,
    Container,
    Dropdown,
    Accordion,
    Table,
    NavItem
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

function getNetWeight(listing: Listing) {
    let total = 0;

    for (let item of listing.items) {
        total += item.weight;
    }

    return parseInt(total.toString()) + 'kg';
}

function getBestTags(listing: Listing) {
    let tags = [];
    let weights = [];

    for (let item of listing.items) {
        if (tags.indexOf(item.tag_id) == -1) {
            tags.push(item.tag_id);
            weights.push(item.weight);
        } else {
            weights[tags.indexOf(item.tag_id)] += item.weight;
        }
    }

    let retTags = [];
    weights.sort(function(a, b){return a - b});
    while (retTags.length < 4 && weights.length > 0) {
        let max = weights[weights.length - 1];
        
        for (let item of listing.items) {
            if (item.weight == max) {
                retTags.push(item.tag_id);
                break;
            }
        }
        weights.pop();
    }
    
    

    return '{ ' + retTags.toString() + ' }';
}

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
            console.log(all_listings);
            setAllListings(all_listings);
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
                        {`#${listing.listing_id} - ${getBestTags(listing)} from ${listing.user.name} (${listing.items.length} item(s)) Net Weight: ${getNetWeight(listing)}`}
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
