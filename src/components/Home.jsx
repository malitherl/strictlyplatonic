import { Posts } from "./Posts"
import mainImage from '../assets/images/paperdolls.png';

import { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import LoginButton from "./LoginButton";
import Profile from "./Profile01";
import LogoutButton from "./LogoutButton";



export const Home = () => {

    //pass session token props here. For now, we're just going to have it stored as a variable. 
    
    //if you would like to work on the Posts page, change this sessionTokeValid variable to equal true. 
    //and if you would like to work on the Login form, change this to false and the page will redirect you there :)
    
    return (
        <>
        <div>
          <img src={mainImage} alt= "Main pic" style={{width: '100%', height: 'auto'}} />
            <h1 style={{color:"#65558f"}}>Strictly Platonic</h1>
              <main>
              <nav>
                
              </nav>
             
              <Profile />
              

              </main>
        </div>

 
        
        </>
    )


}