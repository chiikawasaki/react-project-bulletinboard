import { useState } from "react";
import { Link } from "react-router-dom";

type NewProps = {};
const New: React.FC<NewProps> = () => {
  // スレッド名を一時的に保存
  const [text, setText] = useState("");
  return (
    <div className="main">
      <h1>スレッド新規作成</h1>
      <input
        value={text}
        onChange={(event) => setText(event.target.value)}
      ></input>
      <Link to={"/"}>Topに戻る</Link>
      <button onClick={onClickadd}>作成</button>
    </div>
  );
};

export default New;
