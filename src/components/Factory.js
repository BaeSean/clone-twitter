// create Tweet(text, attachment)
import { dbService, storageService } from "fb";
import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const Factory = ({ userObj }) => {
    const [tweet, setTweet] = useState("");
    const [attachment, setAttachment] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        // await dbService.collection("tweets").add({
        //     text: tweet,
        //     createdAt: Date.now(),
        //     creatorId: userObj.uid,
        //     photoURL: userObj.photoURL,
        // });
        // setTweet("")  // only for tweet text
        let attachmentURL = "";
        if (attachment !== "") {
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);  // generate random id (uuid)
            const respone = await attachmentRef.putString(attachment, "data_url");  // store img(putString) in Storage
            attachmentURL = (await respone.ref.getDownloadURL());
        }
        const tweetObj = {
            text: tweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentURL  // key는 변수명으로 되는듯
        }
        await dbService.collection("tweets").add(tweetObj);

        setTweet("");
        setAttachment("");
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
    const clearImg = () => setAttachment("");


    return (
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
                    <img src={attachment} width="150px" height="150px" alt="img" />
                    <button onClick={clearImg}>Clear</button>
                </div>
            }
        </form>
    )
}


export default Factory;