
import React, { useState } from 'react';
import '../bio.css';

export const Profile = () => {
    const [profilePicture, setProfilePicture] = useState(null);
    const [name, setName] = useState('type your name here...');
    const [email, setEmail] = useState('put your email here');
    const [bio, setBio] = useState('type your bio here...');
    const [gallery, setGallery] = useState([]);

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

    const handleGalleryChange = (event) => {
        const files = Array.from(event.target.files);
        const newImages = files.map(file => URL.createObjectURL(file));
        setGallery(prevGallery => [...prevGallery, ...newImages]);
    };

    const handleEditSubmit = (event) => {
        event.preventDefault();
        alert('Your profile has been updated successfully!');
    };

    return (
        <div>
            <nav>
                <a href="Home.jsx">
                    <button type="button">Home</button>
                </a>
            </nav>
            <h1>Add a profile picture!</h1>
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

            {profilePicture && (
                <img id="preview" src={profilePicture} alt="Profile Preview" style={{ display: 'block' }} />
            )}

            <div className="profile">
                <h2>Profile Information</h2>
                <p><strong>Name:</strong> <span>{name}</span></p>
                <p><strong>Email:</strong> <span>{email}</span></p>
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

            <div className="gallery">
                <input
                    type="file"
                    id="fileInput"
                    accept="image/*"
                    style={{ display: 'none' }}
                    multiple
                    onChange={handleGalleryChange}
                />
                <button
                    className="upload-button"
                    onClick={() => document.getElementById('fileInput').click()}
                >
                    +
                </button>
                <div className="photos" id="photoGallery">
                    {gallery.map((imgSrc, index) => (
                        <img key={index} src={imgSrc} alt={`Gallery img ${index}`} />
                    ))}
                </div>
            </div>
        </div>
    );
};


