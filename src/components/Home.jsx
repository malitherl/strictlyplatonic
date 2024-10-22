import { Posts } from "./Posts"
import { Events } from './Events'
import { Profile } from './Profile'
import mainImage from '../assets/images/paperdolls.png';
import { useState } from "react";
import { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import LoginButton from "./LoginButton";
import Profile from "./Profile01";
import LogoutButton from "./LogoutButton";




export const Home = () => {


   const [current, setCurrent] = useState('posts')
   




    const handleClick = (value) => {
        if(value != current) {
          if (value == "profile") {
            setCurrent("profile")
          } else if (value == "events") {
            setCurrent("events")
          } else {
            setCurrent("posts")
          }

        }
    }

    //pass session token props here. For now, we're just going to have it stored as a variable. 
    
    //if you would like to work on the Posts page, change this sessionTokeValid variable to equal true. 
    //and if you would like to work on the Login form, change this to false and the page will redirect you there :)
    let sessionTokeValid = true;
   
    
    return (
        <>
        <div>
          <img src={mainImage} alt= "Main pic" style={{width: '100%', height: 'auto'}} />
            <h1 style={{color:"#65558f"}}>Strictly Platonic</h1>
              <nav> 
                <button onClick={() => handleClick("posts")}>Posts</button>
                <button onClick={() => handleClick("events")}>Events</button>
                <button onClick={() => handleClick("profile")}>Profile</button>
                </nav>
              <main>


               {/* TO DO: refactor this. right now, this works to toggle between components. */}
               {current == 'posts' && <Posts />}
               {current == 'events' && <Events />}
               {current == 'profile' && <Profile />}
              <nav>
                
              </nav>
             
              <Profile />
              
              </main>
        </div>

 
        
        </>
    )


}