'use client';

import { api } from "~/trpc/react";

const PostList = () => {

  const posts = api.post.all.useQuery();
  const num = "13333333331a";
  const hello = api.post.hello.useQuery({phone:num,password:"123455"});


  const num1 = "13333333331";
  const hello1 = api.post.hello.useQuery({phone:num1,password:"123455"});


  return (<>
    <p>posts from client: {JSON.stringify(posts.data)}</p>
    <p>result is :{hello.data? JSON.stringify(hello.data): JSON.stringify(hello.failureReason?.message)}</p>
    <p>result1 is :{hello1.data? JSON.stringify(hello1.data): JSON.stringify(hello1.failureReason?.message)}</p>

    </>
  );
};

export default PostList;