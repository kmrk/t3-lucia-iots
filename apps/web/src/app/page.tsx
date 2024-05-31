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

  // logout(session.session?.id!)
  const session = await validateRequest();
  if (!session.user) redirect("/login");

  const posts = api.post.all();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      posts from server:{posts}
      <PostList />
      {session.user && <>user is : {session.user.name}</>}
      <Button>test button from @acme/ui </Button>
      <Input className="border-blue-300" />
    </main>
  );
}
