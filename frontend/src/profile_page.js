import React, { useState, useRef, useEffect } from "react";
import TextBox from './textbox';
import "./pp_styles.css";

export default function ProfilePage(props) {
    return (
        <div>
            <center>
                <h1> MARTY'S MEATLOAF </h1>
                <img className="photo" src="https://food.fnr.sndimg.com/content/dam/images/food/plus/fullset/2021/08/05/0/FN_PAM_ANDERSON_BACON_WRAPPED_MEATLOAF_H_f_s4x3.jpg.rend.hgtvcom.616.462.suffix/1628171184383.jpeg"/>
                <br/> <br/>
            </center>
            Profile type: Donor <br/> <br />

            Hours: <input type="hours"/> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Phone Number: <input type="phone_number"/> <br/> <br />

            Address: <input type="address"/> <br/> <br />

            Items available to donate: TAGS LIST
        </div>
      
    )
}