
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";




export const LoginScreen = () => {

    const { isAuthenticated, loginWithPopup } = useAuth0();

  
    useEffect(() => {
      if (isAuthenticated) {
        console.log("redirecting to home");
        
      }
    }, [isAuthenticated]);


    
    return (
        <>
        <div>
          
            <main className='intro'>
            <h3>About</h3>
            <p><b>StrictlyPlatonic</b> is a social platform designed to help individuals connect with others who share similar interests, hobbies, and passions. Whether you're looking to make new friends, attend local events, or simply find people who enjoy the same activities as you, StrictlyPlatonic makes it easy to foster genuine, platonic connections.
            With StrictlyPlatonic, you can:</p>
            <ul>
            <li>Discover Local Events: Explore a wide range of events happening in your area, from casual meetups to hobby-based gatherings, volunteer opportunities, and more. Find activities that align with your interests and meet like-minded people in real life.</li>
            <li>Create and Host Events: Have an idea for an event? You can easily create and promote your own events, inviting others to join. Whether it's a hiking trip, a book club meeting, or a game night, StrictlyPlatonic gives you the tools to bring people together.</li>
            <li>Share Schedules: Time management is key to successful meetups. Users can create and share their personal schedules, making it easier to find mutual availability and avoid scheduling conflicts. You can also see your friends' schedules and plan hangouts more effortlessly.</li>
            </ul>
       </main>

            {!isAuthenticated ? <button onClick={() => loginWithPopup()}>Log In</button> :  <Navigate to="/home" replace={true} />}

              
        
        </div>

 
        
        </>
    )


}