import { Outlet } from 'react-router-dom';
import mainImage from '../assets/images/mainImage.png';

function App() {



  return (

    <div className='app-content'>
      <div className='intro'>
       <img id="banner" src={mainImage} alt= "Main pic" style={{width: 'auto', height: 'auto'}} />
        <h1 style={{color:"#65558f"}}>Strictly Platonic</h1>
      </div>
      

      <Outlet />
     
      



    </div>
              
  )
}

export default App
