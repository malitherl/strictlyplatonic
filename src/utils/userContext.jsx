import { useAuth0 } from '@auth0/auth0-react';
import { retrieveUserInfo } from '../services/user_services'
import React, { createContext, useState, useContext, useEffect} from 'react';


const UserContext = createContext();


export const UserProvider = ({ children }) => {
  //This function will the user's state throughout the application. 
  //To accomplish this, we use the React Context API. 
  //The React Context API will more or less move state throughout our application 
  //without having to rely on prop passing or constant re-rendering of content. 
  
  //for now, this manages how the user's profile picture will render, but this can be extended to other variables. 
  const [userInfo, setUserInfo] = useState(null);
  const { isAuthenticated, user } = useAuth0()


  useEffect(() => {
    const fetchData = async() => {
      const userInfo = await retrieveUserInfo(user.email)  
      
      setUserInfo(userInfo)
  }
  
    try {
        if( isAuthenticated && user) {
          fetchData();
        }   
    } catch (error) {
      console.log(error);
    }
    }, [isAuthenticated, user]);

  console.log(userInfo)


  
  const [userPicture, setUserPicture] = useState(''); 

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};


export const useUserInfo = () => useContext(UserContext);