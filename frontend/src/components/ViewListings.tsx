import React, { useEffect, useState } from 'react'
import { ListGroup, Container, Dropdown } from "react-bootstrap";
import "../styles/viewlistings.css";

type Listing = {
	listing_id?: number;
	acc_id: number;
	items: Array<String>;
    weight: Array<String>;
    expiry: Array<Date>;
    acc_name?: string;
    address?: string;
};
// Accname and address are filled out in useeffect


const ViewListings = () => {

    // This state will be used for storing data retrieved from request for all listings
    const [allListings, setAllListings] = useState<Array<Listing>>([] as Listing[]);


    // Makes requests on component load and stores in state ^
    useEffect(() => {

        async function getListings() {
            const response = await fetch("/user/viewlistings" , {
                method: "GET",
            });

            let objs: Array<any> = await response.json();
            // Need to query user data: wait for backend overhaul next sprint
            objs.forEach((obj: any) => {
                obj.acc_name = "John's Bakery"
                obj.address = "123 Street"
                obj.expiry.forEach((date: Date, index: number) => {
                    obj.expiry[index] = new Date(date);
                })
            })
            setAllListings(objs)
        }

        getListings();

    }, [])

    // If listings retrieved then render listings view
    if (allListings) {
        return (
            <Container id="lv">
                {allListings.map(listing => 
                    <ListGroup key={listing.listing_id} horizontal='lg'>
                        <ListGroup.Item>Listing ID: {listing.listing_id}</ListGroup.Item>

                        <ListGroup.Item>Account ID: {listing.acc_id}</ListGroup.Item>

                        <ListGroup.Item>Business: {listing.acc_name}</ListGroup.Item>

                        <ListGroup.Item>Address: {listing.address}</ListGroup.Item>

                        <ListGroup.Item># Items: {listing.items.length}</ListGroup.Item>

                        <ListGroup.Item>
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                Items
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {listing.items.map((i, index) =>
                                    <Dropdown.Item>{i} || kg: {listing.weight[index]} || Exp: {listing.expiry[index].toDateString()}</Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                        </ListGroup.Item>

                    </ListGroup>
               )}
            </Container>
        )
    }

    // Response not received
    return (
        <div>LOADING</div>
    )
}

export default ViewListings