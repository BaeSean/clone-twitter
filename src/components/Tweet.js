import { dbService, storageService } from "fb";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";


const Tweet = ({ tweetObj, isOwner }) => {
    const [editmode, setEditmode] = useState(false);
    const [newTweet, setNewTweet] = useState(tweetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this tweet?");
        if (ok) {
            await dbService.doc(`tweets/${tweetObj.id}`).delete();
            if (tweetObj.attachmentURL !== "")
                await storageService.refFromURL(tweetObj.attachmentURL).delete();
        }  // 파일시스템의 구조와 비슷하게 사용(firestore)
    }
    const toggleEdit = () => {
        setEditmode((prev) => !prev);
        //setNewTweet("");

    };
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`tweets/${tweetObj.id}`).update({ text: newTweet });
        // setNewTweet("");
        setEditmode(false);
    };
    const onChange = (event) => {
        const { target: { value } } = event;
        setNewTweet(value);
    };

    return (
        <div className="nweet">
            {tweetObj.text || tweetObj.attachmentURL ?
                <>
                    {tweetObj.attachmentURL !== "" && <img src={tweetObj.attachmentURL} width="50px" height="50px" />}
                    {
                        editmode ?
                            <>
                                <form onSubmit={onSubmit} className="container nweetEdit">
                                    <input type="text" placeholder="Update what?"
                                        onChange={onChange}
                                        value={newTweet} required autoFocus className="formInput" />
                                    <input type="submit" value="Update Nweet" className="formBtn" />
                                </form>
                                <span onClick={toggleEdit} className="formBtn cancelBtn">
                                    Cancel
                                </span>
                            </>
                            :
                            <>
                                <h4>{tweetObj.text}</h4>
                                {tweetObj.attachmentUrl && <img src={tweetObj.attachmentUrl} />}

                                {isOwner && (
                                    <>
                                        <div className="nweet__actions">
                                            <span onClick={onDeleteClick}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </span>
                                            <span onClick={toggleEdit}>
                                                <FontAwesomeIcon icon={faPencilAlt} />
                                            </span>
                                        </div>

                                    </>
                                )}
                            </>
                    }
                </>
                :
                <></>
            }
        </div>
    )
}

export default Tweet;