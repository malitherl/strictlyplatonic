import axios from "axios";
import { useState } from "react";

export const EditForm = ({user, post, id, postsData, setToggleEdit, setTitle, setDesc, setImage}) => {
  
  const [editTitle , setEditTitle] = useState(post.title);
  const [editDesc , setEditDesc] = useState(post.desc);
  const [editImage , setEditImage] = useState(post.image);
  
  const [imagePreview, setImagePreview] = useState('');
   
  const handleImageChange = async (e) => {
   
   const file = e.target.files[0];
   if (file) {
     
     setImagePreview(URL.createObjectURL(file));
    
     const formData = new FormData();
     formData.append("file", file);
     formData.append("upload_preset", `${import.meta.env.VITE_CLOUDINARY_PRESET}`); 

     try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
       setEditImage(response.data.secure_url); 
       alert("Image changed successfully!");
     } catch (error) {
       console.error("Error uploading image:", error);
       alert("Failed to upload image");
     }
  
  }

  };






    
  const handlePostEdit = async (e) => {

    e.preventDefault();
    if (editTitle.trim() === '' || editDesc.trim() === '') {
      alert('Please put in a title and a description.');
      return;
    }
    

    const updatedPost = {
      title: editTitle,
      desc: editDesc,
      creator: post.creator,
      creator_pic: post.creator_pic, 
      date: new Date().toLocaleString(), //this is for display purposes 
      time: Date.now(), //this is different from the 'date' field because this determines the exact moment the post was made. 
      image: editImage ? editImage : '',
      type: editImage ? 'text/image' : 'text',
      comments: post.comments,
    };
    
    setTitle(editTitle)
    setDesc(editDesc)
    setImage(updatedPost.image);
    // reset form
    setEditTitle('');
    setEditDesc('');
    setEditImage('');
    setImagePreview('');

    //upon post update, we return the updated post and close out the editing toggle
    const updated = await postsData.updatePosts(updatedPost, id, user.sub);
    setToggleEdit(false);
  } 

    return (
        <div>
            <div style={styles.postContainer}>
            <h2>edit post</h2>
            <form style={styles.postContainerForm}  onSubmit={handlePostEdit}>
             <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Post Title"
                style={styles.input}
             />
            <textarea
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
              placeholder="What's on your mind?"
              rows="3"
              style={styles.textarea}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e)}
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


        </div>

    )


}

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
  
    postContainerForm: {
      display: "block",
      width: "30%",
      margin: "0 auto",
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