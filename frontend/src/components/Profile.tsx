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
} from "react-bootstrap";
import TagOutput from "../../../backend/src/database/models/Tag";
import { TokenContext } from "../TokenContext";

type profile = {
  [id: string]: string;
  name: string;
  location: string;
  operating_hours: string;
  phone: string;
  email: string;
};

type nameAndCount = {
  name: string;
  count: number;
};

/* Form that contains the profile information */
export default function Profile() {
  // Is the form editabale or not
  const [editState, setEditState] = useState(false);
  // Values of the profile
  const [profileState, setProfileState] = useState<profile>({
    name: "",
    location: "",
    operating_hours: "",
    phone: "",
    email: "",
  });

  // What a success message would be
  const [successState, setSuccessState] = useState("");
  // What an error message would be
  const [errorState, setErrorState] = useState("");
  // Most commonly donated items
  const [commonDonationItems, setCommonDonationItems] = useState<
    nameAndCount[]
  >([]);
  // The token of the logged in user for authentication
  const token = localStorage.getItem("token");
  console.log(token);

  // Fill the profileState form
  const fetchUserData = async () => {
    const response = await fetch("/account/profile", {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    console.log(response.status);
    if (response.status === 200) {
      let result = await response.json();
      result = JSON.parse(result);
      const p: profile = {
        name: result.name,
        location: result.location,
        operating_hours: result.operating_hours,
        phone: result.phone,
        email: result.email,
      };
      setProfileState(p);
    } else if (response.status === 401) {
      setErrorState("There was an issue retrieving your account details");
      setSuccessState("");
      console.log("401");
    }
  };

  // Update the profile data using the form data
  const updateUserData = async () => {
    if (profileState.name.length < 2) {
      setErrorState("Please enter a name");
      setSuccessState("");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(profileState.email)) {
      setErrorState("That isn't a valid email address!");
      setSuccessState("");
      return;
    }
    if (isNaN(Number(profileState.phone.toString()))) {
      setErrorState("Phone number should only contain numbers!");
      setSuccessState("");
      return;
    }
    if (profileState.phone.length !== 10) {
      setErrorState("Phone number should be 10 numbers");
      setSuccessState("");
      return;
    }
    if (profileState.location.length < 5) {
      setErrorState("Please enter a valid address");
      setSuccessState("");
      return;
    }
    if (profileState.operating_hours.length === 0) {
      setErrorState("Please enter hours for your business");
      setSuccessState("");
    }

    console.log("sending", JSON.stringify(profileState));
    const response = await fetch("/account/profile", {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileState),
    });

    if (response.status === 200) {
      setErrorState("");
      setSuccessState("Changes saved successfully");
    } else {
      setErrorState("There was a problem saving your changes");
      setSuccessState("");
    }
    setEditState(false);
  };

  // Modify the states based on the values in the form
  const handleFormChange = (e: any) => {
    const { name, value } = e.target;
    console.log(name, value);
    console.log({ [name]: value });
    setProfileState((prev) => ({ ...prev, [name]: value }));
    console.log(profileState);
  };

  // Retrieve the items commonly donated by this account.
  const fetchCommonDonationItems = async () => {
    const response = await fetch("/account/commonDonations", {
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
      setCommonDonationItems(result.items);
    } else if (response.status === 412) {
      setErrorState("This account is not a donor account");
      setSuccessState("");
      console.log("412");
    } else if (response.status === 401) {
      setErrorState(
        "There was an issue retrieving your commonly donated items"
      );
      setSuccessState("");
      console.log("401");
    }
  };

  // On page load, populate the form with the user data
  useEffect(() => {
    fetchUserData();
    fetchCommonDonationItems();
  }, []);

  return (
    <div className="container">
      <Card className="w-100 mt-5">
        <Card.Header as="h5">Profile</Card.Header>
        <Card.Body className="pt-0">
          <Form className="mt-4 mb-4">
            <Form.Check
              type="switch"
              label="Edit"
              name="edit"
              onChange={(e: any) => {
                setEditState(e.target.checked);
                console.log(e.target.checked);
                if (editState === true) {
                  fetchUserData();
                }
              }}
            />
            {["name", "email", "phone", "operating_hours", "location"].map(
              (field) => (
                <Form.Group className="mb-3">
                  <Form.Label>
                    {field[0].toUpperCase() + field.slice(1)}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={`Edit ${field}`}
                    name={field}
                    disabled={!editState}
                    value={(profileState as profile)[field]}
                    onChange={handleFormChange}
                    as={field === "operating_hours" ? "textarea" : "input"}
                  />
                </Form.Group>
              )
            )}
          </Form>
          <Button
            variant="primary"
            disabled={!editState}
            onClick={updateUserData}
          >
            Save Changes
          </Button>
        </Card.Body>
      </Card>

      <h3>Your most commonly donated items</h3>
      {commonDonationItems.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th scope="col">Item Name</th>
              <th scope="col">Number of times donated</th>
            </tr>
          </thead>
          <tbody>
            {commonDonationItems.map((object) => (
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

      {successState !== "" ? (
        <Alert variant="success" className="mt-3 pb-0">
          <p className="pb-0 pt-0">{successState}</p>
        </Alert>
      ) : null}
      {errorState !== "" ? (
        <Alert variant="danger" className="mt-3 pb-0">
          <p className="pb-0 pt-0">{errorState}</p>
        </Alert>
      ) : null}
    </div>
  );
}
