import { useEffect, useState } from "react";
import { EditForm } from "./PostEditForm";
import { Comment } from './Comment';
import { CommentForm } from './CommentForm'; 
import { useUserInfo } from "../utils/userContext";
import { updateUserFriends } from '../services/user_services';
import '../index.css'
import { UserSnack } from "./UserSnack";



export const PostCard = ({post, id, user, handleCommentSubmit, postsData, removePost, handleEmojiClick, handleCommentEdit, handleCommentDelete}) => {

    const [title, setTitle] = useState(post.title);
    const [desc, setDesc] = useState(post.desc);
    const [image, setImage] = useState(post.image); 
    const [follow, setFollow] = useState(post.creator)
    const [toggleEdit, setToggleEdit] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showSnack, setShowSnack] = useState(false);
    const {userInfo, fetchData} = useUserInfo();

    const PostCardLoadingModal = () => {
      return (
          <div className='postContainer'>
              <div className='loader'>
              </div>
          </div>
      )
  }



    const toggleFollowModal = ()=> {
      if(isFollowing) {
        console.log('Unfollowing user');
        setIsFollowing(false);
        const update_friends = userInfo[0]["user_metadata"]["friends"].filter(u => u !== follow);
        console.log(update_friends);
        updateUserFriends(user.sub, update_friends);
        fetchData();
        
      } else {
        setIsFollowing(true);
        const friends = userInfo[0]["user_metadata"]["friends"];
        const new_friends = [...friends, follow];
        updateUserFriends(user.sub, new_friends);
        fetchData();
        console.log(userInfo);
        
      }
      
    }

    const toggleEditingModal = () => {
      let e = !toggleEdit;
      setToggleEdit(e);
    }

    const toggleDeletion = () => {
      removePost(id);
    }

    const toggleUserSnack = () => {
      let e = !showSnack; 
      setShowSnack(e);
    }


    // list of emojis feel free to change it up or add 
    const emojiList = ["👍", "❤️", "😂", "😊"];

    useEffect(() => {
      if(userInfo){
        setIsLoading(false);
        if(userInfo[0]["user_metadata"].friends && userInfo[0]["user_metadata"].friends.includes(post.creator)) {
          setIsFollowing(true);
        }
      }
    }, [userInfo]);








    return (
      <>
        {isLoading ? <PostCardLoadingModal /> : 

          <div key={id} className="postContainer" style={styles.postContainer}>
              <div className="user-header">
                <div onClick={toggleUserSnack}>
                  {post.creator_pic && (
                    <img className="profile-preview" src={post.creator_pic} alt={post.creator_pic} />
                  )}
                  <h4>{post.user_name}</h4>
                </div>
                {showSnack && <UserSnack userId= {post.creator} toggleUserSnack= {toggleUserSnack}/>}
                {isFollowing ? 
                  <a className='follow-button' onClick={toggleFollowModal}>Unfollow</a>
                  : 
                  <a className='follow-button' onClick={toggleFollowModal}>Follow</a>
                }
              </div>
              <div className="postMainContent">
              <hr />
              <h2>{title}</h2>
              {image && <img src={image} alt="Post" style={styles.postImage} />}
              <h3>
              <small style ={styles.date}>
                <strong>Date:</strong> {post.date}
              </small>
              </h3>
              <p>{desc}</p>
               {/* For emoji reactions for posts */}
               <div style={styles.emojiContainer}>
                {emojiList.map((emoji) => (
                  <button
                    key={emoji} onClick={() => handleEmojiClick(id, emoji)} style={styles.emojiButton}
                  >
                    {emoji}
                  </button>
                ))}
              </div>

              {/* Displaying the Reactions */}
              <div style={styles.reactionsContainer}>
                {post.reactions &&
                  Object.entries(post.reactions).map(([emoji, count]) => (
                    <span key={emoji} style={styles.reaction}>
                      {emoji} {count}
                    </span>
                  ))}
              </div>

              {post.creator == user.sub && 
              <div>
                <button onClick={toggleEditingModal}>Edit</button>
                <button onClick={toggleDeletion}>Delete</button>
              </div>}
              {toggleEdit && <EditForm post={post} id={id} user={user} postsData={postsData} 
                setTitle={setTitle} setDesc={setDesc} setImage={setImage} setToggleEdit={setToggleEdit} />}
              <div style={styles.commentsContainer}>
              {post.comments.length > 0 && 
                  post.comments.map((commentObj) => {
                    console.log(commentObj);

                    return <Comment user={user} id={id} comment={commentObj} handleCommentEdit={handleCommentEdit} handleCommentDelete= {handleCommentDelete} />
                    
                  })    
                }
                <CommentForm
                    user={user}
                    postId={id}
                    handleCommentSubmit={(i, c) => handleCommentSubmit(i, c)}
                   />

                
                
              </div>
              </div>
            </div>


        }
        
        </>
    )

}



const styles = {
  container: {
    margin: '0 auto',
    maxWidth: '800px',
  },
  
  commentsContainer: {
    marginTop: '10px',
    //below is for writing in comments, i had to play around with it alot so we can remove some stuff if need be- sierra
  },
  postContainer: {
    border: '2px solid #ddd',
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
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
  emojiContainer: {
    marginTop: '10px',
  },
  emojiButton: {
    fontSize: '20px',
    margin: '5px',
    background: 'linear-gradient(21deg, #d6c7e5, violet)',
    border: 'none',
    cursor: 'pointer',
  },
  reactionsContainer: {
    marginTop: '10px',
    fontSize: '16px',
    textAlign: 'center'
  },
  reaction: {
    marginRight: '10px',
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
