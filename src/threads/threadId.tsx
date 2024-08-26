import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type PostItem = {
  id: string;
  post: string;
};

type ThreadPosts = {
  threadId: string;
  posts: PostItem[];
};

const ThreadContent = () => {
  const { state } = useLocation();
  //スレッド内の投稿を保持するリスト
  const [threadPosts, setThreadPosts] = useState<ThreadPosts>();

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(
        `https://railway.bulletinboard.techtrain.dev/threads/${state}/posts`
      );

      const datajson = await data.json();
      setThreadPosts(datajson);
      console.log(datajson);
    }

    fetchData();
  }, []);

  //空だったらloading画面
  if (!threadPosts) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {threadPosts.posts.map((thread, index) => (
        <p key={index}>{thread.post}</p>
      ))}
    </>
  );
};
export default ThreadContent;
