

export const Login = () => {

    const handleSubmit = () => {
        console.log("Submit")
    }

   return (
    <>
    
    
      <form>
        
         <label htmlFor="Email">
            <p>Email</p>
         </label>
         <input name="Email" type="text" />
         <label htmlFor="Password"><p>Password</p></label>
         <input name= "Password" type="text" />
         <button onClick={handleSubmit()}></button>
         
     </form>
    
    
    </>


   )


}