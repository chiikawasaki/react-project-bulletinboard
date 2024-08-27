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
  console.log("Received state:", state); // ここでstateの内容を確認
  const threadId = state.threadId;
  const threadTitle = state.threadTitle;
  console.log("Received threadId:", threadId);

  //スレッド内の投稿を保持するリスト
  const [threadPosts, setThreadPosts] = useState<ThreadPosts>();

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(
        `https://railway.bulletinboard.techtrain.dev/threads/${threadId}/posts`
      );

      const datajson = await data.json();
      setThreadPosts(datajson);
      console.log(datajson);
    }

    fetchData();
  }, [state]);

  //空だったらloading画面
  if (!threadPosts) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>{threadTitle}</h1>
      {threadPosts.posts.map((thread, index) => (
        <p key={index}>{thread.post}</p>
      ))}
    </>
  );
};
export default ThreadContent;
