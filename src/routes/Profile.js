/* eslint-disable import/no-anonymous-default-export */
import { authService, dbService } from "fb";
import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";


// export default () => <span>Profile</span>
// const Profile = () => <span>Profile</span>;   // 위와 같이 사용 가능하지만, 이렇게 하면 자동 import 됨
// export default Profile;

export default ({ userObj, refreshUser }) => {
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const history = useHistory();

    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    }

    const getMyTweets = async () => {
        // const myTweets = await dbService.collection("tweets").where("creatorId", "==", authService.currentUser.uid).get();
        // console.log(myTweets.docs.map((doc) => doc.data()));

        const myTweets = await dbService.collection("tweets").where("creatorId", "==", userObj.uid).get();
        // console.log(myTweets.docs.map((doc) => doc.data()));
        return myTweets;
    }

    const onChange = (event) => {
        const { target: { value } } = event;
        setNewDisplayName(value);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({
                displayName: newDisplayName,
                photoURL: userObj.photoURL,
            });
        }
        refreshUser();
    }

    useEffect(() => {
        getMyTweets();
    }, [])

    return (
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input onChange={onChange} value={newDisplayName} type="text" autoFocus placeholder="Display Name" className="formInput"
                />
                <input
                    type="submit"
                    value="Update Profile"
                    className="formBtn"
                    style={{
                        marginTop: 10,
                    }}
                />
            </form>
            <div>
            </div>
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
                Log Out
            </span>
        </div>
    );
};
