import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import { useEffect, useState, } from 'react';
import axios from 'axios';
import {useParams} from 'react-router';

import './profile.css';

export default function Profile() {
    const [user, setUser] = useState({});
    const { userName } = useParams();
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?userName=${userName}`)
            setUser(res.data);
        }
        fetchUser();
    }, [userName])

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img className='profileCoverImg' src={`${PF}post/3.jpeg`} alt='' />
                            <img className='profileUserImg' src={`${PF}person/7.jpeg`} alt='' />
                        </div>
                        <div className="profileInfo">
                            <h4 className='profileInfoName'>{user.userName}</h4>
                            <span className="profileInfoDesc">{user.description}</span>
                        </div>

                    </div>
                    <div className="profileRightBottom">
                        <Feed userName={userName} />
                        <Rightbar user={user} Profile={true} />
                    </div>
                </div>
            </div>

        </>
    )
}