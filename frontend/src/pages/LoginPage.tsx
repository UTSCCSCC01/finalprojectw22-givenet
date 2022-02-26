import { useContext } from "react";
import LoginForm from "../components/LoginForm";
import Navbar from "../components/Navbar";
import { TokenContext } from "../TokenContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
	const navigate = useNavigate();
	const { token, setToken } = useContext(TokenContext);

	console.log(1, token);
	if (token) {
		navigate("/profile");
	}

	return (
		<div id="subrootdiv">
			<Navbar />
			<LoginForm />
		</div>
	);
}
