import './rightbar.css';

import { Users } from '../../dummyData';
import { Online } from '../online/Online';

export default function Rightbar({ Profile , user }) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const HomeRightbar = () => {
        return (<>
            <div className="birthdayContainer">
                <img className='birthdayImg' src='/assets/gift.png' alt='birthdayImage' />
                <span className="birthdayText"><b>Pola Foster</b> and <b>3 others have </b> birthday today</span>
            </div>
            <img src="assets/ad.png" alt="" className="rightbarAd" />
            <h4 className="rightbarTitle">online Friends</h4>
            <ul className="rightbarFriendList">
                {
                    Users.map(user => <Online key={user.id} user={user} />)
                }
            </ul>
        </>
        )
    }

    const ProfileRightbar = () => {
        return (<>
            <h4 className="rightbarTitle">User Information</h4>
            <div className="rightbarInfo">
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">City:</span>
                    <span className="rightbarInfoValue">New York</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">From:</span>
                    <span className="rightbarInfoValue">Madrid</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">Relationship:</span>
                    <span className="rightbarInfoValue">Single</span>
                </div>
            </div>
            <h4 className="rightbarTitle">User Followings</h4>
            <div className="rightbarFollowings">
                <div className="rightbarFollowing">
                    <img src={`${PF}person/1.jpeg`} alt="" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">John Carter</span>
                </div>
                <div className="rightbarFollowing">
                    <img src={`${PF}person/2.jpeg`} alt="" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">John Carter</span>
                </div>
                <div className="rightbarFollowing">
                    <img src={`${PF}person/3.jpeg`} alt="" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">John Carter</span>
                </div>
                <div className="rightbarFollowing">
                    <img src={`${PF}person/4.jpeg`} alt="" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">John Carter</span>
                </div>
                <div className="rightbarFollowing">
                    <img src={`${PF}person/5.jpeg`} alt="" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">John Carter</span>
                </div>
                <div className="rightbarFollowing">
                    <img src={`${PF}person/6.jpeg`} alt="" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">John Carter</span>
                </div>
            </div>
        </>
        )
    }
    return (
        <div className='rightbarContainer'>
            <div className="rightbarWrapper">
                {Profile ? ProfileRightbar() : HomeRightbar()}
            </div>
        </div>
    )
}