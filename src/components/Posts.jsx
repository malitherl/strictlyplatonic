import postsData from '/StrictlyPlatonic/postData.json';

export const Posts = () => {

    return(
        <>
        <div>
        {postsData.map(post => (
        <div key={post.id} style={styles.postContainer}>
          <h3>{post.username}</h3>
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