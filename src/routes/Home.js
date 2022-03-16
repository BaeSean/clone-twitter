// Home 구성(실시간 Tweet, Tweet 작성)
// router의 기능(화면)만 구성
import { dbService } from "fb";
import React, { useEffect, useState } from "react";
import Tweet from "components/Tweet"
import Factory from "components/Factory";

const Home = ({ userObj }) => {
    const [tweets, setTweets] = useState([]);

    // const getTweets = async () => {
    //     const dbTweets = await dbService.collection("tweets").get();
    //     dbTweets.forEach((document) => {
    //         const tweetObj = {
    //             ...document.data(),
    //             id: document.id,
    //         };
    //         setTweets((prev) => [tweetObj, ...prev]);
    //     })
    // }

    useEffect(() => {
        // getTweets(); // snaptop으로 실시간 change get
        dbService.collection("tweets").orderBy("createdAt", "desc").onSnapshot(snapshot => {
            const tweetArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTweets(tweetArray);
        })
    }, [])


    return (
        <div>
            <Factory userObj={userObj} />
            <div>
                {tweets.map((tweet) => (
                    <Tweet key={tweet.id} tweetObj={tweet} isOwner={userObj.uid === tweet.creatorId}></Tweet>
                ))}
            </div>
        </div>
    );
};

export default Home;