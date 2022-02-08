import React, { useContext } from "react";
import LoginForm from "../components/LoginForm";
import { TokenContext } from "../TokenContext";

type Props = {};

export default function LoginPage({}: Props) {
	const { tokenState } = useContext(TokenContext);

	return (
		<div>
			<h1>Login</h1>
			<LoginForm />
			{tokenState ? "logged in!" : "invalid login"}
		</div>
	);
}
