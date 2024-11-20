import axios from "axios";
import {Post} from './post_services';

const retrieveToken = async () => {
  
  const body = {
                                                                               
      headers: {'content-type': 'application/json', 'Access-Control-Allow-Origin': `https://${import.meta.env.VITE_AUTH_DOMAIN_ID}`},
      client_id: import.meta.env.VITE_AUTH_API_EXPLORER_ID, 
      client_secret: import.meta.env.VITE_AUTH_API_EXPLORER_SECRET,
      grant_type: "client_credentials", 
      audience: import.meta.env.VITE_AUTH_API_AUDIENCE
    }
  
  try {
                                               
    const response = await axios.post(`https://${import.meta.env.VITE_AUTH_DOMAIN_ID}/oauth/token`, body)
    const token = response.data
    return token
  } catch (error) {
    console.error('Error:', error.message);
  }

  
  return token
}

export const retrieveUserInfo = async (email_input) => {
  /** 
   * This function takes the user's email and retrieves relevant information 
   * about their profile through the GET user API endpoint. 
   * 
   * This includes the user ID which we persist through the application to 
   * have access to the other API endpoints. 
   * 
   * 
   */
  let id; 
  const [email_name, email_provider] = email_input.split("@")
  

  try {
    const token = await retrieveToken();
 
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://${import.meta.env.VITE_AUTH_DOMAIN_ID}/api/v2/users-by-email?email=${email_name}%40${email_provider}`,
      headers: { 
        'Accept': 'application/json', 
        'Authorization': "Bearer " + token["access_token"] 
      }
    };

 
    const response = await axios.request(config)

    return response.data;
    
   } catch (error){
      console.log(error);
      return null;
   }
} 


export const retrieveUserList = async () => {

  /** 
   * This function will retrieve the users from the user management database
   * 
   */

  try {

    const token = await retrieveToken();
 
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://${import.meta.env.VITE_AUTH_DOMAIN_ID}/api/v2/users`,
      headers: { 
        'Accept': 'application/json', 
        'Authorization': "Bearer " + token["access_token"] 
      }
    };
    const response = await axios.request(config)
    //this will be our list of users
    return response.data;

  
  } catch (error){
    console.log(error);
    return null;
 }


}



export const updateUserSchedule = async (id, data) => {
  
/** 
 * This function will take changes that the user makes on their profile 
 * and uploads them through this API endpoint.  
 * 
 * PARAMETERS: 
 * 
 * id: this is identifies the current user, and corresponds to the user_id as saved in the user management database
 * 
 * data: this is a mapping object that is taken and modified into a JSON object. Example format: 
 
 *  
 * 
 */


  try {

    const token = await retrieveToken();

    let config = {
      method: 'patch',
      maxBodyLength: Infinity,
      url: `https://${import.meta.env.VITE_AUTH_DOMAIN_ID}/api/v2/users/${id}`,
      headers: { 
        'Accept': 'application/json', 
        'Authorization': "Bearer " + token["access_token"] 
      },
      data: {
        "user_metadata": {
        "schedule": [...data]
      }}
    };

    axios.request(config)
      .then((response) => {
        return response.data;
      }).catch((error) => {
        console.log(error);
      });

    } catch (error) {
      console.log(error)
    }

}



export const updateUserPicture = async (id, url) => {
  
  /** 
   * This function will take changes that the user makes on their profile 
   * and uploads them through this API endpoint.  
   * 
   * PARAMETERS: 
   * 
   * id: this is identifies the current user, and corresponds to the user_id as saved in the user management database
   * 
   * data: this is a mapping object that is taken and modified into a JSON object. Example format: 
   * 
   */
   if(url) {
    console.log(url);
    try {
  
      const token = await retrieveToken();
  
      let config = {
        method: 'patch',
        maxBodyLength: Infinity,
        url: `https://${import.meta.env.VITE_AUTH_DOMAIN_ID}/api/v2/users/${id}`,
        headers: { 
          'Accept': 'application/json', 
          'Authorization': "Bearer " + token["access_token"] 
        },
        data: {
          "user_metadata": {
          "picture": `${url}`
        }}
      };
      
      axios.request(config)
        .then((response) => {
          return response.data;
        }).catch((error) => {
          console.log(error);
        });
      //after this, we also need to create a function that will change 
      //post profile pictures as well. which means we will have to make 
      //a call to the posts_services and go by user_id there as well 
      
    } catch (error) {
      console.log(error);
    }
    }
  }

  export const updateUserInfo = async (id, updated_data) => {
  
    /** 
     * This function will take changes that the user makes on their profile 
     * and uploads them through this API endpoint.  
     * 
     * PARAMETERS: 
     * 
     * id: this is identifies the current user, and corresponds to the user_id as saved in the user management database
     * 
     * data: this is a mapping object that is taken and modified into a JSON object. Example format: 
     
     *  
     * 
     */
     const {name, bio, hobbies} = updated_data;
     console.log()
    
      try {
    
        const token = await retrieveToken();
    
        let config = {
          method: 'patch',
          maxBodyLength: Infinity,
          url: `https://${import.meta.env.VITE_AUTH_DOMAIN_ID}/api/v2/users/${id}`,
          headers: { 
            'Accept': 'application/json', 
            'Authorization': "Bearer " + token["access_token"] 
          },
          data: {
            "name": name,
            "user_metadata": { 
              "bio": bio,
              "hobbies": hobbies
            }
          },
        };
    
        axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
          }).catch((error) => {
            console.log(error);
          });
          const p = new Post();
          try {
            const push_to_posts= await p.updatePostName(id, name);
            
          } catch (error) {
            console.log(error);
          }
        } catch (error) {
          console.log(error)
        }
    
    }
    




