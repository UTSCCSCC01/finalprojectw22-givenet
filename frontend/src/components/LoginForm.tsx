import { useContext, useState } from "react";
import { TokenContext } from "../TokenContext";

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
        <div className='LoginPage'></div>
        <div className="Container">
            <div className="Input">
			<input
				type="text"
				name="username"
				placeholder="username"
				value={formState.username}
				onChange={handleFormStateChange}
			/>
			<input
				type="password"
				name="password"
				placeholder="password"
				value={formState.password}
				onChange={handleFormStateChange}
			/>
			
			<div className='Buttons'>
				<button onClick={() => handle_login(formState)}>log in</button>
                <label>
                    <input type="checkbox" name="remember"/>Remember me
                </label>
            </div>
		</div>
		</div>
		</body>
	);
}
