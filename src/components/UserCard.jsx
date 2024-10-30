
import React, { useEffect, useState } from 'react';
import LogoutButton from "./LogoutButton";
import './UserCard.css';  

    const UserCard = ({ handleClick, user }) => {


    const [profilePicture, setProfilePicture] = useState(user.picture);
    const [name, setName] = useState('type your name here...');
    const [bio, setBio] = useState('type your bio here...');


    useEffect(() => {
        //Once we have a database, however, this will be changed to an asynchronous call to the database, to retrieve this information. 
        //TO DO: replace this with a try-catch block and async call to the user-information/management database 
        const savedPicture = localStorage.getItem('profilePicture');
        const savedName = localStorage.getItem('name');
        console.log(savedName)
        const savedBio = localStorage.getItem('bio')
        if(savedPicture) {
            console.log(savedPicture)
            console.log("Changing to saved picture")
            setProfilePicture(savedPicture);
        } 
        if(savedName) {
            setName(savedName)
        } 

        if(savedBio) {
            setBio(savedBio)
        }
    
    }, [profilePicture, name])


    return (
        <div className="userCardContainer">
            
            <img src={profilePicture} alt={user.name} />
            <h2>{name}</h2>
            <p>{user.email}</p>
            <hr />
            <div onClick={() => {handleClick("myprofile")}} >
                <h3>Edit Profile</h3>
            </div>
            <hr />
            <div onClick={() => {handleClick("userprofile")}}>
                <h3>Near You</h3>
            </div>
    
            <hr />
            <LogoutButton />
        </div>


    )


}

    export default UserCard; 