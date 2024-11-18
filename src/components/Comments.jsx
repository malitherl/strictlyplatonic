import { useState } from "react";
import { CommentEditForm } from "./CommentEditForm";

export const Comments = ({id, user, comments, handleCommentEdit}) => {

    const [toggleEdit, setToggleEdit] = useState({});

    const handleEditToggle = (index) => {
        setToggleEdit((prev) => ({
            ...prev,
            [index]: !prev[index],
          }));
    }


    console.log(comments)
    const renderComment = () => {

        if(comments.length > 0) {
            return comments.map((c, index) => (
                <div key={index} style={styles.comment}>
                  {c.username != '' && c.comment != '' && <p><strong>{c.username}: </strong>{c.comment}</p>}
                  {/* to show image with comment */}
                  {c.image && <img src={c.image} alt="Comment" style={styles.commentImage} />}
                  {/**to show edit button if the user wrote the comment */}
                  {c.user_id == user.sub && <button onClick={handleEditToggle}>edit</button>} 
                  {toggleEdit[index] && <CommentEditForm user={user} id={id} comment={c} handleCommentEdit={handleCommentEdit} />}
                </div>
              ))
        } else {

            return <div>
                <p>No comments yet! Be the first and comment below :-)</p>
            </div>
        }
    }

    return (
        <>
        
            
        <div style={styles.commentsContainer}>
              <h4>Comments:</h4>
              {renderComment()}
              </div>
              <hr />
        
        
        </>
    )
}

const styles = {

    commentsContainer: {
        marginTop: '10px',
        //below is for writing in comments, i had to play around with it alot so we can remove some stuff if need be- sierra
      },
      comment: {
        backgroundColor: '#eee',
        padding: '5px',
        margin: '5px 0',
        borderRadius: '3px',
      }

}