import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

type form = {
	username: string;
	password: string;
	name: string;
	location: string;
	hours: string;
	phone: string;
	email: string;
	type: boolean;
};

export default function SignUpForm() {
	// The values of all the forms
	const [formState, setFormState] = useState<form>({
		username: "",
		password: "",
		name: "",
		location: "",
		hours: "",
		phone: "",
		email: "",
		type: false,
	});

	const navigate = useNavigate();

	// Any form errors for invalid values
	const [errorState, setErrorState] = useState("");

	// Update the state when the form changes
	const handleFormStateChange = (e: any) => {
		const { name } = e.target;
		console.log(name);
		if (name !== "type") {
			const { value } = e.target;
			setFormState((prev) => ({ ...prev, [name]: value }));
		} else {
			const { checked } = e.target;
			console.log(+!!checked + 1);
			setFormState((prev) => ({ ...prev, type: checked }));
		}
	};

	// Signup the user if the inputs to the form are valid; display errors if needed
	const handleSignUp = async () => {
		if (formState.username.length < 5) {
			setErrorState("Username must be at least 5 characters");
			return;
		}
		if (formState.name.length < 2) {
			setErrorState("Please enter a name");
			return;
		}
		if (!/^\S+@\S+\.\S+$/.test(formState.email)) {
			setErrorState("That isn't a valid email address!");
			return;
		}
		if (formState.password.length < 8) {
			setErrorState("Password must be at least 8 characters");
			return;
		}
		if (isNaN(Number(formState.phone.toString()))) {
			setErrorState("Phone number should only contain numbers!");
			return;
		}
		if (formState.phone.length !== 10) {
			setErrorState("Phone number should be 10 numbers");
			return;
		}
		if (formState.location.length < 5) {
			setErrorState("Please enter a valid address");
			return;
		}
		if (formState.hours.length === 0) {
			setErrorState("Please enter hours for your business");
		}

		const response = await fetch("/account/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...formState, type: +!!formState.type + 1 }),
		});
		if (response.status === 200) {
			setErrorState("");
			navigate("/login");
		} else if (response.status === 401) {
			setErrorState("That username already exists!");
		} else {
			setErrorState("Sorry there was a problem. Try again later.");
		}
	};

	return (
		<div className="container">
			<h1 className="pt-5">Sign Up</h1>
			{errorState !== "" ? (
				<Alert variant="danger" className="mt-3 pb-0">
					<p className="pb-0 pt-0">{errorState}</p>
				</Alert>
			) : null}
			<Form className="mt-4 mb-4">
				<Form.Group className="mb-3">
					<Form.Label>Username</Form.Label>
					<Form.Control
						onChange={handleFormStateChange}
						type="text"
						placeholder="Enter username"
						name="username"
						value={formState.username}
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Name</Form.Label>
					<Form.Control
						onChange={handleFormStateChange}
						type="text"
						placeholder="Enter name"
						name="name"
						value={formState.name}
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						name="email"
						placeholder="Enter email"
						onChange={handleFormStateChange}
						value={formState.email}
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						name="password"
						placeholder="Enter password"
						onChange={handleFormStateChange}
						value={formState.password}
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Phone Number</Form.Label>
					<Form.Control
						type="text"
						name="phone"
						placeholder="Enter phone number"
						onChange={handleFormStateChange}
						value={formState.phone}
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Address</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter address"
						name="location"
						onChange={handleFormStateChange}
						value={formState.location}
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Hours</Form.Label>
					<Form.Control
						as="textarea"
						type="text"
						name="hours"
						placeholder="Enter hours"
						onChange={handleFormStateChange}
						value={formState.hours}
					/>
				</Form.Group>
				<Form.Check
					type="switch"
					id="custom-switch"
					label="I'm a charity"
					name="type"
					onChange={handleFormStateChange}
				/>
			</Form>
			<Button variant="primary" onClick={handleSignUp}>
				Sign Up!
			</Button>
		</div>
	);
}
