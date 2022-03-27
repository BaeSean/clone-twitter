// create Tweet(text, attachment)
import { dbService, storageService } from "fb";
import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const Factory = ({ userObj }) => {
    const [tweet, setTweet] = useState("");
    const [attachment, setAttachment] = useState("");

    const onSubmit = async (event) => {
        if (tweet === "") return;
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

    const onClearAttachment = () => setAttachment("");


    return (
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
                <input
                    className="factoryInput__input"
                    value={tweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120} />
                <input type="submit" value="&rarr;" className="factoryInput__arrow" />
            </div>
            <label for="attach-file" className="factoryInput__label">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input id="attach-file"
                type="file"
                accept="image/*"
                onChange={onFileChange}
                style={{ opacity: 0, }}
            />
            {
                attachment &&
                <div className="factoryForm__attachment">
                    <img
                        src={attachment}
                        style={{
                            backgroundImage: attachment,
                        }}
                    />
                    <div className="factoryForm__clear" onClick={onClearAttachment}>
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
            }
        </form>
    )
}


export default Factory;