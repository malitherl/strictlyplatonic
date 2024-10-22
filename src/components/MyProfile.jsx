
import React, { useEffect, useState } from 'react';
import '../bio.css';

export const MyProfile = ({user}) => {
    //Changing this so that if the user logs in and they have a profile picture already 
    //then this picture will the default state. 
    const [profilePicture, setProfilePicture] = useState(user.picture);
    const [name, setName] = useState('type your name here...');
    const [bio, setBio] = useState('type your bio here...');

    //On initial render, if there are items that have been changed, then will loaded from the localStorage. 
    useEffect(() => {
        //Once we have a database, however, this will be changed to an asynchronous call to the database, to retrieve this information. 
        //TO DO: replace this with a try-catch block and async call to the user-information/management database 
        const savedPicture = localStorage.getItem('profilePicture');
        const savedName = localStorage.getItem('name');
        console.log(savedName)
        const savedBio = localStorage.getItem('bio')
        if(savedPicture) {
            setProfilePicture(savedPicture);
        } 
        if(savedName) {
            setName(savedName)
        } 

        if(savedBio) {
            setBio(savedBio)
        }
    
    }, [])

const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfilePicture(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditSubmit = (event) => {
        event.preventDefault();
        localStorage.setItem('profilePicture', profilePicture);
        localStorage.setItem('name', name)
        localStorage.setItem('bio', bio)
        alert('Your profile has been updated successfully!');

    };





    return (
        <div>
            
            {profilePicture && (
                <img id="preview" src={user.picture} alt="Profile Preview" style={{ display: 'block' }} />
            )}
            <form id="uploadForm">
                <label htmlFor="profilePicture">Change profile picture:</label>
                <input
                    type="file"
                    id="profilePicture"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                />
                <br /><br />
                <button type="submit">Upload</button>
            </form>

            <div className="profile">
                <h2>Profile Information</h2>
                <p><strong>Name:</strong> <span>{name}</span></p>
                <p><strong>Email:</strong> <span>{user.email}</span></p>
                <p><strong>Bio:</strong> <span>{bio}</span></p>
            </div>

            <h2>Edit Profile</h2>
            <form id="editForm" onSubmit={handleEditSubmit}>
                <label htmlFor="name">Name:</label><br />
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                /><br /><br />

                <label htmlFor="bio">Bio:</label><br />
                <textarea
                    id="bio"
                    rows="4"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                /><br /><br />

                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};



