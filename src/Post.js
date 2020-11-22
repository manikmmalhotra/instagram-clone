import { Avatar } from '@material-ui/core'
import React from 'react'
import './Post.css'

function Post({username,caption,imageUrl}) {
    return (
        <div className="post">
            <div className='post__header'>
            <Avatar className="post__avatar"
            alt={username}
            src="./avtar.jpg" />
            <h3>{username}</h3>
            </div>
           
            <img className="post__image" src="https://www.freecodecamp.org/news/content/images/size/w2000/2020/02/Ekran-Resmi-2019-11-18-18.08.13.png" alt="" />
            <h4 className="post__text"><strong>{username} : </strong>{caption}</h4>
        </div>
    )
}

export default Post
