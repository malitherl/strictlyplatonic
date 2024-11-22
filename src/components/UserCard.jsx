
import React, { useEffect, useState } from 'react';
import LogoutButton from "./LogoutButton";
import '../index.css';
import { useUserInfo } from '../utils/userContext';
import { Link } from 'react-router-dom';
    


const UserCard = ({ user }) => {

    

    const [name, setName] = useState(user.name);
    const [nickname, setNickName] = useState(user.nickname);
    const [profilePicture, setProfilePicture] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    
    const {userInfo} = useUserInfo();
    console.log(userInfo)
    
    useEffect(() => {
        console.log("user information updated")
        if(userInfo && Object.values(userInfo).length > 0){

            if(userInfo[0]["user_metadata"]["picture"]){
                setProfilePicture(userInfo[0]["user_metadata"]["picture"])
            } else {
                setProfilePicture(user.picture)
            }
            
            setName(userInfo[0]["name"]);
            setNickName(userInfo[0]["nickname"]);
            setIsLoading(false);
        } 


    //this determines if the api has updated the user information, and will re-render this component
    }, [userInfo])










    const UserCardLoadingModal = () => {
        return (
            <div className='userCardContainer'>
                <div className='loader'>
                </div>
            </div>
        )
    }



    return (
        <>        
        {isLoading ? <UserCardLoadingModal /> :
        <div className="userCardContainer">
            
            <img src={profilePicture} alt={user.name} />
            <h2>{name}</h2>
            <p>@{nickname}</p>
            {/* <div onClick={() => {handleClick("inbox")}} >
                <h3>Inbox</h3>
            </div>
            <hr /> */}
            <div>
            <Link to='/my_profile' state={{user: user}}> 
                <h3>Edit Profile</h3>
            </Link>
            </div>
            <hr />
            <Link to='/users' state={{user: user}}> 
                <h3>Friends</h3>
            </Link>
    
            <hr />
            <LogoutButton />
        </div>
        }</>


    )}

    export default UserCard; 