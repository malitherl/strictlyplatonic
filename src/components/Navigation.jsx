

import { useUserInfo } from "../utils/userContext";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Posts } from "./Posts"
import  Events  from './Events'
import  UserCard  from "./UserCard";
import { MyProfile } from "./MyProfile";
import UserProfile from "./UserProfile";
import { useProfileData } from '../hooks/useProfileData';
import homeIcon from '../assets/images/icons/home.svg';
import eventIcon from '../assets/images/icons/event.svg';

export const Navigation = () => {
     

    const {isAuthenticated, user } = useAuth0();
    const [current, setCurrent] = useState('posts');
    
    const [isLoading, setIsLoading] = useState(true);
    const { userInfo } = useUserInfo();



    

    
   
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
          } else if (value == "inbox") {
            setCurrent("inbox")
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
            <nav className="dashboardNav"> 
                <button onClick={() => handleClick("posts")}>
                  <img style={{width: "30px", height: "30px"}} src={homeIcon}></img> 
                  <p>Home</p>
                </button>
                <button onClick={() => handleClick("events")}>
                  <img style={{width: "30px", height: "30px"}} src={eventIcon} alt="" />
                  <p>Events</p>
                </button>
              </nav>
             <main className="mainContentContainer">
                <div className= "userCard">
                    <UserCard handleClick={handleClick} user= {user}/>
                </div>
                <div className="content">
                    {current == 'posts' && <Posts user={user} />}
                    {current == 'events' && <Events user={user}/>} 
                    {current == 'myprofile' && <MyProfile  user={user} />}
                    {current == 'userprofile' && <UserProfile />}
                    {current == 'inbox' && <Inbox />}
                </div>

             </main>
            
             
            </div>
            }
        </>
    )
}