import React, { useEffect, useState } from 'react'
import { ListGroup } from "react-bootstrap";

type Listing = {
	listing_id?: number;
	acc_id: number;
	items: Array<String>;
    weight: Array<String>;
    expiry: Array<Date>;
    acc_name?: string;
};


const ViewListings = () => {

    const [allListings, setAllListings] = useState<Array<Listing>>([] as Listing[]);

    useEffect(() => {

        async function getListings() {
            const response = await fetch("/user/listings" , {
                method: "GET",
            });

            let objs: Array<any> = await response.json();
            // setAllListings(await response.json())
            objs.forEach((obj: any) => obj.acc_name = "HolySht2ManyQuery")
            setAllListings(objs)
        }

        getListings();

    }, [])

    if (allListings) {
        return (
            <div>
                {allListings.map(listing => 
                    <ListGroup key={listing.listing_id} horizontal='lg'>
                        <ListGroup.Item>ID: {listing.listing_id}</ListGroup.Item>
                        <ListGroup.Item>ACC: {listing.acc_id} // {listing.acc_name}</ListGroup.Item>
                        <ListGroup.Item>ITEMS: {listing.items}</ListGroup.Item>
                        <ListGroup.Item>EXP: {listing.expiry}</ListGroup.Item>
                    </ListGroup>
               )}
            </div>
        )
    }
    return (
        <div>ViewListings</div>
    )
}

export default ViewListings