import axios from "axios";
import React, { useState } from 'react';
import { useUserInfo } from "../utils/userContext";
export const PostForm = ({user, postsData, createPost}) => { 
    

    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostDesc, setNewPostDesc] = useState('');
    const [newPostImage, setNewPostImage] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [imageUrl, setImageUrl] = useState("");
    const { userPicture } = useUserInfo(); 



    const handlePostSubmit = async (e) => {
        e.preventDefault();
        if (newPostTitle.trim() === '' || newPostDesc.trim() === '') {
          alert('Please put in a title and a description.');
          return;
        }
        
        if( newPostImage|| newPostImage.length > 0) {
    
          const formData = new FormData();
          formData.append("file", newPostImage);
          formData.append("upload_preset", `${import.meta.env.VITE_CLOUDINARY_PRESET}`); 
    
          try {
            const response = await axios.post(
              `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
              formData
            );
            
            setNewPostImage(response.data.secure_url); 
            console.log(response.data.secure_url);
    
            alert("Image uploaded successfully!");
          } catch (error) {
            console.error("Error uploading image:", error);
            alert("Failed to upload image");
          }
        }
    
        console.log(imageUrl);
    
    
        const newPost = {
          title: newPostTitle,
          desc: newPostDesc,
          creator: user.sub,
          creator_pic: userPicture, 
          user_name: user.name,
          date: new Date().toLocaleString(), //this is for display purposes 
          time: Date.now(), //this is different from the 'date' field because this determines the exact moment the post was made. 
          image: imageUrl ? imageUrl : '',
          type: newPostImage ? 'text/image' : 'text',
          comments: [],
          reactions: {},
        };
       
        //setPosts([...posts, newPost]);
    
        //const updatedPosts = [...posts, newPost];
        //localStorage.setItem('posts', JSON.stringify(updatedPosts)); // save to local storage
    
        // reset form
        setNewPostTitle('');
        setNewPostDesc('');
        setNewPostImage('');
        setImagePreview('');
    
        //upon post creation in the post services, we can return the newly-made post's id, and we do this here, then add it to state. 
        const newPostId = await postsData.createPost(newPost); 
        
        createPost(newPost, newPostId); 
      };
    
      const handleImageChange = async (e) => {
        const file = e.target.files[0];
       if (file) {
         setNewPostImage(file);
         setImagePreview(URL.createObjectURL(file));
        
         const formData = new FormData();
         formData.append("file", file);
         formData.append("upload_preset", `${import.meta.env.VITE_CLOUDINARY_PRESET}`); 
    
         try {
          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
            formData
          );
    
           setImageUrl(response.data.secure_url); 
           alert("Image uploaded successfully!");
         } catch (error) {
           console.error("Error uploading image:", error);
           alert("Failed to upload image");
         }
      
      }
    
      };




    return (
        <div style={styles.postCreator}>
          <h2>create a new post!</h2>
          <form style={styles.postContainerForm} onSubmit={handlePostSubmit}>
            <input
              type="text"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              placeholder="Post Title"
              style={styles.input}
            />
            <textarea
              value={newPostDesc}
              onChange={(e) => setNewPostDesc(e.target.value)}
              placeholder="What's on your mind?"
              rows="3"
              style={styles.textarea}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={styles.fileInput}
            />
            {imagePreview && (
              <div>
                <h4>image:</h4>
                <img src={imagePreview} alt="Preview" style={styles.postImage} />
              </div>
            )}
            <button type="submit" style={styles.button}>
              Post
            </button>
          </form>
        </div>
      )}


      const styles = {
        container: {
          margin: '0 auto',
          maxWidth: '800px',
        },
        postCreator: {
          border: '2px solid #ddd',
          padding: '10px',
          marginBottom: '20px',
          borderRadius: '5px',
          backgroundColor: '#f9f9f9',
          textAlign: 'center', 
        },
      
        postContainerForm: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',  
          margin: '0 auto',
          width: '50%',
          padding: '20px',
          borderRadius: '5px',
          backgroundColor: '#f9f9f9',
        },
      
        username: {
          fontSize: '35px',
          fontWeight: 'bold',
          color: '#000000',
          margin: '0 5px',
        },
        form: {
          display: 'flex',
          flexDirection: 'column',
          marginTop: '10px',
        },
        inputContainer: {
          background: 'linear-gradient(21deg, #d6c7e5, violet)',
          padding: '3px',
        },
        input: {
          fontFamily: 'inherit',
          lineHeight: 'inherit',
          color: '#000000',
          minWidth: '12em',
          padding: '0.325em',
          border: 'none',
          outline: 'none',
          transition: 'all 0.3s',
          backgroundColor: '#e6e6fa',
          marginBottom: '10px',
          textAlign: 'center', 
        },
      
        textarea: {
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          marginBottom: '10px',
          minHeight: '60px',
          background: 'linear-gradient(21deg, #d6c7e5, violet)',
          color: '#000000',
          width: '100%',
          textAlign: 'center', 
        },
        button: {
          backgroundColor: '#9966CC',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          padding: '10px',
          cursor: 'pointer',
          marginTop: '10px',
        },
        fileInput: {
          marginTop: '10px',
          padding: '5px',
        },
        imagePreviewContainer: {
          marginTop: '10px',
          textAlign: 'center', 
        },
        imagePreview: {
          marginTop: '10px',
          maxWidth: '100%',
          maxHeight: '200px',
          borderRadius: '8px',
        },
        imageUploadContainer: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
      
        },
        postImage: {
          maxWidth: '100%',
          maxHeight: '300px',
          borderRadius: '15px',
          marginTop: '15px',
      
        },
        commentImage: {
          marginTop: '10px',
          maxWidth: '100px',
          maxHeight: '100px',
          borderRadius: '8px',
      
    },
    
  };