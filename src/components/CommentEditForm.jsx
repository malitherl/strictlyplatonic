import { useState } from "react";


export const CommentEditForm = ({id, comment, handleCommentEdit, handleEditToggle}) => {

    const [newComment, setComment] = useState('');

    
    const onCommentEdit = (e) => {
        e.preventDefault();
        if (comment) {
          const oldComment = comment
          const editedComment = {
            ...comment,
            comment: newComment,
          };
          
          console.log(newComment);
          handleCommentEdit(id, oldComment, editedComment);
          handleEditToggle()
          setComment('');
        }
      };


    return (
        <form onSubmit={onCommentEdit} style={styles.form}>
        
        
        <textarea
          placeholder="edit your comment here..."
          value={newComment}
          onChange={(e) => setComment(e.target.value)}
          required
          style={styles.textarea}
        />
        
        {/* upload input for image */}
        {/* <div style={styles.imageUploadContainer}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={styles.fileInput}
          /> */}
          {/*  preview of image */}
          {/* {image && <img src={URL.createObjectURL(image)} alt="Preview" style={styles.imagePreview} />}
        </div> */}
  
        <button type="submit" style={styles.button}>Edit</button>
        
      </form>



    )

}

const styles = {
  
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '10px',
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
  
  
};
