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
    let total = listing.items.reduce((prev, curr) => ((+prev) + (+curr.weight)), 0);
    return total.toString() + 'kg';
}

const ListingFilters = (Props: any) => {

    // This state will be used for storing data retrieved from request for all listings
    const [theListings, setListings] = useState<Listing[]>([] as Listing[]);
    const [tagNameMap, setTagNameMap] = useState({});
    const [searchState, setSearchState] = useState(0);
    const [filterState, setFilterState] = useState("");
    const token = localStorage.getItem("token");
    const {isUserListings} = Props;

    function getBestTags(listing: Listing) {
        let tag_weights = listing.items.reduce((prev, curr) => {
            if (curr.tag_id in prev) {
                // @ts-ignore
                prev[tagNameMap[curr.tag_id]] += +curr.weight;
            } else {
                // @ts-ignore
                prev[tagNameMap[curr.tag_id]] = +curr.weight;
            }
            return prev;
        }, {})

        const pickHighest = (obj: any, num = 1) => {
            const requiredObj = {};
            Object.keys(obj).sort((a, b) => obj[b] - obj[a]).forEach((key, ind) =>
            {
                if(ind < num){
                    // @ts-ignore
                    requiredObj[key] = obj[key];
                }
            });
            return requiredObj;
        };
        // @ts-ignore
        let tag_weights_string = Object.keys(pickHighest(tag_weights, 3)).reduce((prev, curr) => `${prev}, ${curr}`, "").substring(1);

        return `[ ${tag_weights_string} ]`;
    }

    async function getAllTags() {
        try {
            const allTagsResponse = await fetch("/tag/all/", {
                method: "GET",
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            if (allTagsResponse.status !== 200) {
                console.log(allTagsResponse.status);
            } else {
                let map = {};
                let responsejson = await allTagsResponse.json()
                for (let tag of responsejson) {
                    // @ts-ignore
                    map[+tag.tag_id] = tag.name.toString();
                }

                setTagNameMap(map);
                console.log(123123123, map);

                return responsejson;
            }
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    const handleFilterChange = (e: any) => {
        const filter = e.target.value;
        setFilterState(filter);
      };

    const handleClick = () => {
        setSearchState(searchState + 1);
    }

    // Makes requests on component load and stores in state ^
    useEffect(() => {

        async function getListings() {
            let response;
            if (isUserListings) {
                response = await fetch("/listing", {
                    method: "GET",
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                });
            } else {
                response = await fetch("/listing/all", {
                    method: "GET",
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                });
            }


            let listings = await response.json();
            var present = false;
            
            for (var i=0; i < listings.length; i++) {
                present = false;
                let tags = getBestTags(listings[i]);
                tags = tags.slice(1, -1);
                let tagList = tags.split(",");
                for (var j=0; j < tagList.length; j++) {
                    if (tagList[j].trim().toLowerCase().includes(filterState.toLowerCase()))
                        present = true;
                }
                if (!present)
                    delete listings[i];
                }


            // Need to query user data: wait for backend overhaul next sprint
            setListings(listings);
        }

        getListings().then(() => console.log(""));
        getAllTags().then(() => console.log(""));
    }, [searchState])

    // If listings retrieved then render listings view

    return (
        <div className="container">
        <input type="text" placeholder="Enter an item..." value={filterState} onInput={handleFilterChange}></input><button onClick={handleClick}>Search</button>
        <Accordion id="lv">
            {theListings.map(listing => (
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
                                        <td> { // @ts-ignore
                                            tagNameMap[item.tag_id]
                                        } </td>
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

export default ListingFilters