import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { Posts } from "./Posts"
import { Events } from './Events'
import  UserCard  from "./UserCard";
import { Outlet } from "react-router-dom";
import { MyProfile } from "./MyProfile";
import UserProfile from "./UserProfile";


export const Navigation = () => {
    

    const {isAuthenticated, user } = useAuth0();
    const [current, setCurrent] = useState('posts')

    const handleClick = (value) => {
        if(value != current) {
          if (value == "myprofile") {
            setCurrent("myprofile")
          } else if (value == "events") {
            setCurrent("events")
          } else if (value == "myprofile") {
            setCurrent("myprofile")
          } else if (value == "userprofile") {
            setCurrent("userprofile")
          }
           else {
            setCurrent("posts")
          }

        }
    }
   

    return( 
        <>
            {isAuthenticated &&
            <div className="dashboardContainer">
                
            <nav> 
                <button onClick={() => handleClick("posts")}>Posts</button>
                <button onClick={() => handleClick("events")}>Events</button>
              </nav>
             <main className="mainContentContainer">
                <div className= "userCard">
                    <UserCard handleClick={handleClick} user= {user}/>
                </div>
                <div>
                    {current == 'posts' && <Posts />}
                    {current == 'events' && <Events />} 
                    {current == 'myprofile' && <MyProfile user={user} />}
                    {current == 'userprofile' && <UserProfile />}
            
                </div>

             </main>
            
             
            </div>
            }
        </>
        
    )
}