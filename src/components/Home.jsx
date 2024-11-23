
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { Posts } from "./Posts"
import  Events  from './Events'
import  UserCard  from "./UserCard";
import { MyProfile } from "./MyProfile";
import UserProfile from "./UserProfile";
import homeIcon from '../assets/images/icons/home.svg';
import eventIcon from '../assets/images/icons/event.svg';


export const Home = () => {

  
  const {isAuthenticated, user } = useAuth0();
  const [current, setCurrent] = useState('posts');
 

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
    //state={user}

    return( 
      <>
          {isAuthenticated ? 
              <div className="dashboardContainer">
                  <nav className="dashboardNav">
                      <Link to='/home' style={styles.navItem}> {/* changed this to help with the home/events*/}
                          <img src={homeIcon} alt="Home" style={styles.navIcon} />
                          <p>Home</p>
                      </Link>
                      <Link to='/events' state={{ user }} style={styles.navItem}>
                          <img src={eventIcon} alt="Events" style={styles.navIcon} />
                          <p>Events</p>
                      </Link>
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
        :
        <Navigate to="/" replace={true}/>   
        
        
        }
      </>
  );
};
// to fix icons home/events
const styles = {
  navItem: {
      display: 'flex',
      alignItems: 'center', 
      gap: '8px', 
      textDecoration: 'none', 
      color: 'plum', 
      padding: '8px', 
  },
  navIcon: {
      width: '30px', 
      height: '30px', 
  }
};