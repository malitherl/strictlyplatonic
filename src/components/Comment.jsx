import React, { useState } from 'react';
import { CommentEditForm } from './CommentEditForm';

export const Comment = ({user, id, comment, handleCommentEdit, handleCommentDelete}) => {

    console.log(comment)

    const [toggleEdit, setToggleEdit] = useState(false);

    const handleEditToggle = () => {
        setToggleEdit(!toggleEdit);
    }

    const handleDeleteToggle = () => {
        handleCommentDelete(id, comment);
    }


    return (
       <div style={styles.comment}>
         {comment.username != '' && comment.comment != '' && <p><strong>{comment.username}: </strong>{comment.comment}</p>}
         {/* to show image with comment */}
         {comment.image && <img src={comment.image} alt="Comment" style={styles.commentImage} />}
         {/**to show edit button if the user wrote the comment */}
         {comment.user_id == user.sub && <div><button onClick={handleEditToggle}>edit</button> <button onClick={handleDeleteToggle}>delete</button> </div>} 

         {toggleEdit && <CommentEditForm handleEditToggle= {handleEditToggle} user={user} id={id} comment={comment} handleCommentEdit={handleCommentEdit}/>}
       </div>

    )
    
}



const styles = {

    
      comment: {
        backgroundColor: '#eee',
        padding: '5px',
        margin: '5px 0',
        borderRadius: '3px',
      }

}