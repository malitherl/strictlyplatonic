import React, { useEffect, useState } from 'react';
import { Post } from '../services/post_services';
import { Comments } from './Comments';
import { CommentForm } from './CommentForm';
import { render } from '@testing-library/react';

// Removed duplicate styles declaration
export const Posts = ({user}) => {
  const [posts, setPosts] = useState([]);
  const [index, setIndex] = useState(0);
  const [postIds, setPostIds] = useState([]);
  const [loading, setLoading] = useState(true);

  // creating new post
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostDesc, setNewPostDesc] = useState('');
  const [newPostImage, setNewPostImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const postsData = new Post();

  useEffect(() => {
    const fetchPosts = async () => {
      const savedPosts = localStorage.getItem('posts'); //get posts if found
      if (savedPosts) {
        setPosts(JSON.parse(savedPosts));
        return;
      }
      const p = await postsData.getPostsData(); /// get posts data
      setPostIds(p[0]);
      setPosts(p[1]);
    };
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

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (newPostTitle.trim() === '' || newPostDesc.trim() === '') {
      alert('Please put in a title and a description.');
      return;
    }
    const editModal = (creator_id, user_id) => {
      console.log(creator_id)
      console.log(user_id)
      return creator_id == user_id ? <button onClick={() => handlePostEdit()}><p>edit</p></button> : '';
    }

    const newPost = {
      title: newPostTitle,
      desc: newPostDesc,
      creator: user.sub,
      creator_pic: user.picture, 
      date: new Date().toLocaleString(),
      image: newPostImage ? URL.createObjectURL(newPostImage) : '',
      comments: [],
    };

    const newPostIds = [...postIds, newPost];
    setPosts([...posts, newPost]);
    setPostIds(newPostIds);
    const updatedPosts = [...posts, newPost];
    localStorage.setItem('posts', JSON.stringify(updatedPosts)); // save to local storage

    // reset form
    setNewPostTitle('');
    setNewPostDesc('');
    setNewPostImage(null);
    setImagePreview(null);

    // for to save new post
    postsData.addPost(newPost); 
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
   if (file) {
     setNewPostImage(file);
     setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleCommentSubmit = async (postId, comment) => {
    const updatedPosts = posts.map((post) => {
      if (postIds[posts.indexOf(post)] === postId) {
        return {
          ...post,
          comments: [...post.comments, comment],
        };
      }
       
      return post;
    });
    setPosts(updatedPosts);

    // to save comment
    postsData.addComment(postId, comment);

    console.log(comment);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  
return (
    <>
      <div style={styles.container}>
        <div style={styles.postContainer}>
          <h2>create a new post!</h2>
          <form onSubmit={handlePostSubmit}>
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
              Submit Post
            </button>
          </form>
        </div>

        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div key={postIds[index]} className="postContainer" style={styles.postContainer}>
              <div className="user-header">
                {post.creator_pic && (
                  <img className="profile-preview" src={post.creator_pic} alt={post.creator_pic} />
                )}
                <h4 style={styles.username}>{post.user_name}</h4>
                <a className='follow-button' href="#">Follow</a>
              </div>
              <hr />
              <h2>{post.title}</h2>
              {post.image && <img src={post.image} alt="Post" style={styles.postImage} />}
              <h3>
              <small style ={styles.date}>
                <strong>Date:</strong> {post.date}
              </small>
              </h3>
              <p>{post.desc}</p>
            
             
              {/* of there, showing image with post */}
              
              {/* Comments Section */}
              <div>
                <Comments comments={post.comments} />
                <CommentForm
                  user={user}
                  postId={postIds[index]}
                  handleCommentSubmit={handleCommentSubmit}
                />
              </div>
            </div>
          ))
        ) : (
          <div>No data found</div>
        )}
      </div>
    </>
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

export default Posts;
