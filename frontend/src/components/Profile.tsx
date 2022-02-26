import React, { useContext, useEffect, useState } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { TokenContext } from "../TokenContext";

type profile = {
	[id: string]: string;
	name: string;
	location: string;
	hours: string;
	phone: string;
	email: string;
};

export default function Profile() {
	const [editState, setEditState] = useState(false);
	const [profileState, setProfileState] = useState<profile>({
		name: "",
		location: "",
		hours: "",
		phone: "",
		email: "",
	});
	const [successState, setSuccessState] = useState("");
	const [errorState, setErrorState] = useState("");
	const { token } = useContext(TokenContext);

	const fetchUserData = async () => {
		const response = await fetch("/user/profile", {
			method: "GET",
			headers: {
				authorization: `Bearer ${token}`,
			},
		});
		if (response.status === 200) {
			const result = await response.json();
			const p: profile = {
				name: result.name,
				location: result.location,
				hours: result.hours,
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
		if (profileState.hours.length === 0) {
			setErrorState("Please enter hours for your business");
			setSuccessState("");
		}

		const response = await fetch("/user/profile", {
			method: "POST",
			headers: {
				authorization: `Bearer ${token}`,
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
	};

	const handleFormChange = (e: any) => {
		const { name, value } = e.target;
		console.log(name, value);
		console.log({ [name]: value });
		setProfileState((prev) => ({ ...prev, [name]: value }));
		console.log(profileState);
	};

	useEffect(() => {
		fetchUserData();
	});

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
						{["name", "email", "phone", "hours", "location"].map(
							(field) => (
								<Form.Group className="mb-3">
									<Form.Label>
										{field[0].toUpperCase() +
											field.slice(1)}
									</Form.Label>
									<Form.Control
										type="text"
										placeholder={`Edit ${field}`}
										name={field}
										disabled={!editState}
										value={(profileState as profile)[field]}
										onChange={handleFormChange}
										as={
											field === "hours"
												? "textarea"
												: "input"
										}
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
