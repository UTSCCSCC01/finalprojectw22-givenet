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
  org_name: string;
  org_phone_number: string;
  hours: string;
};

type profile = {
    [id: string]: string;
    name: string;
    location: string;
    operating_hours: string;
    phone: string;
    email: string;
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

      let all_pickups_resp = await response.json();
      let all_pickups = [];

      for (let pickup of all_pickups_resp) {
        // get data of charity
        let org_info = await fetch(`/account/profile/${pickup.org_id}`, {method: "GET"});
        let result = await org_info.json();
        result = JSON.parse(result);

        let date = new Date(pickup.time.toString());
        pickup.time = date.toLocaleDateString();

        date = new Date(pickup.createdAt.toString());
        pickup.createdAt = date.toLocaleDateString();
        pickup.org_name = result.name;
        pickup.org_phone_number = result.phone;

        let donor_info = await fetch(`/account/profile/${pickup.donor_id}`, {method: "GET"});
        result = await donor_info.json();
        result = JSON.parse(result);
        pickup.hours = result.operating_hours;

        all_pickups.push(pickup)

      }

      console.log(all_pickups);

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
              {`#${pickup.pickup_id} -- Listing: ${pickup.listing_id} being picked up by ORG: ${pickup.org_name}`}
            </Accordion.Header>
            <Accordion.Body>
                <h6>ORG ID: {pickup.org_id}</h6>
                <h6>ORG Phone #: {pickup.org_phone_number}</h6>
              <h6>Scheduled for: {pickup.time}</h6>
              <h6>Pickup Hours: {pickup.hours}</h6>
              <h6>Claimed on: {pickup.createdAt}</h6>
              <p>Notes: {pickup.notes}</p>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default ViewMyPickups;
