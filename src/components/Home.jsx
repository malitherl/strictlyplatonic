
import mainImage from '../assets/images/mainImage.png';

import { Navigation } from "./Navigation";

import LoginButton from "./LoginButton";
import { Outlet } from 'react-router-dom';




export const Home = () => {

   


    
    return (
        <>
        <div>
          <img src={mainImage} alt= "Main pic" style={{width: 'auto', height: 'auto'}} />
            <h1 style={{color:"#65558f"}}>Strictly Platonic</h1>
              

                <LoginButton />
                <Navigation />  
                <Outlet />
           
              
        
        </div>

 
        
        </>
    )


}