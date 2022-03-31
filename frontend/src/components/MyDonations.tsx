import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  Container,
  Col,
  Row,
  Card,
  Button,
  Form,
  Alert,
  Dropdown,
} from "react-bootstrap";
import TagOutput from "../../../backend/src/database/models/Tag";
import { TokenContext } from "../TokenContext";

type nameAndCount = {
    name: string;
    count: number;
  };

export default function MyDonations() {
    // What a success message would be
    const [successState, setSuccessState] = useState("");
    // What an error message would be
    const [errorState, setErrorState] = useState("");
    // Donated items
    const [donationItems, setDonationItems] = useState<
        nameAndCount[]
    >([]);
    // for frequency selection
    const [frequency, setFrequency] = useState("");
    // The token of the logged in user for authentication
    const { token } = useContext(TokenContext);
    // Retrieve the items donated by this account.
    const fetchDonationItems = async () => {
        const response = await fetch("/account/allDonations", {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
        },
        });
        console.log(response.status);
        if (response.status === 200) {
        let result = await response.json();
        console.log(result);
        // result = JSON.parse(result);
        // console.log(result);
        setDonationItems(result.items);
        } else if (response.status === 412) {
        setErrorState("This account is not a donor account");
        setSuccessState("");
        console.log("412");
        } else if (response.status === 401) {
        setErrorState(
            "There was an issue retrieving your donated items"
        );
        setSuccessState("");
        console.log("401");
        }
    };
    // On page load, populate the form with the donation items
    useEffect(() => {
        fetchDonationItems();
    }, []);

    return (
    <div className="container">
        <h3>Your donated items</h3>
        {donationItems.length > 0 ? (
            <Table striped bordered hover responsive>
            <thead>
                <tr>
                <th scope="col">Item Name</th>
                <th scope="col">Number of times donated</th>
                </tr>
            </thead>
            <tbody>
                {donationItems.map((object) => (
                <tr>
                    <td> {object.name} </td>
                    <td> {object.count} </td>
                </tr>
                ))}
            </tbody>
            </Table>
        ) : (
            "You have no donated items. Create a listing to start donating!"
        )}
        <h4>How often do you want to donate?</h4>
        <Form className="w-100">
            <Form.Group>
                <Form.Label> Select how often you donate </Form.Label>
                <Form.Select
                    onChange={(e: any) => {
                    setFrequency(e.target.value)
                    console.log(frequency);
                }}>
                    <option> Weekly </option>
                    <option> Daily </option>
                    <option> Monthly </option>
                </Form.Select>
            </Form.Group>
        </Form>
        <br/><br/>
      </div>
      )
}