import React, { useState } from 'react';
import postsData from "../assets/data/postData.json";

export const Posts = () => {
  const [posts, setPosts] = useState(postsData);
  
  const [newPost, setNewPost] = useState({
    name: '',
    title: '',
    description: '',
    interests: [],
    date: '',
    location: '',
    event_planned: false,
    image: null,
  });

  const handlePostSubmit = (e) => {
    e.preventDefault();

    const newPostId = posts.length + 1; 
    const postToSubmit = {
      id: newPostId,
      username: newPost.name, // for name
      ...newPost,
      comments: [],
      image: newPost.image ? URL.createObjectURL(newPost.image) : null, 
    };

    setPosts([postToSubmit, ...posts]); // adding new posts
    setNewPost({
      name: '',
      title: '',
      description: '',
      interests: [],
      date: '',
      location: '',
      event_planned: false,
      image: null,
    }); // to reset
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleInterestsChange = (e) => {
    const { value } = e.target;
    setNewPost((prevState) => ({
      ...prevState,
      interests: value.split(',').map((item) => item.trim()),
    }));
  };

  const handleEventChange = (e) => {
    setNewPost((prevState) => ({
      ...prevState,
      event_planned: e.target.value === 'yes',
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPost((prevState) => ({
        ...prevState,
        image: file,
      }));
    }
  };

  const handleCommentSubmit = (postId, comment) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, comment],
        };
      }
      return post;
    }));
  };

  return (
    <>
      <div style={styles.container}>
        {/* new posts*/}
        <div style={styles.newPostForm}>
          <h2>Create an Event!</h2>
          <form onSubmit={handlePostSubmit}>
            {/* display name */}
            <input
              type="text"
              name="name"
              placeholder="your display name"
              value={newPost.name}
              onChange={handleChange}
              style={styles.input}
              required
            />
            <input
              type="text"
              name="title"
              placeholder="Post Title"
              value={newPost.title}
              onChange={handleChange}
              style={styles.input}
              required
            />
            <textarea
              name="description"
              placeholder="Post Description"
              value={newPost.description}
              onChange={handleChange}
              style={styles.textarea}
              required
            />
            <input
              type="text"
              name="interests"
              placeholder="Interests (comma separated)"
              value={newPost.interests.join(', ')}
              onChange={handleInterestsChange}
              style={styles.input}
              required
            />
            <input
              type="date"
              name="date"
              value={newPost.date}
              onChange={handleChange}
              style={styles.input}
              required
            />
            {/* location? */}
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={newPost.location}
              onChange={handleChange}
              style={styles.locationInput}
              required
            />
            {/* event planned? yes or no options */}
            <div style={styles.centeredFormField}>
              <label>
                Event Planned:
                <select
                  name="event_planned"
                  value={newPost.event_planned ? 'yes' : 'no'}
                  onChange={handleEventChange}
                  style={styles.select}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </label>
            </div>

            {/* for image */}
            <div style={styles.imageUploadContainer}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={styles.fileInput}
              />
              {newPost.image && (
                <img
                  src={URL.createObjectURL(newPost.image)}
                  alt="Preview"
                  style={styles.imagePreview}
                />
              )}
            </div>

            <button type="submit" style={styles.button}>Submit Post</button>
          </form>
        </div>

        {/* Existing Posts */}
        {posts.map(post => (
          <div key={post.id} className="postContainer" style={styles.postContainer}>
            <h1 style={styles.username}>{post.username}</h1>
            <h2>{post.title}</h2>
            <p><strong>Interests:</strong> {post.interests.join(', ')}</p>
            <p><strong>Description:</strong> {post.description}</p>
            <p>{post.post}</p>
            <p><strong>Date:</strong> {post.date}</p>
            <p><strong>Location:</strong> {post.location}</p>
            <p><strong>Event Planned:</strong> {post.event_planned ? "Yes" : "No"}</p>

            {/* if there, showing image with post */}
            {post.image && <img src={post.image} alt="Post" style={styles.postImage} />}

            {/* Comments Section */}
            <div style={styles.commentsContainer}>
              <h4>Comments:</h4>
              {post.comments.map((comment, index) => (
                <div key={index} style={styles.comment}>
                  <p><strong>{comment.username}:</strong> {comment.comment}</p>
                  {/* to show image with comment */}
                  {comment.image && <img src={comment.image} alt="Comment" style={styles.commentImage} />}
                </div>
              ))}
              <CommentForm postId={post.id} onCommentSubmit={handleCommentSubmit} />
            </div>
            <hr />
          </div>
        ))}
      </div>
    </>
  );
};

const CommentForm = ({ postId, onCommentSubmit }) => {
  const [username, setUsername] = useState('');
  const [comment, setComment] = useState('');
  const [image, setImage] = useState(null);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (username && comment) {
      const newComment = {
        username,
        comment,
        image: image ? URL.createObjectURL(image) : null // Handle the image if it exists
      };
      

      onCommentSubmit(postId, newComment);

      // reset 
      setUsername('');
      setComment('');
      setImage(null);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <form onSubmit={handleCommentSubmit} style={styles.form}>
      <div className="input" style={styles.inputContainer}>
        <input
          type="text"
          placeholder="your display name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={styles.input}
        />
      </div>
      <textarea
        placeholder="add your comment here..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
        style={styles.textarea}
      />

      {/* upload input for image */}
      <div style={styles.imageUploadContainer}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={styles.fileInput}
        />
        {/*  preview of image */}
        {image && <img src={URL.createObjectURL(image)} alt="Preview" style={styles.imagePreview} />}
      </div>

      <button type="submit" style={styles.button}>Submit</button>
    </form>
  );
};
//trying to figure out the style we want for the comment section i just did, feel free if you want to change it up-Sierra

const styles = {
  container: {
    margin: '0 auto',
    padding: '20px',
    maxWidth: '800px',
  },
  newPostForm: {
    backgroundColor: '#ffffff', 
    padding: '20px', 
    borderRadius: '8px',
    marginBottom: '20px',
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
    backgroundColor: '#e6e6fa',
    color: '#000000',
    //background: 'linear-gradient(21deg, #d6c7e5, violet)', ** i like the look of this but it might be too much.
  },
  locationInput: {
    padding: '0.5em',
    borderRadius: '4px',
    backgroundColor: '#e6e6fa',
    marginBottom: '10px',
    textAlign: 'center', 
    color: '#000000',
  },
  eventPlannedContainer: {
    marginTop: '10px',
    color: '#000000',
  },
  centeredFormField: {
    textAlign: 'center',
    marginBottom: '10px',
  },
  select: {
    padding: '0.5em',
    borderRadius: '4px',
    backgroundColor: '#e6e6fa',
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
