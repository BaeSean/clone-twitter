import { dbService } from "fb";
import React, { useState } from "react";

const Tweet = ({ tweetObj, isOwner }) => {
    const [editmode, setEditmode] = useState(false);
    const [newTweet, setNewTweet] = useState(tweetObj.text);

    const onDeleteClick = () => {
        const ok = window.confirm("Are you sure you want to delete this tweet?");
        if (ok) {
            dbService.doc(`tweets/${tweetObj.id}`).delete();
        }  // 파일시스템의 구조와 비슷하게 사용(firestore)
    }
    const toggleEdit = () => {
        setEditmode((prev) => !prev);
        //setNewTweet("");

    };
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`tweets/${tweetObj.id}`).update({text:newTweet});
        // setNewTweet("");
        setEditmode(false);
    };
    const onChange = (event) => {
        const {target: {value}} = event;
        setNewTweet(value);
    };

    return (
        <div>
            <h4>{tweetObj.text}</h4>
            {
                editmode ?
                    <>
                        <form onSubmit={onSubmit}>
                            <input type="text" placeholder="Update what?" 
                            onChange={onChange} 
                            value={newTweet} required />
                            <input type="submit" value="Update" />
                        </form>
                        <button onClick={toggleEdit}>Cancle</button>
                    </>
                    :
                    <>
                        {isOwner && (
                            <>
                                <button onClick={toggleEdit}>Edit</button>
                                <button onClick={onDeleteClick}>Delete</button>
                            </>
                        )}
                    </>
            }
        </div>
    )
}

export default Tweet;