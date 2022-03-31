import React from "react";
import Navbar from "../components/Navbar";
import MyDonations from "../components/MyDonations";
type Props = {};

export default function MyDonationsPage({}: Props) {
  return (
    <div>
      <Navbar />
      <MyDonations />
    </div>
  );
}