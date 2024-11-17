import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Post } from '../services/post_services';
import { Comments } from './Comments';
import { CommentForm } from './CommentForm';
import { useUserInfo } from '../utils/userContext';


// Removed duplicate styles declaration
export const Posts = ({user}) => {
  const [posts, setPosts] = useState([]);
  const [postIds, setPostIds] = useState([]);
  const [loading, setLoading] = useState(true);

  const {userPicture} = useUserInfo();
  
  // creating new post
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostDesc, setNewPostDesc] = useState('');
  const [newPostImage, setNewPostImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');

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

  const editModal = (creator_id, user_id) => {

    return creator_id == user_id ? <button onClick={() => handlePostEdit()}><p>edit</p></button> : '';
  }


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
        //Upon receiving the url from cloudinary, we then give this information to the auth0 database 
        setNewPostImage(response.data.secure_url);
        alert("Image uploaded successfully!");
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image");
      }
    }




    const newPost = {
      title: newPostTitle,
      desc: newPostDesc,
      creator: user.sub,
      creator_pic: userPicture,
      date: new Date().toLocaleString(), //this is for display purposes
      time: Date.now(), //this is different from the 'date' field because this determines the exact moment the post was made.
      image: newPostImage ? newPostImage : '',
      type: newPostImage ? 'text/image' : 'text',
      comments: [],
      reactions: {},
    };

    setPosts([...posts, newPost]);

    const updatedPosts = [...posts, newPost];
    localStorage.setItem('posts', JSON.stringify(updatedPosts)); // save to local storage

    // reset form
    setNewPostTitle('');
    setNewPostDesc('');
    setNewPostImage('');
    setImagePreview('');

    // for to save new post
    const newPostId = await postsData.createPost(newPost);
    setPostIds([...postIds, newPostId]);
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

  // list of emojis feel free to change it up or add 
  const emojiList = ["👍", "❤️", "😂", "😊"];

  // for clicking emoji
  const handleEmojiClick = (postId, emoji) => {
    const updatedPosts = posts.map((post) => {
      if (postIds[posts.indexOf(post)] === postId) {
        const updatedReactions = { ...post.reactions };
        updatedReactions[emoji] = updatedReactions[emoji] ? updatedReactions[emoji] + 1 : 1;
        return {
          ...post,
          reactions: updatedReactions,
        };
      }
      return post;
    });

    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
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
              Post
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

              {/* For emoji reactions for posts */}
              <div style={styles.emojiContainer}>
                {emojiList.map((emoji) => (
                  <button
                    key={emoji} onClick={() => handleEmojiClick(postIds[index], emoji)}style={styles.emojiButton}
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

              {editModal(post.creator, user.sub)}

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

export default Posts;
    