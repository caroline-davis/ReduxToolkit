import React from "react";
import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Link, useParams } from "react-router-dom";

const SinglePostPage = () => {
  // pulls the value from the url paramater - uses react dom to get this
  const { postId } = useParams();

  // Need to change to a Number frmat so it works properly
  const post = useSelector((state) => selectPostById(state, Number(postId)));

  if (!post) {
    return (
      <section>
        <h2>Post not foundddd!</h2>
      </section>
    );
  }

  return (
    <article>
      <h3>{post.title}</h3>
      <p className="postCredit">
        <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};

export default SinglePostPage;
