import { useContext, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { TokenContext } from "../TokenContext";
import { useNavigate } from "react-router-dom";

type Props = {};

type form = {
  listing_id: number;
  notes: string;
  completed: boolean;
  time: any;
};

export default function LoginForm({}: Props) {
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
  const navigate = useNavigate();

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
  };

  //Page and css displayer below 
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
