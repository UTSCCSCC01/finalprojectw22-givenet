import React, { useState, useRef, useEffect } from "react";
import TextBox from './textbox';
import "./pp_styles.css";

export default function ProfilePage(props) {
    return (
        <div>
            <center> 
                <h1> MARTY'S MEATLOAF (fetch from backend)</h1>
                <img className="photo" src="https://food.fnr.sndimg.com/content/dam/images/food/plus/fullset/2021/08/05/0/FN_PAM_ANDERSON_BACON_WRAPPED_MEATLOAF_H_f_s4x3.jpg.rend.hgtvcom.616.462.suffix/1628171184383.jpeg"/>
                <br/> <br/>
            </center>
            <div className="changeinfo">
                <div className="columnleft">
                    <div><label>Profile type: </label> </div> 
                    <div><label>Hours:</label></div>
                    <div><label>Address:</label></div>
                    <div><label>Phone Number: </label></div>
                </div>
                <div className="columnright">   
                    <div><label>Donor</label></div>
                    <div className="inputfield"><input type="hours"/><button>submit</button></div>
                    <div className="inputfield"><input type="address"/><button>submit</button></div>
                    <div className="inputfield"><input type="phone_number"/><button>submit</button></div>
                </div> 
            </div>
        </div>
      
    )
}