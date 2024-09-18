import { useEffect, useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./navbar";

type BoardItem = {
  id: string;
  title: string;
};

const endpointURL = "https://railway.bulletinboard.techtrain.dev/threads";

function Home() {
  //   スレッド一覧を保存するリスト
  const [boarddata, setboarddata] = useState<BoardItem[]>([]);

  async function fetchThreadsData() {
    try {
      const response = await axios.get(endpointURL);
      setboarddata(response.data); // APIからのレスポンスデータをステートに保存
      console.log(response.data); // レスポンスのデータをコンソールに出力
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  //データフェッチング
  useEffect(() => {
    fetchThreadsData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="main">
        <h1 className="text-3xl font-bold mb-5">新着スレッド一覧</h1>
        {boarddata.map((oneboarddata) => (
          <Link
            to={`/threads/${oneboarddata.id}`}
            state={{
              threadId: oneboarddata.id,
              threadTitle: oneboarddata.title,
            }}
            key={oneboarddata.id}
          >
            <div className="thread">
              <p className="mt-3 mb-3 text-grey-700">{oneboarddata.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Home;
