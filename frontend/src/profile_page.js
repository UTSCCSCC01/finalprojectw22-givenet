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
            <form>
            <div className="changeinfo">
                
                    <div class="columnleft">
                        <label htmlFor="name">Name: </label> <br />
                        <label htmlFor="location">Location: </label> <br />
                        <label htmlFor="hours">HoO: </label> <br />
                        <label htmlFor="phone">Phone: </label> <br />
                        <label htmlFor="email">Email: </label> <br />
                    </div>

                    <div class="columnright">
                    <input class="inputfield" type="text" name="name" id="Name"></input>
                    <br />
                    
                    <input class="inputfield" type="text" name="location" id="Location"></input>
                    <br />
                    
                    <input class="inputfield" type="text" name="hours" id="HoO"></input>
                    <br />
                    
                    <input class="inputfield" type="text" name="phone" id="Phone"></input>
                    <br />
                    
                    <input class="inputfield" type="email" name="email" id="Email"></input> 
                    <br />
                    </div>

                    
                                   
            </div>
            </form>
        </div>
      
    )
}