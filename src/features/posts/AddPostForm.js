import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { postAdded } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";


const AddPostForm = () => {

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [userId, setUserId] = useState("")
    
    const onTitleHasChanged = e => setTitle(e.target.value)
    const onContentHasChanged = e => setContent(e.target.value)
    const dispatch = useDispatch();

    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(
                postAdded(title, content)
            )
            setTitle("")
            setContent("")
        }
    }

  return (
    <section>
        <h2>Add a New Post</h2>
        <form>
            <label htmlFor="postTitle">Post Title:</label>
            <input
                type="text"
                id="postTitle"
                name="postTitle"
                value={title}
                onChange={onTitleHasChanged}
            />
            <label htmlFor="postContent">Content:</label>
            <textarea 
                id="postContent"
                name="postContent"
                value={content}
                onChange={onContentHasChanged}
            />
            <button 
                type="button"
                onClick={onSavePostClicked}
            >Save Post</button>
        </form>
    </section>
  )
}

export default AddPostForm