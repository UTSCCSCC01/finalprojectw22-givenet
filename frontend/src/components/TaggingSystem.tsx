import React, { useState } from "react";

let tagItems = [
    "peanuts",
    "meats",
    "cheeses",
    "marty's meatloaf",
    "canned beans"
];

export default function TaggingSystem() {
    return (
        <div className="container">
            <h1>TAGGING SYSTEM</h1>
            <div id="edittagcontainer">
                <input type="text" placeholder="NEW TAG" id="addtagname"></input>
                <button className="addBtn">ADD TAG</button>
            </div> 

            <div id="tagview">
                {tagItems.map((item: string) => (
					<div className="tags">
                        <label className="tagLabel">{item}</label>
                        <button className="tagDel" /*onCheckpending*/>X</button>
					</div>
				))}
            </div>
                
        
        
        </div>

    )
}
