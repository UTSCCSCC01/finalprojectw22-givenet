import React from "react";
import Navbar from "../components/Navbar";
import Profile from "../components/Profile";

type Props = {};

export default function ProfilePage({}: Props) {
  return (
    <div>
      <Navbar />
      <Profile />
    </div>
  );
}
