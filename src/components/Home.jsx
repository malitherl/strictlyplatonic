
import mainImage from '../assets/images/paperdolls.png';

import { Navigation } from "./Navigation";

import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { Outlet } from 'react-router-dom';




export const Home = () => {

   


    
    return (
        <>
        <div>
          <img src={mainImage} alt= "Main pic" style={{width: '100%', height: 'auto'}} />
            <h1 style={{color:"#65558f"}}>Strictly Platonic</h1>
              

                <LoginButton />
               <Navigation />  
                
                <Outlet />
           
              
        
        </div>

 
        
        </>
    )


}