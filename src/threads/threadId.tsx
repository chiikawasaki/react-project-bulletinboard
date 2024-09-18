import { MouseEvent, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../navbar";

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
      <Navbar />
      <div className="flex justify-evenly">
        <div>
          <h1 className="text-3xl font-bold mb-5 ml-10">{threadTitle}</h1>
          {threadPosts?.posts.map((thread, index) => (
            <p
              className="grid h-20 place-content-center rounded shadow-md m-10 p-5"
              key={index}
            >
              {thread.post}
            </p>
          ))}
        </div>
        <div className="flex justify-center flex-col items-center w-50">
          <p>ポストを投稿</p>
          <input
            type="text"
            placeholder="投稿してみよう！"
            className="input input-bordered w-full max-w-xs"
            value={NewPost}
            onChange={(event) => {
              SetNewPost(event.target.value);
            }}
          ></input>
          <button
            className="btn btn-accent self-center mt-3"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            投稿する
          </button>
          <Link to={"/"}>
            <button className="btn btn-active btn-link self-center">
              Topに戻る
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};
export default ThreadContent;
