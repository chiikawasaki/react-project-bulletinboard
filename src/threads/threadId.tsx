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

  //スレッド内の投稿を保持するリスト
  const [threadPosts, setThreadPosts] = useState<ThreadPosts>();

  const { state } = useLocation();
  const threadId = state.threadId;
  const threadTitle = state.threadTitle;
  const endpointURL = `https://railway.bulletinboard.techtrain.dev/threads/${threadId}/posts`;

  //postのデータを取得
  const fetchPostData = async () => {
    try {
      const response = await axios.get(endpointURL);
      setThreadPosts(response.data); // APIからのレスポンスデータをステートに保存
      console.log(response.data); // レスポンスのデータをコンソールに出力
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //データフェッチング
  useEffect(() => {
    fetchPostData();
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
      fetchPostData();
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
