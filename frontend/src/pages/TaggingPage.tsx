import React from "react";
import TaggingSystem from "../components/TaggingSystem";
import "../styles/TaggingSystem.css"

type Props = {};

export default function TaggingPage({}: Props) {
	return (
		<div id="subrootdiv">
			<TaggingSystem/>
		</div>
	);
}
