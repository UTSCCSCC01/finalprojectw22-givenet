import React, { useContext } from "react";
import LoginForm from "../components/LoginForm";
import { TokenContext } from "../TokenContext";
import "../styles/LoginForm.css"

type Props = {};

export default function LoginPage({}: Props) {
	const { tokenState } = useContext(TokenContext);

	return (
		<div id="subrootdiv">
			<LoginForm />
			{tokenState ? "logged in!" : "invalid login"}
		</div>
	);
}
