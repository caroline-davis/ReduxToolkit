import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useRef } from 'react';
import { selectAllPosts, getPostsError, getPostsStatus, fetchPosts } from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {
  const dispatch = useDispatch();

    const posts = useSelector(selectAllPosts);
    const postsStatus = useSelector(getPostsStatus);
    const error = useSelector(getPostsError);

    const mountedRef = useRef(false)

    useEffect(() => {
      if (!mountedRef.current && postsStatus === "idle") {
        dispatch(fetchPosts())
      }
      mountedRef.current = true
    }, [postsStatus, dispatch])

    let content;
    if (postsStatus === "loading") {
      content = <p>"Loading..."</p>;
    } else if (postsStatus === "succeeded") {
      const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
      content = orderedPosts.map(post => <PostsExcerpt key={post.id} post={post} />)
    } else if (postsStatus === "failed") {
      content = <p>{error}</p>;
    }

  return (
    <section>
        {content}
    </section>
  )
}

export default PostsList