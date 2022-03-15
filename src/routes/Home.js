import { dbService } from "fb";
import React, { useEffect, useState } from "react";
import Tweet from "components/Tweet"

const Home = ({ userObj }) => {
    const [tweet, setTweet] = useState("");
    const [tweets, setTweets] = useState([]);
    const [attachment, setAttachment] = useState();

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


    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("tweets").add({
            text: tweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            photoURL: userObj.photoURL,
        });
        setTweet("")
    };
    const onChange = (event) => {
        const { target: { value }, } = event;
        setTweet(value);
    };

    const onFileChange = (event) => {
        const { target: { files }, } = event;
        const file = files[0];

        const reader = new FileReader();  // File read API
        reader.onloadend = (finishedEvent) => {
            const { currentTarget: { result } } = finishedEvent;
            setAttachment(result);
        }
        reader.readAsDataURL(file);
    }
    const clearImg = () => setAttachment(null);

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    value={tweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120} />
                <input type="submit" value="Tweet" />
                <input type="file" accept="image/*" onChange={onFileChange} />
                {
                    attachment &&
                    <div>
                        <img src={attachment} width="150px" height="150px" />
                        <button onClick={clearImg}>Clear</button>
                    </div>
                }
            </form>
            <div>
                {tweets.map((tweet) => (
                    <Tweet key={tweet.id} tweetObj={tweet} isOwner={userObj.uid === tweet.creatorId}></Tweet>
                ))}
            </div>
        </div>
    );
};

export default Home;