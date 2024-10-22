
import React, { useState } from 'react';
import '../bio.css';

export const Profile = () => {
    const [profilePicture, setProfilePicture] = useState(null);
    const [name, setName] = useState('type your name here...');
    const [email, setEmail] = useState('put your email here');
    const [bio, setBio] = useState('type your bio here...');

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
        alert('Your profile has been updated successfully!');
    };

    return (
        <>
         <nav>
                <a href="index.html">
                    <button type="button">Home</button>
                </a>
            </nav>
        
        <div style={styles.postContainer}>   
            <h1 style={styles.header}>Add a profile picture!</h1>
            <form id="uploadForm">
                <label htmlFor="profilePicture">Choose a profile picture:</label>
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

            {profilePicture && (
                <img id="preview" src={profilePicture} alt="Profile Preview" style={{ display: 'block' }} />
            )}

            <div style={styles.postContainer} className="profile">
                <h1 style={styles.header}>Profile Information</h1>
                <p><strong>Name:</strong> <span>{name}</span></p>
                <p><strong>Email:</strong> <span>{email}</span></p>
                <p><strong>Bio:</strong> <span>{bio}</span></p>
            </div>

            <div style={styles.postContainer}>
            <h1 style={styles.header}>Edit Profile</h1>
            <form id="editForm" onSubmit={handleEditSubmit}>
                <label htmlFor="name">Name:</label><br />
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                /><br /><br />

                <label htmlFor="email">Email:</label><br />
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
</>
        
    )
}

const styles = {
    postContainer: {
        border: '2px solid #ddd',
        marginBottom: '20px',
        padding:'20px',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9',
     
      },
      header: {
        fontSize: '35px', 
        marginBottom: '20px',
        fontWeight: 'bold',
        margin: '5px 0'
}
}



