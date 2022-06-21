import React from 'react';
import SideBar from '../../components/sideBar/SideBar';
import TopBar from '../../components/topBar/TopBar';
import Feed from '../../components/feed/Feed';
import RightBar from '../../components/rightBar/RightBar';
import './Home.css';

const Home = () => {
    return (
        <>
            <TopBar />
            <div className="homeContainer">
                <SideBar />
                <Feed />
                <RightBar />
            </div>
        </>
    )
}

export default Home
