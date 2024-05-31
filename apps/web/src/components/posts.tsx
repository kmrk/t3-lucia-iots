'use client';

import { api } from "~/trpc/react";

const PostList = () => {

  const posts = api.post.all.useQuery();

  return (
    <p>posts from client: {JSON.stringify(posts.data)}</p>
  );
};

export default PostList;