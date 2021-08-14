import './post.css';
import { useState, useEffect } from 'react';
import { MoreVert } from '@material-ui/icons';
import axios from 'axios';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';


export default function Post({ post }) {
    const [likeObj, setLike] = useState({ count: post.likes.length, like: false });
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?userId=${post.userId}`);
            setUser(res.data);
        }
        fetchUser();
    }, [post.userId])

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const updateLike = () => {
        if (likeObj.like) {
            setLike(prevObj => ({ count: prevObj.count - 1, like: false }))
        } else {
            setLike(prevObj => ({ count: prevObj.count + 1, like: true }))
        }
    }

    return (
        <div className='post'>
            <div className="postwrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to= {`profile/${user.userName}`}>
                            <img src={PF + user.profilePicture} alt='' className='postProfileImage' />
                        </Link>
                        <span className='postUserName'>{user.userName}</span>
                        <span className='postDate'>{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert className='postTopExpandIcon' />
                    </div>
                </div>
                <div className="postCenter">
                    <span className='postText'>{post.description}</span>
                    <img src={PF + post.img} alt='' className='postImg' ></img>
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img onClick={updateLike} className='likeIcon' src={`${PF}like.png`} alt='' />
                        <img onClick={updateLike} className='likeIcon' src={`${PF}heart.png`} alt='' />
                        <span className='postLikeCounter'>{likeObj.count} People like it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className='postCommentText'>{post.comment} comments</span>
                    </div>
                </div>
            </div>

        </div>
    )
}