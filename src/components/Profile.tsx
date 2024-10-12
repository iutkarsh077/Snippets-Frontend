import { useContext, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { userContext } from "./GlobalUserProvider";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  content: string;
}

interface User {
  name: string;
  email: string;
  avatar: string;
  posts?: Post[];
}

export default function Profile() {
    const { GlobalUserDetails } = useContext<any>(userContext);
    const [posts, setPosts] = useState<any[] | null>(null);
  const user = {
    name: "Harhs",
    avatar: "",
    email: "utkarshsingh13200@gmail.com",
  };
  useEffect(() => {
    const getUserPost = async () => {
      try {
        const res = await axios.get("/api/v1/getPostByProfile", {
            params: {
                id: GlobalUserDetails.id
            }
        })

        if(res.data.status === false){
            throw new Error(res.data.msg);
        }

        setPosts(res.data.posts);
      } catch (error: any) {
        const errorMessage =
          error.response.data.msg || "An unknown error occured";
        toast.error(errorMessage);
      }
    };
  }, []);
  return (
    <div className="container mx-auto p-4 space-y-6">
      <ToastContainer />
      <Card>
        <CardHeader className="flex flex-row items-center space-x-4 pb-2">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{user.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Posts</CardTitle>
        </CardHeader>
        <CardContent>
          {/* {user.posts.length === 0 ? (
            <p className="text-muted-foreground">No posts yet.</p>
          ) : (
            <ul className="space-y-4">
              {user.posts.map((post) => (
                <li key={post.id}>
                  <h3 className="font-semibold">{post.title}</h3>
                  <p className="text-sm text-muted-foreground">{post.content}</p>
                  {post.id !== user.posts[user.posts.length - 1].id && (
                    <Separator className="my-2" />
                  )}
                </li>
              ))}
            </ul>
          )} */}
        </CardContent>
      </Card>
    </div>
  );
}
