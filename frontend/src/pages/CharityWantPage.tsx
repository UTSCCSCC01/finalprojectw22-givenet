import React from "react";
import Navbar from "../components/Navbar";
import WantedItems from "../components/CharityWant";

type Props = {};

export default function CharityWantPage({}: Props) {
  return (
    <div>
      <Navbar />
      <WantedItems />
    </div>
  );
}
