import React from "react";
import SignUpForm from "../components/SignUpForm";
import "../styles/SignUpForm.css"

type Props = {};

export default function SignUpPage({}: Props) {
	return (
		<div id="subrootdiv">
			<SignUpForm />
		</div>
	);
}
