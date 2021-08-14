import './feed.css';
import Share from '../share/Share';
import Post from '../post/Post';
import axios from 'axios';

import { useEffect, useState } from 'react';

export default function Feed({userName}) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = userName ? 
            await axios.get(`/posts/profile/${userName}`)
            :  await axios.get('posts/timeline/60daaa43d2bf400b04f52138');
            setPosts(res.data);
        }

        fetchPosts();
    }, [userName])

    return (
        <div className='feedContainer'>
            <div className="feedWrapper"></div>
            <Share />
            {
                posts.map((post) => <Post key={post._id} post={post} />)
            }
        </div>
    )
}