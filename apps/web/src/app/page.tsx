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
 


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      posts from server:{posts}
      <PostList />
      {auth.user && <>user is : {auth.user.name}<br/></>}

      {secrets && JSON.stringify(secrets)}
      <Button>test button from @acme/ui </Button>
      <Input className="border-blue-300" />
    </main>
  );
}
