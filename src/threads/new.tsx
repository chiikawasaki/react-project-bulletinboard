import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const New = () => {
  // スレッド名を一時的に保存
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const onClickAdd = () => {
    if (text === "") return;
    const newThread = {
      id: Date.now().toString(),
      title: text,
    };

    navigate("/", { state: { newThread } });
  };

  return (
    <div className="main">
      <h1>スレッド新規作成</h1>
      <input
        value={text}
        onChange={(event) => setText(event.target.value)}
      ></input>
      <Link to={"/"}>Topに戻る</Link>
      <button onClick={onClickAdd}>作成</button>
    </div>
  );
};

export default New;
