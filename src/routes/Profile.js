/* eslint-disable import/no-anonymous-default-export */
import { authService } from "fb";
import { useHistory } from "react-router-dom";
import React from "react";

// export default () => <span>Profile</span>
// const Profile = () => <span>Profile</span>;   // 위와 같이 사용 가능하지만, 이렇게 하면 자동 import 됨
// export default Profile;

export default () => {
    const history = useHistory();
    
    const onLogoutClick = () => {
        authService.signOut();
        history.push("/");
    }
    
    return(
        <>
            <button onClick={onLogoutClick}>Log out  </button>
        </>
    );
};