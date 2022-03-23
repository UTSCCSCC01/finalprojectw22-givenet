import { useContext } from "react";
import LoginForm from "../components/LoginForm";
import Navbar from "../components/Navbar";
import { TokenContext } from "../TokenContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

  return (
    <div id="subrootdiv">
      <Navbar />
      <LoginForm />
    </div>
  );
}
