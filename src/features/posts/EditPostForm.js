import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPostById, updatePost } from "./postsSlice";
import { useParams, useNavigate } from "react-router-dom";

import  { selectAllUsers } from "../users/usersSlice";

const EditPostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const post = useSelector((state) => selectPostById(state, Number(postId)))
  const users = useSelector(selectAllUsers)

  const [title, setTitle] = useState(post?.title)
  const [content, setContent] = useState(post?.body)
  const [userId, setUserId] = useState(post?.userId)
  // maybe not the Add
  const [requestStatus, setRequestStatus] = useState("idle");

  const dispatch = useDispatch()

  if (!post) {
    return (
        <section>
            <h2>Post not found!</h2>
        </section>
    )
  }

  const onTitleHasChanged = (e) => setTitle(e.target.value);
  const onContentHasChanged = (e) => setContent(e.target.value);
  const onAuthorHasChanged = (e) => setUserId(Number(e.target.value));

  const canSave =
    [title, content, userId].every(Boolean) && requestStatus === "idle";

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setRequestStatus("pending");
        // unwrap is part of redux toolkit, it gives us the promise and will throw and err if rejected
        dispatch(updatePost({ id: post.id, title, body: content, userId, reactions: post.reactions})).unwrap()

        setTitle("");
        setContent("");
        setUserId("");
        navigate(`/post/${postId}`)
      } catch (err) {
        console.error("failed to save the post", err);
      } finally {
        setRequestStatus("idle");
      }
    }
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleHasChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" defaultValue={userId} onChange={onAuthorHasChanged}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentHasChanged}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default EditPostForm;
