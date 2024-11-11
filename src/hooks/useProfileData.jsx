import { useState, useEffect } from "react"
import {retrieveUserInfo} from '../services/user_services'


export const useProfileData = (user) => {

    /**
     * This is a custom React hook that will take the stateful field 'user' which will contain certain elements 
     * of data we will use in an API endpoint to push and pull information from the user management database.
     * 
     */
    const [userInfo, setUserInfo] = useState({});
    

    useEffect(() => {
        const fetchData = async() => {
            const userInfo = await retrieveUserInfo(user.email)  
            console.log(userInfo)
            setUserInfo(userInfo)
        }
        
        try {
            if(user) {
                fetchData();
            }   
        } catch (error) {
            console.log(error);
        }
    //array remains empty as it runs only on initial render. 
    }, [user]);
    return userInfo;
}
