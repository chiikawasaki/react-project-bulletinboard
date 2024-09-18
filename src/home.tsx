import { useEffect, useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import CreatethreadButton from "./CreatethreadButton";

type BoardItem = {
  id: string;
  title: string;
};

function Home() {
  //   スレッド一覧を保存するリスト
  const [boarddata, setboarddata] = useState<BoardItem[]>([]);

  async function fetchData() {
    await fetch("https://railway.bulletinboard.techtrain.dev/threads")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setboarddata(data);
      });
  }

  //データフェッチング
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="main">
      <CreatethreadButton />
      <h1>新着スレッド一覧</h1>
      {boarddata.map((oneboarddata) => (
        <Link
          to={`/threads/${oneboarddata.id}`}
          state={{ threadId: oneboarddata.id, threadTitle: oneboarddata.title }}
          key={oneboarddata.id}
        >
          <div className="thread">
            <p>{oneboarddata.title}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Home;
