import React, { useContext } from 'react';
import './TopBar.css';
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const TopBar = () => {

    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to='/'>
                    <span className="logo">Allgrow labo</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <Search className="searchIcon" />
                    <input
                        placeholder="Search for friend, post or video"
                        className="searchInput"
                    />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">Homepage</span>
                    <span className="topbarLink">Timeline</span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat />
                        <span className="topbarIconBadge">2</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications />
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div>
                <span className="topbarUser" style={{ marginRight: '-2rem' }}>{user.username}</span>
                <Link to={`/profile/${user.username}`}>
                    <img
                        src={
                        user.profilePicture
                            ? PF + user.profilePicture
                            : PF + "person/noAvatar.png"
                        }
                        alt=""
                        className="topbarImg"
                    />
                </Link>
            </div>
        </div>
    )
}

export default TopBar
