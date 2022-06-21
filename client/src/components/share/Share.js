import React, { useContext, useRef, useState } from 'react';
import { PermMedia, Label,Room, EmojiEmotions } from '@material-ui/icons';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { Cancel } from '@material-ui/icons';
import './Share.css';

const Share = () => {

    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();

    const [file, setFile] = useState(null);

    const handleClick = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value
        }

        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append('name', filename);
            data.append('file', file);
            newPost.img = filename;
            try {
                await axios.post('/upload', data);
            } catch (error) {}
        }

        try {
            await axios.post('/posts', newPost);
            window.location.reload();
        } catch (error) {}
    }

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img 
                        src={user.profifePicture ? PF + user.profifePicture : PF + "person/noAvatar.png" } 
                        className="shareProfileImg" 
                    />
                    <input 
                        type="text" 
                        className="shareInput" 
                        placeholder={"What's in your mind " + user.username + " ?"}    
                        ref={desc}
                    />
                </div>
                <hr className="shareHr" />
                { file && (
                    <div className="shareContainer">
                        <img 
                            className="shareImg"
                            src={URL.createObjectURL(file)}
                            alt=""
                        />
                        <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
                    </div>
                ) }
                <form className="shareBottom" onSubmit={handleClick}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMedia htmlColor="tomato" className="shareIcon" />
                            <span className="shareOptionText">Photo or Video</span>
                            <input 
                                type="file" 
                                id="file" 
                                accept=".png, .jpeg, .jpg" 
                                onChange={(e) => setFile(e.target.files[0])}
                                style={{ display: "none" }}
                            />
                        </label>
                        <div className="shareOption">
                            <Label htmlColor="blue" className="shareIcon" />
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="green" className="shareIcon" />
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button className="shareButton" type="submit">Share</button>
                </form>
            </div>
        </div>
    )
}

export default Share
