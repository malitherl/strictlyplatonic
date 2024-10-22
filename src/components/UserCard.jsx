
import LogoutButton from "./LogoutButton";

const UserCard = ({handleClick, user}) => {




    return (
        <div className="userCardContainer">
            
            <img src={user.picture} alt={user.name} />
            <h2>{user.nickname}</h2>
            <p>{user.email}</p>
            <hr />
            <div onClick={() => {handleClick("myprofile")}} >
                <h3>Edit Profile</h3>
            </div>
            <hr />
            <div onClick={() => {handleClick("userprofile")}}>
                <h3>Near You</h3>
            </div>
    
            <hr />
            <LogoutButton />
        </div>


    )



}

export default UserCard; 