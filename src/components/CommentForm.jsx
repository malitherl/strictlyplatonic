import React, { useEffect, useState } from 'react';
import { useUserInfo } from "../utils/userContext";

export const CommentForm = ({ user, postId, handleCommentSubmit }) => {

    const [comment, setComment] = useState('');
    const [image, setImage] = useState('');
    const { userInfo } = useUserInfo(); 

    const onCommentSubmit = (e) => {
      e.preventDefault();
      if (user.name && comment) {
        let username = userInfo[0].name ? userInfo[0].name : user.name
        const newComment = {
          user_id: user.sub,
          username,
          comment,
          image: image ? image : '', // Handle the image if it exists
          time: new Date().toLocaleString(), 
        };
        
        handleCommentSubmit(postId, newComment);
        setComment('');
        setImage(null); 
      }
    };
  
  
    return (
      <form onSubmit={onCommentSubmit} style={styles.form}>
        <p>Commenting as <strong>{userInfo[0].name ? userInfo[0].name : user.name}</strong></p>
        
        <textarea
          placeholder="add your comment here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          style={styles.textarea}
        />
  
        <button type="submit" style={styles.button}>Submit</button>
      </form>
    );
  };

  
const styles = {
    container: {
      margin: '0 auto',
      maxWidth: '800px',
    },
    postContainer: {
      border: '2px solid #ddd',
      padding: '10px',
      marginBottom: '20px',
      borderRadius: '5px',
      backgroundColor: '#f9f9f9',
    },
    username: {
      fontSize: '35px',
      fontWeight: 'bold',
      color: '#000000',
    },
    commentsContainer: {
      marginTop: '10px',
      //below is for writing in comments, i had to play around with it alot so we can remove some stuff if need be- sierra
    },
    comment: {
      backgroundColor: '#eee',
      padding: '5px',
      margin: '5px 0',
      borderRadius: '3px',
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
    },
    textarea: {
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      marginBottom: '10px',
      minHeight: '60px',
      background: 'linear-gradient(21deg, #d6c7e5, violet)',
      color: '#000000',
    },
    button: {
      backgroundColor: '#9966CC',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      padding: '10px',
      cursor: 'pointer',
    },
    fileInput: {
      marginTop: '10px',
      padding: '5px',
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
