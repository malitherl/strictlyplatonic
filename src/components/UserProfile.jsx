import userData from "../assets/data/users.json"


const UserProfile = () => {


    return(
        <div>
        {Object.values(userData.users).map((user) => (
            <div key={user.posts} style={styles.userCard}>
            <img 
                src={user.picture} 
                alt={`${user.username}'s profile`} 
                style={styles.profilePicture} 
            />
            <h3>{user.name} (@{user.username})</h3>
            <p><strong>Bio:</strong> {user.bio}</p>
            <p><strong>Hobbies:</strong> {user.hobbies.join(', ')}</p>
            <p><strong>Friends:</strong> {user.friends ? "Yes" : "No"}</p>
           

            {
              
            user.scheduleViewable &&


            
            <div>
            <hr />
            <h3>Weekly Schedule</h3>
            <table>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Description</th>
              </tr>
            
              { user.schedule.map((i) => <tr><td>{i.date}</td><td>{i.time}</td><td>{i.description}</td></tr>)}

            </table>
            
            </div>
            }
            </div>
         ))}
        </div>
      );
    
}


const styles = {
    userCard: {
      border: '1px solid #ddd',
      padding: '10px',
      marginBottom: '20px',
      borderRadius: '5px',
      backgroundColor: '#f9f9f9'
    },
    profilePicture: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      objectFit: 'cover',
      marginBottom: '10px'
    }
  };

  export default UserProfile;