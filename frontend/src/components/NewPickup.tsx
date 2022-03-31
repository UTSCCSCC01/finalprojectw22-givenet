import { useContext, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { TokenContext } from "../TokenContext";
import { useNavigate } from "react-router-dom";

// interface Props {
//   setAllPickups: any
// }

type form = {
  listing_id: number;
  notes: string;
  completed: boolean;
  time: any;
};

export default function LoginForm({setAllPickups}: {setAllPickups: any}) {
  // Login form state
  const [formState, setFormState] = useState<form>({
    listing_id: 0,
    notes: "",
    completed: false,
    time: 0
  });
  const { token } = useContext(TokenContext);
  // Error message for form errors
  const [errorState, setErrorState] = useState("");

  // Modify state when the form changes
  const handleFormStateChange = (e: any) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  // On submit, handle any errors and submit
  const handleSubmit = async () => {
    setErrorState("");
    if (formState.listing_id === 0) {
      setErrorState("Please enter a listing_id");
      return;
    }

    const response = await fetch("/pickup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formState),
    });

    if (response.status === 401) {
     console.log("401");
    }

    getPickups();
  };

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
    setAllPickups(all_pickups);


  }


  return (
    <div className="container">
      <h1 className="pt-5">Create Pickup</h1>
      {errorState !== "" ? (
        <Alert variant="danger" className="mt-3 pb-0">
          <p className="pb-0 pt-0">{errorState}</p>
        </Alert>
      ) : null}
      <Form className="mt-4 mb-4">
        <Form.Group className="mb-3">
          <Form.Label>ListingID</Form.Label>
          <Form.Control
            onChange={handleFormStateChange}
            type="number"
            placeholder="Enter listing ID"
            name="listing_id"
            value={formState.listing_id}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            onChange={handleFormStateChange}
            type="date"
            name="time"
            value={formState.time}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            onChange={handleFormStateChange}
            type="text"
            placeholder="Enter note (optional)"
            name="notes"
            value={formState.notes}
          />
        </Form.Group>
      </Form>
      <Button variant="primary" onClick={handleSubmit}>
        SUBMIT PICKUP
      </Button>
    </div>
  );
}
