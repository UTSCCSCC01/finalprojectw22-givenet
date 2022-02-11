import { useContext, useState } from "react";
import { TokenContext } from "../TokenContext";
import '../styles/LoginForm.css'

type Props = {};

type form = {
	username: string;
	password: string;
};

export default function LoginForm({}: Props) {
	const [formState, setFormState] = useState<form>({
		username: "",
		password: "",
	});
	const { tokenState, setTokenState } = useContext(TokenContext);

	const handleFormStateChange = (e: any) => {
		const { name, value } = e.target;
		setFormState((prev) => ({ ...prev, [name]: value }));
	};

	const handle_login = async (form: form) => {
		console.log("handling login");

		const response = await fetch("/account/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(form),
		});

		if (response.status === 401) {
			setTokenState("");
		} else {
			const { accessToken } = await response.json();
			setTokenState(accessToken);
			
		}
	};

	return (
		<body>
			
			<div className="container">

			<h1>GiveNet</h1>
			<div className="form">
				<input
					type="text"
					name="username"
					className="textinput"
					placeholder="Username"
					required
					value={formState.username}
					onChange={handleFormStateChange}
				/>
				<span className="hidden"></span>
				<input
					type="password"
					name="password"
					className="textinput"
					placeholder="Password"
					required
					value={formState.password}
					onChange={handleFormStateChange}
					/>
				
					<label>Remember Me
					<input type="checkbox" name="remember" />
					</label>
				<button id="loginbtn" name="loginbtn" onClick={() => handle_login(formState)}>Log In</button>
				
			</div>

			</div>
            

		</body>
	);
}
