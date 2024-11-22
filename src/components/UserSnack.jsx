import { useEffect, useState } from "react"
import { fetchDataById } from '../services/user_services';
import close from '../assets/images/icons/close.svg';

export const UserSnack = ({userId, toggleUserSnack}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState({});


    useEffect(() => {
        const retrieveData = async () => {
            const data = await fetchDataById(userId);
            setUserData(data);
        }
        try {
            retrieveData();
        } catch (error) {
            alert('Uh oh! User data could not be found');
        }

    }, []);
    
    useEffect(() => {
        if(Object.values(userData).length > 0) {
            setIsLoading(false);
            console.log(userData)
        }
    }, [userData]);


    const socialMediaIcons = (social, socialSitesObject) => {
        //socialSitesObject will be received as a JavaScript object
        console.log(`/images/icons/${social}.svg`)
        if (social){
          return <a href={socialSitesObject[social]}>
                    <img src={`/src/assets/images/icons/${social}.svg`} style={{height: "16px", width: "16px"}} alt="" /> 
                  </a>
  
        } 
        
     }
    

    const UserSnackLoadingModal = () => {
        return (   
            <div className='loader'>
            </div>
        )
    }


    return (
        <div className='userSnackContainer'>
            {isLoading ? <UserSnackLoadingModal /> : 
            <div> 
                <button id="exit_button" onClick={toggleUserSnack}><img src={close} alt="an exit toggle"/></button> 
                
                <div key={userData.sub} style={styles.userCard}>
                        <img  
                            src={userData.user_metadata ? userData.user_metadata.picture : userData.picture} 
                            alt={`${userData.username}'s profile`} 
                            style={styles.profilePicture} 
                        />
                        <h3>{userData.name} (@{userData.username})</h3>
                        
                        
                        {userData.user_metadata && Object.values(userData.user_metadata).length > 0 && (
                          
                            <div>
                              {userData.user_metadata.bio && <p><strong>Bio:</strong> {userData.user_metadata.bio}</p> }
                                

                                {userData.user_metadata.socials && Object.values(userData.user_metadata.socials).length > 0 && Object.keys(userData.user_metadata.socials[0]).map((social) => 
                                    socialMediaIcons(social, userData.user_metadata.socials[0])
                                )}
                                {userData.user_metadata.hobbies && <p><strong>Hobbies:</strong> {userData.user_metadata.hobbies.join(', ')}</p>}
                                {userData.user_metadata.hobbies && <p><strong>Friends:</strong> {userData.user_metadata.friends ? "Yes" : "No"}</p>}
                                {userData.user_metadata.friends ? 
                                
                                <div >
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
                                            {userData.user_metadata.schedule && userData.user_metadata.schedule.map((i, index) => (
                                                <tr key={index}>
                                                    <td>{i.date}</td>
                                                    <td>{i.time}</td>
                                                    <td>{i.activity}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div> 
                                : <div></div>
                                }
                            </div>
                        )}
                    </div>
            </div>}
        </div>
    )

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

