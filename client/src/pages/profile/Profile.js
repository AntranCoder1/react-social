import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Feed from '../../components/feed/Feed';
import RightBar from '../../components/rightBar/RightBar';
import SideBar from '../../components/sideBar/SideBar';
import TopBar from '../../components/topBar/TopBar';
import { useParams  } from 'react-router';
import './Profile.css';

const Profile = () => {

    const PF =  process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const username = useParams().username;
    const [file, setFile] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?username=${username}`);
            setUser(res.data);
        }
        fetchUser();
    }, [username]);

    return (
        <>
            <TopBar />
            <div className="profile">
                <SideBar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <label htmlFor="file">
                                <img 
                                    src={ user.coverPicture ? PF + user.coverPicture : PF + "person/noCover.png" } 
                                    className="profileCoverImg"
                                    alt=""
                                />
                                <input 
                                    type="file" 
                                    id="file" 
                                    accept=".png, .jpeg, .jpg" 
                                    onChange={(e) => setFile(e.target.files[0])}
                                    style={{ display: "none" }}
                                />
                            </label>
                            <img 
                                src={ user.profifePicture ? PF + user.profifePicture : PF + "person/noAvatar.png" }
                                className="profileUserImg"
                                alt=""
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">{user.desc}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username} />
                        <RightBar user={user} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
