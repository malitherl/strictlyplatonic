import { Posts } from "./Posts"

import { useEffect } from "react";
import { Navigate } from "react-router-dom";


export const Home = () => {

    //pass session token props here. For now, we're just going to have it stored as a variable. 
    
    //if you would like to work on the Posts page, change this sessionTokeValid variable to equal true. 
    //and if you would like to work on the Login form, change this to false and the page will redirect you there :)
    let sessionTokeValid = true;
    
    


    return (
        <>
        <div>
            <h1>Strictly Platonic x2</h1>
              <main>
        
                {sessionTokeValid ? <Posts/> : <Navigate to={"/login"}/> }



              </main>
        </div>


        
        
        </>
    )


}