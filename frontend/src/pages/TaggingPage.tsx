import React from "react";
import Navbar from "../components/Navbar";
import TaggingSystem from "../components/TaggingSystem";

type Props = {};

export default function TaggingPage({}: Props) {
  return (
    <div>
      <Navbar />
      <TaggingSystem />
    </div>
  );
}
