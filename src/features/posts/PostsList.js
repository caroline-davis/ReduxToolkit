import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from 'react';
import { selectAllPosts, getPostsError, getPostsStatus, fetchPosts } from "./postsSlice";

import ReactionButtons from "./ReactionButtons";
import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {
  const dispatch = useDispatch();

    const posts = useSelector(selectAllPosts);
    const postsStatus = useSelector(getPostsStatus);
    const error = useSelector(getPostsError);

    useEffect(() => {
      if (postsStatus === "idle") {
        dispatch(fetchPosts())
      }
    }, [postsStatus, dispatch])

    let content;
    if (postsStatus === "loading") {
      content = <p>"Loading..."</p>
    } else if (postsStatus === "succeeded") {
      const orderedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));
      content = orderedPosts.map(post => (
        <PostsExcerpt key={`${post.id}-${post.date}`} post={post} />
      ));
    } else if (postsStatus === "failed") {
      content = <p>{error}</p>;
    }

  return (
    <section>
        <h2>Posts</h2>
        {content}
    </section>
  )
}

export default PostsList