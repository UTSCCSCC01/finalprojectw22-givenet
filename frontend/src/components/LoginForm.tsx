import { useContext, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { TokenContext } from "../TokenContext";
import { useNavigate } from "react-router-dom";

type Props = {};

type form = {
	username: string;
	password: string;
};

export default function LoginForm({}: Props) {
	// Login form state
	const [formState, setFormState] = useState<form>({
		username: "",
		password: "",
	});
	const { setToken } = useContext(TokenContext);
	// Error message for form errors
	const [errorState, setErrorState] = useState("");
	const navigate = useNavigate();

	// Modify state when the form changes
	const handleFormStateChange = (e: any) => {
		const { name, value } = e.target;
		setFormState((prev) => ({ ...prev, [name]: value }));
	};

	// On login, handle any errors and login and update token if successfull
	const handleLogin = async () => {
		setErrorState("");
		if (formState.username === "") {
			setErrorState("Please enter a username");
			return;
		}
		if (formState.password === "") {
			setErrorState("Please enter a password");
			return;
		}

		const response = await fetch("/account/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formState),
		});

		if (response.status === 401) {
			setToken("");
			setErrorState("Invalid username or password");
		} else {
			const { accessToken } = await response.json();
			setToken(accessToken);
			setErrorState("");
			navigate("/profile");
		}
	};

	return (
		<div className="container">
			<h1 className="pt-5">Login</h1>
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
					<Form.Label>Password</Form.Label>
					<Form.Control
						onChange={handleFormStateChange}
						type="password"
						placeholder="Enter password"
						name="password"
						value={formState.password}
					/>
				</Form.Group>
			</Form>
			<Button variant="primary" onClick={handleLogin}>
				Login!
			</Button>
		</div>
	);
}
