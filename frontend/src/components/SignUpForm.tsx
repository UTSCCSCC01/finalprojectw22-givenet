import React, { useState } from "react";

type Props = {};

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


export default function SignUpForm({}: Props) {
	function isCharity(item:String) {
		if (item ==="type") {    return "Are you a charity?";  }}
	
	let formItems = [
		"username",
		"password",
		"name",
		"location",
		"hours",
		"phone",
		"email",
		"type",
	];
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

	const handleFormStateChange = (e: any) => {
		const { name } = e.target;
		if (name !== "type") {
			const { value } = e.target;
			setFormState((prev) => ({ ...prev, [name]: value }));
		} else {
			const { checked } = e.target;
			setFormState((prev) => ({ ...prev, type: checked }));
		}
	};

	const getInputType = (item: string) => {
		if (item === "password") {
			return item;
		} else if (item === "type") {
			return "checkbox";
		}
		return "text";
	};

	const handle_signup = async (form: form) => {
		console.log("handling signup");

		const response = await fetch("/account/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...form, type: +!!form.type + 1 }),
		});
		console.log(response);
	};

	return (
		<div className="container">
			<h1>GiveNet</h1>
			<h2>Sign Up</h2>
			<form id="signupform" action="" onSubmit={(e) => e.preventDefault()}>

				{formItems.map((item: string) => (
					<div id="formInputs">
				
					<label>{isCharity(item)}</label>
					<input
						placeholder={item.charAt(0).toUpperCase() + item.slice(1)}
						name={item}
						type={getInputType(item)}
						value={formState[item as keyof form].toString()}
						onChange={handleFormStateChange}
						checked={item === "type" ? formState.type : false }
						required
					/>
					</div>
				))}
				<button id="signupbtn" type="submit" onClick={() => handle_signup(formState)}>
					Sign Up
				</button>
				
			</form>
		</div>
					
	);
}
