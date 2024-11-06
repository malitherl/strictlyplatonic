import { useState, useEffect } from "react"
import userData from "../assets/data/users.json"
import { retrieveUserList } from "../services/user_services";

const UserProfile = () => {


  const [userList, setUserList] = useState([]);
  //To do: make another custom hook to persist this data through the entire application and not just here. 
  useEffect(() => {

    const fetchUsers = async() => {
      const u = await retrieveUserList();
      setUserList(u);
      return u;
    }
    try {
      fetchUsers();

    } catch (error) {
      console.log(error);
    }


  }, []);

  console.log(userList);

  //This function maps the social media icons of the user to the appropriate icons
   const socialMediaIcons = (social, socialSitesObject) => {
      //socialSitesObject will be received as a JavaScript object
      console.log(`/images/icons/${social}.svg`)
      if (social){
        return <a href={socialSitesObject[social]}>
                  <img src={`/src/assets/images/icons/${social}.svg`} style={{height: "16px", width: "16px"}} alt="" /> 
                </a>

      } 
      
   }


   return (
    <div>
        {userList.length > 0 && (
            <div>
                {userList.map((user) => (
                    <div key={user.posts} style={styles.userCard}>
                        <img 
                            src={user.picture} 
                            alt={`${user.username}'s profile`} 
                            style={styles.profilePicture} 
                        />
                        <h3>{user.name} (@{user.username})</h3>
                        
                        
                        {user.user_metadata && Object.values(user.user_metadata).length > 0 && (
                          
                            <div>
                              {user.user_metadata.bio && <p><strong>Bio:</strong> {user.user_metadata.bio}</p> }
                                

                                {user.user_metadata.socials && Object.keys(user.user_metadata.socials[0]).map((social) => 
                                    socialMediaIcons(social, user.user_metadata.socials[0])
                                )}
                                <p><strong>Hobbies:</strong> {user.user_metadata.hobbies.join(', ')}</p>
                                <p><strong>Friends:</strong> {user.user_metadata.friends ? "Yes" : "No"}</p>
                                
                                <div>
                                    <hr />
                                    <h3>Weekly Schedule</h3>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Time</th>
                                                <th>Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {user.user_metadata.schedule.map((i, index) => (
                                                <tr key={index}>
                                                    <td>{i.date}</td>
                                                    <td>{i.time}</td>
                                                    <td>{i.description}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
                <hr />
            </div>
        )}
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