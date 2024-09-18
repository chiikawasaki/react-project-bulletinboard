import { MouseEvent, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CreatethreadButton from "../CreatethreadButton";
import axios from "axios";

type PostItem = {
  id: string;
  post: string;
};

type ThreadPosts = {
  threadId: string;
  posts: PostItem[];
};

const ThreadContent = () => {
  //新規Postの内容を持っておく
  const [NewPost, SetNewPost] = useState("");
  const { state } = useLocation();
  console.log("Received state:", state); // ここでstateの内容を確認
  const threadId = state.threadId;
  const threadTitle = state.threadTitle;
  console.log("Received threadId:", threadId);

  //スレッド内の投稿を保持するリスト
  const [threadPosts, setThreadPosts] = useState<ThreadPosts>();

  //postのデータを取得
  async function fetchData() {
    await fetch(
      `https://railway.bulletinboard.techtrain.dev/threads/${threadId}/posts`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setThreadPosts(data);
      });
  }

  //データフェッチング
  useEffect(() => {
    fetchData();
  }, []);

  //PostをPOSTする関数
  const postPostData = async () => {
    try {
      const response = await axios.post(
        `https://railway.bulletinboard.techtrain.dev/threads/${threadId}/posts`,
        {
          post: NewPost,
        }
      );
      console.log("responseData:", response.data);
      alert("ポストを投稿しました");
      fetchData();
      SetNewPost("");
    } catch (error) {
      console.error("Error posting data", error);
    }
  };

  function handleSubmit(
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    e.preventDefault();
    postPostData();
  }

  return (
    <>
      <CreatethreadButton />
      <h1>{threadTitle}</h1>
      {threadPosts?.posts.map((thread, index) => (
        <p key={index}>{thread.post}</p>
      ))}

      <p>ポストを投稿</p>
      <input
        value={NewPost}
        onChange={(event) => {
          SetNewPost(event.target.value);
        }}
      ></input>
      <button
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        投稿する
      </button>

      <Link to={"/"}>Topに戻る</Link>
    </>
  );
};
export default ThreadContent;
