import { useEffect, useState } from "react";
import "./App.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

type BoardItem = {
  id: string;
  title: string;
};

function Home() {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log("Received state:", state); // stateの内容を確認

  // const toThread = (threadId: string, threadTitle: string) => {
  //   navigate(`/threads/${threadId}`, { state: { threadId, threadTitle } });
  // };

  //   スレッド一覧を保存するリスト
  const [boarddata, setboarddata] = useState<BoardItem[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(
        "https://railway.bulletinboard.techtrain.dev/threads"
      );

      const datajson = await data.json();
      setboarddata(datajson);
      console.log(datajson);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (state && state.newThread) {
      setboarddata((prevdata) => {
        const updatedData = [...prevdata, state.newThread];
        console.log("Updated data:", updatedData);
        return updatedData;
      });
    } else {
      console.log("むりだった");
    }
  }, [state]);

  return (
    <div className="main">
      <h1>新着スレッド一覧</h1>
      {boarddata.map((oneboarddata) => (
        <Link
          // onClick={() => toThread(oneboarddata.id, oneboarddata.title)}
          to={`/threads/${oneboarddata.id}`}
          key={oneboarddata.id}
          state={{ threadId: oneboarddata.id, threadTitle: oneboarddata.title }}
        >
          <div className="thread">
            <p>{oneboarddata.title}</p>
          </div>
        </Link>
      ))}
      <Link to={"/threads/new/"}>
        <button>スレッドを作成</button>
      </Link>
    </div>
  );
}

export default Home;
