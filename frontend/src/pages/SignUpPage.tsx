import React, { useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import SignUpForm from "../components/SignUpForm";
import { TokenContext } from "../TokenContext";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
	const { token } = useContext(TokenContext);
	const navigate = useNavigate();

	useEffect(() => {
		console.log("signup", token);
		if (token !== "") {
			navigate("/profile");
		}
	});

	return (
		<div>
			<Navbar />
			<SignUpForm />
		</div>
	);
}
