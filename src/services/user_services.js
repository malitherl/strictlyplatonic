import axios from "axios";

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






export const updateUserInformation = ({id}) => {
  
/** 
 * This function will take changes that the user makes on their profile 
 * and uploads them through this API endpoint.  
 * 
 * 
 * TO FINISH next sprint
 */

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `Bearer ${import.meta.env.AUTH_API_KEY}`);

  var raw = JSON.stringify({
    //Here we will insert information to update the user's info
    "user_metadata": {
      "hobbies": {},
      "schedule": {},
      "friends": {}
    }
  });

  var requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch(`https://${import.meta.env.VITE_AUTH_DOMAIN_ID}/api/v2/users/${id}`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}