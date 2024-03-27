import useAuthStore from "../zustand/authStore";
import { useState , useEffect } from "react";
import { Blogs } from "../components/dashboard/blogs";
import axios from "axios";
import useLoadStateStore from "@/zustand/loadStateStore";

export default function Dashboard() {
  const isAuth = useAuthStore((state) => state.isAuth);
  const setIsLoading = useLoadStateStore((state) => state.setIsLoading);
  const authData = useAuthStore((state) => state.authdata);
  const [userdetails , setUserdetails] = useState({})
  const [blogCount, setBlogCount] = useState(0);

  useEffect(() => {
    if(!authData) return
    (async () => {
      setIsLoading(true);
      const res1 = await getUserDetails(authData.id, authData);
      if (res1) {
        console.log(res1);
        setUserdetails(res1);
      }
      setIsLoading(false)
    })()
  },[authData])

  return (
    <div className="px-4 py-6 md:px-6 md:py-12 lg:py-16">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl xl:text-5xl">
          {isAuth && `Welcome , ${authData.username}`}
        </h1>
        <div className="flex items-center space-x-3 text-gray-500 dark:text-gray-400">
          <p className="font-semibold">{userdetails?.followers_count}</p>
          <p className="font-semibold">Followers</p>
          <span className="h-6 w-px bg-gray-200 dark:bg-gray-800" />
          <p className="font-semibold">{userdetails?.following_count}</p>
          <p className="font-semibold">Following</p>
          <span className="h-6 w-px bg-gray-200 dark:bg-gray-800" />
          <p className="font-semibold">{blogCount}</p>
          <p className="font-semibold">Blogs</p>
        </div>
      </div>
      <div className="border-b border-gray-200 dark:border-gray-800" />
      <div className="grid gap-6 pt-6 md:grid-cols-2">
        <Blogs setBlogCount = {setBlogCount} />
      </div>
    </div>
  );
}

//
export async function getUserDetails(userId, authData) {
  try {
    const res = await axios.get(
      import.meta.env.VITE_BACKEND_URL + "/users/details",
      {
        params: {
          userId: userId,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${authData.token}`,
        },
      }
    );
    return res.data.userdetails[0];
  } catch (error) {
    console.log(error);
    alert("Error fetching data");
    return null;
  }
}