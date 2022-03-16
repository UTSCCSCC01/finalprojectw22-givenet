import React, { useContext, useEffect, useState } from "react";
import {
  ListGroup,
  Container,
  Dropdown,
  Accordion,
  Table,
  NavItem,
} from "react-bootstrap";
import { TokenContext } from "../TokenContext";

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
};


const ViewMyPickups = () => {
  // This state will be used for storing data retrieved from request for all listings
  const [allPickups, setAllPickups] = useState<Pickup[]>([] as Pickup[]);
  const { token } = useContext(TokenContext);

  // Makes requests on component load and stores in state ^
  useEffect(() => {
    async function getPickups() {
      const response = await fetch("/pickup", {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      let all_pickups = await response.json();
      setAllPickups(all_pickups);
    }

    getPickups();
    console.log(allPickups);
  }, []);

  // If listings retrieved then render listings view

  return (
    <div className="container">
      <Accordion id="lv">
        {allPickups.map((pickup) => (
          <Accordion.Item eventKey={pickup.pickup_id.toString() || "0"}>
            <Accordion.Header>
              {`#${pickup.pickup_id} -- Listing: ${pickup.listing_id} being picked up by ORG w/ ID: ${pickup.org_id}`}
            </Accordion.Header>
            <Accordion.Body>
              <h6>Time: {pickup.time}</h6>
              <h6>Pickup Req Submitted @ {pickup.createdAt}</h6>
              <p>Notes: {pickup.notes}</p>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default ViewMyPickups;
