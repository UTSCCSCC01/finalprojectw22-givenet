import React, {useContext, useEffect, useState} from 'react'
import "../styles/viewlistings.css";
import {TokenContext} from "../TokenContext";
import {
    ListGroup,
    Container,
    Dropdown,
    Accordion,
    Table,
    NavItem,
  } from "react-bootstrap";

type Pickup = {
  pickup_id: number;
  listing_id: number;
  donor_id: number;
  org_id: number;
  time: Date;
  completed: boolean;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
  cleanUpdated: String;
  cleanCreated: String;
}
export default function DonationHistory() {
    const {token} = useContext(TokenContext);
    const [pastPickups, setpastPickups] = useState<Pickup[]>([] as Pickup[]);
    const [isUser, setisUser] = useState<boolean>(false);

    useEffect(() => {
        RetrievePastDonations();
      }, []);

    async function RetrievePastDonations() {
        const response = await fetch("/pickup/pastPickups/", {
            method: "GET",
            headers: {
                authorization: `Bearer ${token}`,
            },
        })
        
        let result = await response.json();

        for (let res of result) {
          let date = new Date(res.createdAt.toString());
          res.cleanCreated = date.toLocaleDateString();
          date = new Date(res.updatedAt.toString());
          res.cleanUpdated = date.toLocaleDateString();
        }
        setpastPickups(result);
        return;
    }

    return(
        <div className="container">
            {pastPickups.length > 0 ? (
                    <Accordion id="lv">
                    {pastPickups.map((pickup) => (
                      <Accordion.Item eventKey={pickup.pickup_id.toString() || "0"}>
                        <Accordion.Header>
                          {`#${pickup.pickup_id} -- Completed on ${pickup.cleanUpdated} `}
                        </Accordion.Header> 
                        <Accordion.Body>
                          <h6>ORG ID: {pickup.org_id}</h6>
                          <h6>Listing: {pickup.listing_id}</h6>
                          <h6>Donor ID: {pickup.donor_id}</h6>
                          <h6>Scheduled for: {pickup.time}</h6>
                          <h6>Claimed on: {pickup.cleanCreated}</h6>
                          <p>Notes: {pickup.notes}</p>
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                ) : (
                <div>You do not have any completed pick ups yet.</div>
                )}
        </div>
    );
};