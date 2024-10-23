import postsData from "../assets/data/postData.json"

export const Posts = () => {

    return(
        <>
        <div>
        {postsData.map(post => (
        <div key={post.id} className="postContainer">
          <h1 style={styles.username}>{post.username}</h1>
          <p><strong>Interests:</strong> {post.interests.join(', ')}</p>
          <p>{post.post}</p>
          <p><strong>Date:</strong> {post.date}</p>
          <p><strong>Location:</strong> {post.location}</p>
          <p><strong>Event Planned:</strong> {post.event_planned ? "Yes" : "No"}</p>
          <div style={styles.commentsContainer}>
            <h4>Comments:</h4>
            {post.comments.map((comment, index) => (
              <div key={index} style={styles.comment}>
                <p><strong>{comment.username}:</strong> {comment.comment}</p>
              </div>
             ))}
            </div>
            <hr />
            </div>
           ))}
         </div>
        </>
    )

}

const styles = {
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
    marginTop: '10px'
  },
  comment: {
    backgroundColor: '#eee',
    padding: '5px',
    margin: '5px 0',
    borderRadius: '3px'
  }
}
