import React, { useEffect, useState } from 'react'
import { ListGroup, Container, Dropdown } from "react-bootstrap";
import "../styles/viewlistings.css";

type Listing = {
	listing_id?: number;
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
    const [allListings, setAllListings] = useState<Array<Listing>>([] as Listing[]);


    // Makes requests on component load and stores in state ^
    useEffect(() => {

        async function getListings() {
            const response = await fetch("/listing/all" , {
                method: "GET",
            });

            let objs: Array<Listing> = await response.json();
            // Need to query user data: wait for backend overhaul next sprint

            /*
            objs.forEach((obj: any) => {
                obj.acc_name = "John's Bakery"
                obj.address = "123 Street"
                obj.expiry.forEach((date: Date, index: number) => {
                    obj.expiry[index] = new Date(date);
                })
            })
            */
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

                        <ListGroup.Item>Business: {listing.user.name}</ListGroup.Item>

                        <ListGroup.Item>Address: {listing.user.address}</ListGroup.Item>

                        <ListGroup.Item># Items: {listing.items.length}</ListGroup.Item>

                        <ListGroup.Item>
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                Items
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {listing.items.map((item, i) =>
                                    <Dropdown.Item>{i} || kg: {item.weight} || Exp: {item.expiry.toDateString()}</Dropdown.Item>
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