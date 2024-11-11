
import React, { useEffect, useState } from 'react';
import { updateUserPicture, updateUserSchedule } from '../services/user_services';
import Schedule from './Schedule';

import {Bucket} from '../services/bucket_services'
import '../bio.css';

export const MyProfile = ({ user, userInfo }) => {
    // to see if the user is logged into account and has permission
    if (!user || !user.email) {
        return <div>You are not authorized to view this page.</div>;
    }
    
    // Changing this so that if the user logs in and they have a profile picture already 
    // then this picture will be the default state. 
    const [profilePicture, setProfilePicture] = useState(''); 
    const [name, setName] = useState('type your name here...');
    const [bio, setBio] = useState('type your bio here...');
    const [hobbies, setHobbies] = useState('enter your hobbies here....');
    const [photos, setPhotos] = useState([]); // for photos to profile
    const [errors, setErrors] = useState({}); 
    const [schedule, setSchedule]= useState([]);

    const b = new Bucket();
    // On initial render, if there are items that have been changed, then will load them from the localStorage. 
    useEffect(() => {
    
        try {
            const user_pfp = userInfo[0].user_metadata.picture;
            const user_name = userInfo[0].name;
            const user_bio = userInfo[0].user_metadata.bio;
            const user_hobbies = userInfo[0].user_metadata.hobbies; 
            const user_schedule = userInfo[0].user_metadata.schedule;
            setProfilePicture(user_pfp);
            setName(user_name);
            setBio(user_bio);
            setHobbies(user_hobbies.join(", "));
            setSchedule(user_schedule);

        } catch (error) {
            //If the worst happens, then the localStorage will take what is in memory and render it
            const savedPicture = localStorage.getItem('profilePicture');
            const savedName = localStorage.getItem('name');
            const savedBio = localStorage.getItem('bio');
            const savedHobbies = localStorage.getItem('hobbies');
            const savedPhotos = JSON.parse(localStorage.getItem('photos') || '[]');
            const savedThreads = JSON.parse(localStorage.getItem('discussionThreads') || '[]');
            //TODO: refactor this 
            if (savedPicture) {
                setProfilePicture(savedPicture);
            }
            if (savedName) {
                setName(savedName);
            }
            if (savedBio) {
                setBio(savedBio);
            }
            if (savedHobbies) {
                setHobbies(savedHobbies);
            }
            if(savedPhotos){
                setPhotos(savedPhotos);
            } 
            if(savedThreads){
                setPhotos(savedThreads);
            }
        }
       
    }, []);

    const handleFileChange = async (event) => {
        
        const file = event.target.files[0];
        
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfilePicture(e.target.result);
            };
            reader.readAsDataURL(file);
            const url= await b.uploadUserAvatar(file.name, file);
            //add functionality to push this to the user profile. 
            try {
                console.log(url)
                const user_photo= await updateUserPicture(userInfo[0].user_id, `${url}`);
                console.log("send to user management")
            } catch (error) {
                console.log(error)
            }
        }
    };

    const editSchedule = async (schedule) => {
        console.log(schedule)
         if(userInfo[0].user_id) {
             try {
                const user_schedule = await updateUserSchedule(userInfo[0].user_id, schedule);
                console.log("Schedule successfully updated.")
             } catch (error) {
                console.log(error)
             }
         }
    }




    // Vaildation for name, bios, and hobbies and certain requirments must be met.
    const validateForm = () => {
        const newErrors = {};
        if (!name || name.length > 50) {
            newErrors.name = 'Name is required and should be less than 50 characters. ';
        }
        if (!bio || bio.length > 300) {
            newErrors.bio = 'Please provide a bio! Keep it less than 300 characters. ';
        }
        if (!hobbies) {
            newErrors.hobbies = 'Please enter in your hobbies! Hobbies are required. We ask you to provide this information so that potential friends can know what you like to do!';
        }
        setErrors(newErrors); 
        return Object.keys(newErrors).length === 0; 
    };

    const handleEditSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) { // validating form . If it fails, storing should be stopped and prevent unwanted data 
            
            localStorage.setItem('profilePicture', profilePicture);
            localStorage.setItem('name', name);
            localStorage.setItem('bio', bio);
            localStorage.setItem('hobbies', hobbies);
            alert('Your profile has been updated successfully!');
        }
    };

    // photo upload
    const handlePhotoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const newPhotos = [...photos, e.target.result];
                setPhotos(newPhotos);
                localStorage.setItem('photos', JSON.stringify(newPhotos)); 
            };
            reader.readAsDataURL(file);
            
            

        }
    };


    return (
        <>
            <div className='postContainer'>
                <div>
                    {profilePicture && (
                        <img id="preview" src={profilePicture} alt="Profile Preview" style={{ display: 'block' }} />
                    )}
                    <form id="uploadForm" onSubmit={handleEditSubmit}>
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
                </div>
                
                {/* Profile Info */}
                <div className="profile">
                    <h2>Profile Information</h2>
                    <p><strong>Name:</strong> <span>{name}</span></p>
                    <p><strong>Email:</strong> <span>{user.email}</span></p>
                    <p><strong>Bio:</strong> <span>{bio}</span></p>
                    <p><strong>Hobbies:</strong> <span>{hobbies}</span></p>
                </div>

                {/* Edit profile form */}
                <div style={styles.postContainer}>
                    <h1 style={styles.header}>Edit Profile</h1>
                    <form id="editForm" onSubmit={handleEditSubmit}>
                        <label htmlFor="name">Name:</label><br />
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                        <br /><br />

                        <label htmlFor="bio">Bio:</label><br />
                        <textarea
                            id="bio"
                            rows="4"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                        {errors.bio && <p style={{ color: 'red' }}>{errors.bio}</p>}
                        <br /><br />

                        <label htmlFor="hobbies">Hobbies:</label><br />
                        <textarea
                            id="hobbies"
                            rows="4"
                            value={hobbies}
                            onChange={(e) => setHobbies(e.target.value)}
                        />
                        {errors.hobbies && <p style={{ color: 'red' }}>{errors.hobbies}</p>}
                        <br /><br />
                        <button type="submit">Save Changes</button>
                    </form>
                </div>

                {/* Photos  */}
                <div style={styles.postContainer}>
                    <h2>Post photos to your profile!</h2>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                    />
                    <div>
                        {photos.map((photo, index) => (
                            <img key={index} src={photo} alt={`Uploaded ${index}`} style={{ width: '100px', margin: '10px' }} />
                        ))}
                    </div>
                </div>


                {/* Scheduling */}
                                           
                <Schedule editSchedule={(s)=>editSchedule(s)} userSchedule= {schedule}/>
                
            </div>
        </>
    );
};

const styles = {
    postContainer: {
        border: '2px solid #ddd',
        marginBottom: '20px',
        padding: '3em',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9',
        background: 'linear-gradient(21deg, #65558f, #a69ac7)'
    },
    header: {
        fontSize: '35px',
        marginBottom: '20px',
        fontWeight: 'bold',
        margin: '5px 0'
    },
    threadContainer: {
        border: '1px solid #ddd',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '5px',
        color: 'purple',
        background: 'linear-gradient(21deg, #65558f, #a69ac7)'
    }
};
