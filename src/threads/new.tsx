import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../navbar";

const New = () => {
  const navigate = useNavigate();
  // スレッド名を一時的に保存
  const [text, setText] = useState("");

  //postする関数
  const postData = async () => {
    try {
      const response = await axios.post(
        `https://railway.bulletinboard.techtrain.dev/threads`,
        {
          title: text,
        }
      );
      console.log("responseData:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Error posting data", error);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    postData();
  };

  return (
    <>
      <Navbar />
      <div className="main">
        <h1>スレッド新規作成</h1>
        <input
          className="input input-bordered w-full max-w-xs"
          type="text"
          placeholder="投稿してみよう！"
          value={text}
          onChange={(event) => setText(event.target.value)}
        ></input>
        <button
          className="btn btn-accent mt-3"
          onClick={(e) => handleSubmit(e)}
        >
          作成
        </button>
        <Link to={"/"} className="btn btn-active btn-link self-center">
          Topに戻る
        </Link>
      </div>
    </>
  );
};

export default New;
