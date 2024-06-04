import { logout } from "@acme/auth";
import { Button } from "@acme/ui/button";
import { DropdownMenu } from "@acme/ui/dropdown-menu";
import { Input } from "@acme/ui/input";
import Image from "next/image";
import { redirect } from "next/navigation";
import PostList from "~/components/posts";
import { validateRequest } from "~/lib/auth/validate-request";
import { api } from "~/trpc/server";

export default async function Home() {

  const auth: any = await validateRequest();
  if (!auth.user) redirect("/login");


  const posts = await api.post.all();
  const secrets =await api.post.list();

  // const num = "15511111111a";
  // server side will get error compile time

  const num1 = "15511111111";

  // const hello = await api.post.hello({phone:num,password:"abcd"});
  const hello1 = await api.post.hello({phone:num1,password:"abcd"});


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      posts from server:{posts}
      <PostList />
      {auth.user && <>user is : {auth.user.name}<br/></>}

      {secrets && JSON.stringify(secrets)}
      
      {/* {JSON.stringify(hello)} */}

      {JSON.stringify(hello1)}

      
      <Button>test button from @acme/ui </Button>
      <Input className="border-blue-300" />
    </main>
  );
}
