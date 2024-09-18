import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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
    <div className="main">
      <h1>スレッド新規作成</h1>
      <input
        value={text}
        onChange={(event) => setText(event.target.value)}
      ></input>
      <Link to={"/"}>Topに戻る</Link>
      <button onClick={(e) => handleSubmit(e)}>作成</button>
    </div>
  );
};

export default New;
