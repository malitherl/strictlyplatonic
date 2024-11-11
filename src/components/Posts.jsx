import React, { useEffect, useState } from 'react';
import { Post } from '../services/post_services';
import { Comments } from './Comments';
import { CommentForm } from './CommentForm';

// Removed duplicate styles declaration
export const Posts = ({user}) => {
  const [posts, setPosts] = useState([]);
  const [index, setIndex] = useState(0);
  const [postIds, setPostIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [discussionThreads, setDiscussionThreads] = useState([]); // discussion threads
  const [newThread, setNewThread] = useState(''); // discussion thread input

  const postsData = new Post();


  useEffect(() => {
    const fetchPosts = async () => {
      const p = await postsData.getPostsData();
      
      setPostIds(p[0]);
      setPosts(p[1]);
    }
    try {
      fetchPosts(); 
      console.log('Posts fetched!');
      console.log(posts);
      console.log(postIds);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false); 
    }
  }, []);




 if (loading) {
    return <div>Loading...</div>;
 }

  const handleCommentSubmit = async (postId, comment) => {
     let index = 0;
     const newPosts = posts.map((post, i) => {
       if (postIds[i] === postId) {
         setIndex(i);
         return {
           ...post,
           comments: [...post.comments, comment],
         };
       }
       
       return post;
     });
     setPosts(newPosts);  
     console.log(comment);
     postsData.addComment(postId, comment);
     postsData.updatePosts(newPosts[0], postId, user.sub)
     
  
  };
  
    // for thread submission
    const handleThreadSubmit = (event) => {
      event.preventDefault();
      if (newThread.trim() !== '') {
          console.log(newThread);
          const updatedThreads = [...discussionThreads, newThread];
          setDiscussionThreads(updatedThreads);
          localStorage.setItem('discussionThreads', JSON.stringify(updatedThreads)); 
          setNewThread(''); 
          //Insert post creation function here;
          //postData.create
      }
  };

  return (
    <>
      <div style={styles.container}>
        {
          posts ? 
            <div>
              <div style={styles.postContainer}>
                    <h2>What is on your mind?</h2>
                    <form onSubmit={handleThreadSubmit}>
                        <textarea
                            value={newThread}
                            onChange={(e) => setNewThread(e.target.value)}
                            placeholder="type whats on your mind here..."
                            rows="3"
                            style={{ width: '100%' }}
                        ></textarea>
                        <button type="submit">Post Your Thread</button>
                    </form>
                    <div>
                        {discussionThreads.map((thread, index) => (
                            <div key={index} style={styles.threadContainer}>
                                <p>{thread}</p>
                            </div>
                        ))}
                    </div>
                </div>
          { posts.map((post, index) => (
            <div key={postIds[index]} className="postContainer" style={styles.postContainer}>
              <div className='user-header'>
                {post.creator_pic && <img className="profile-preview" src={post.creator_pic} alt={post.creator_pic}/>}
                <h4 style={styles.username}>{post.user_name}</h4>
                <a className='follow-button' href="#">Follow</a>
              </div>
              <hr />
              <h2>{post.title}</h2>
              <small><strong>Date:</strong> {post.date}</small>
              <p>{post.desc}</p>
            

              {/* of there, showing image with post */}
              {post.image && <img src={post.image} alt="Post" style={styles.postImage} />}
              <Comments comments= {post.comments} /> 
              <CommentForm user={user} postId={postIds[index]} handleCommentSubmit={(i, c) => handleCommentSubmit(i, c)} /> 
          </div>
          ))}
        </div> 
        : 
        <div>No data found</div>
        

        }
               
                
      </div>
    </>
  );
};

//trying to figure out the style we want for the comment section i just did, feel free if you want to change it up-Sierra

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

export default Posts;
