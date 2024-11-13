import React, { createContext, useState, useContext} from 'react';


const UserContext = createContext();


export const UserProvider = ({ children }) => {
  //This function will the user's state throughout the application. 
  //To accomplish this, we use the React Context API. 
  //The React Context API will more or less move state throughout our application 
  //without having to rely on prop passing or constant re-rendering of content. 
  
  //for now, this manages how the user's profile picture will render, but this can be extended to other variables. 
   
  const [userPicture, setUserPicture] = useState('hello'); 

  return (
    <UserContext.Provider value={{ userPicture, setUserPicture }}>
      {children}
    </UserContext.Provider>
  );
};


export const useUserInfo = () => useContext(UserContext);