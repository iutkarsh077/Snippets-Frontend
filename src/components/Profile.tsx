import { useContext, useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { userContext } from "./GlobalUserProvider";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import CodeCard from "./Card";

interface Post {
  id: number;
  authorId: string;
  code: string;
}


export default function Profile() {
  const [posts, setPosts] = useState<Post[]>([]); // Default to empty array
  const { GlobalUserDetails } = useContext<any>(userContext);

  console.log(GlobalUserDetails);

  useEffect(() => {
    const getUserPost = async () => {
      if (!GlobalUserDetails || !GlobalUserDetails.id) {
        console.log(GlobalUserDetails);
        return;
      }
      try {
        const res = await axios.get("/api/v1/getPostByProfile", {
          params: {
            id: GlobalUserDetails.id,
          },
        });

        if (res.data.status === false) {
          throw new Error(res.data.msg);
        }
        // console.log(res.data.posts)
        setPosts(res.data.posts);
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.msg || "An unknown error occurred";
        toast.error(errorMessage);
      }
    };

    getUserPost();
  }, [GlobalUserDetails]);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <ToastContainer />
      {GlobalUserDetails && (
        <Card>
          <CardHeader className="flex flex-row items-center space-x-4 pb-2">
            <Avatar className="h-20 w-20">
              {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
              <AvatarFallback className="text-4xl font-bold">
                {GlobalUserDetails.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{GlobalUserDetails.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{GlobalUserDetails.email}</p>
            </div>
          </CardHeader>
        </Card>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Posts</CardTitle>
        </CardHeader>
        <CardContent>
          {posts.length === 0 ? (
            <p className="text-muted-foreground">No posts yet.</p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-3 mt-10 ml-20 mr-20">
              {posts
                .sort(
                  (a: any, b: any) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .map((post) => (
                  <li key={post.id}>
                    <CodeCard snippet={post} />
                  </li>
                ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
