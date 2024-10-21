import { Posts } from "./Posts"
import { Events } from './Events'
import { Profile } from './Profile'
import mainImage from '../assets/images/paperdolls.png';

import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";



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

    
    return (
        <>
        <div>
          <img src={mainImage} alt= "Main pic" style={{width: '100%', height: 'auto'}} />
            <h1 style={{color:"#65558f"}}>Strictly Platonic</h1>
              <main>

               {/* TO DO: refactor this. right now, this works to toggle between components. */}
               {current == 'posts' && <Posts />}
               {current == 'events' && <Events />}
               {current == 'profile' && <Profile />}

              </main>
        </div>

 
        
        </>
    )


}