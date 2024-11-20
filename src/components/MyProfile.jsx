
import React, { useEffect, useState } from 'react';
import { updateUserPicture, updateUserInfo, updateUserSchedule } from '../services/user_services';
import { useUserInfo } from '../utils/userContext';
import Schedule from './Schedule';

import '../bio.css';
import axios from "axios";
import UserProfile from './UserProfile';

export const MyProfile = ({ user }) => {

    const {userInfo, fetchData} = useUserInfo();
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
    const [image, setImage] = useState(''); // for the user profile picture-- different from photos!! 
    const [imageUrl, setImageUrl] = useState("");
    const [errors, setErrors] = useState({}); 
    const [schedule, setSchedule]= useState([]);

    //from the UserContext hook 
    

    // On initial render, if there are items that have been changed, then will load them from the localStorage. 
    useEffect(() => {
    
        try {
            const user_pfp = userInfo[0].user_metadata.picture;
            const user_name = userInfo[0].name;
            
            if(userInfo[0].user_metadata) {
                const user_bio = userInfo[0].user_metadata.bio;
                const user_hobbies = userInfo[0].user_metadata.hobbies; 
                const user_schedule = userInfo[0].user_metadata.schedule;
                
                setBio(user_bio);
                setHobbies(user_hobbies.join(", "));
                setSchedule(user_schedule);
            }
            
            
            setProfilePicture(user_pfp);
            setName(user_name);
            

        } catch (error) {
            //If the worst happens, then the localStorage will take what is in memory and render it
            // const savedPicture = localStorage.getItem('profilePicture');
            // const savedName = localStorage.getItem('name');
            // const savedBio = localStorage.getItem('bio');
            // const savedHobbies = localStorage.getItem('hobbies');
            // const savedPhotos = JSON.parse(localStorage.getItem('photos') || '[]');
            // const savedThreads = JSON.parse(localStorage.getItem('discussionThreads') || '[]');
            //TODO: refactor this 
            // if (savedPicture) {
            //     setProfilePicture(savedPicture);
            // }
            // if (savedName) {
            //     setName(savedName);
            // }
            // if (savedBio) {
            //     setBio(savedBio);
            // }
            // if (savedHobbies) {
            //     setHobbies(savedHobbies);
            // }
            // if(savedPhotos){
            //     setPhotos(savedPhotos);
            // } 
            // if(savedThreads){
            //     setPhotos(savedThreads);
            // }
            console.log(error);
        }
       
    }, []);

    const handleFileChange = (event) => {
        
        const file = event.target.files[0];
        
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfilePicture(e.target.result);
            };
            reader.readAsDataURL(file);
            setImage(file);
           
        }
    };

    const editSchedule = async (s) => {
        console.log(schedule)
         if(user.sub) {
             try {
                console.log(user.sub)
                const user_schedule = await updateUserSchedule(user.sub, s);
                setSchedule(s);
                console.log("Schedule successfully updated.");
                console.log(schedule);
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
        
            const data = {
                'name': name,
                'bio': bio,
                'hobbies': hobbies == 'enter your hobbies here as comma separated values :-)' ? [] : hobbies.trim().split(', ')
            }
            updateUserInfo(user.sub, data);
            
            alert('Your profile has been updated successfully!');
        }
    };


    // photo upload
    const handleUpload = async (event) => {
        event.preventDefault();
        if (!image) {
          alert("Please select an image to upload!");
          return;
        }
        
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", `${import.meta.env.VITE_CLOUDINARY_PRESET}`); 
    
        try {
          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
            formData
          );
          //Upon receiving the url from cloudinary, we then give this information to the auth0 database 
          setImageUrl(response.data.secure_url); 
          
          alert("Image uploaded successfully!");
        } catch (error) {
          console.error("Error uploading image:", error);
          alert("Failed to upload image");
        }
      };
    
      useEffect(() => {
        if(imageUrl) {
            const update_picture= async () => {
                const u = await updateUserPicture(user.sub,  imageUrl);
                const f = await fetchData();
                console.log('finished');
            }
            update_picture();
            setProfilePicture(imageUrl);
        }
      }, [imageUrl]);
    
      

    return (
        <>
            <div className='postContainer'>
                <div>
                    {profilePicture && (
                        <img id="preview" src={profilePicture} alt="Profile Preview" style={{ display: 'block' }} />
                    )}

                    <form id="uploadForm" onSubmit={handleUpload}>
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
                {/* <div style={styles.postContainer}>
                    <h2>Post photos to your profile!</h2>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleUpload}
                    />
                    <div>
                        {photos.map((photo, index) => (
                            <img key={index} src={photo} alt={`Uploaded ${index}`} style={{ width: '100px', margin: '10px' }} />
                        ))}
                    </div>
                </div> */}


                {/* Scheduling */}
                                           
                <Schedule editSchedule={editSchedule} userSchedule= {schedule}/>
                
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
