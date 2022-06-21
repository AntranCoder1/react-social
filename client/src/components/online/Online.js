import React from 'react';
import './Online.css';

const Online = ({ users }) => {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <li className="rightBarFriend">
            <div className="rightBarProfileImgContainer">
                <img className="rightBarProfileImg" src={PF + users.profilePicture} alt="" />
                <span className="rightBarOnline"></span>
            </div>
            <span className="rightBarUsername">{users.username}</span>
        </li>
    )
}

export default Online
