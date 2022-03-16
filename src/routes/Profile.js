/* eslint-disable import/no-anonymous-default-export */
import { authService, dbService } from "fb";
import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Tweet from "components/Tweet"


// export default () => <span>Profile</span>
// const Profile = () => <span>Profile</span>;   // 위와 같이 사용 가능하지만, 이렇게 하면 자동 import 됨
// export default Profile;

export default ({ userObj, refreshUser }) => {
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const history = useHistory();

    const onLogoutClick = () => {
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
        if(userObj.displayName !== newDisplayName){
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
        <>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} value={newDisplayName} type="text" placeholder="Display Name" />
                <input type="submit" vlaue="Update Profile" />
            </form>
            <div>
            </div>
            <button onClick={onLogoutClick}>Log out  </button>
        </>
    );
};

//import { collection, getDocs, query, where } from "@firebase/firestore";
//
// const getMyTweets = async () => {
//     const q = query(
//         collection(dbService, "tweets"),
//         where("creatorId", "==", `${userObj.uid}`)
//     )
//     const querySnapshot = await getDocs(q);
//     querySnapshot.docs.map((doc) => {
//         console.log(doc);
//     });
// }