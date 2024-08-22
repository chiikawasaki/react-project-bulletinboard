import { useEffect, useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";
function Home() {
  const [boarddata, setboarddata] = useState([]);

  async function fetchData() {
    const data = await fetch(
      "https://railway.bulletinboard.techtrain.dev/threads"
    );

    const datajson = await data.json();
    setboarddata(datajson);
    console.log(datajson);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="main">
      <h1>新着スレッド一覧</h1>
      {boarddata.map((oneboarddata) => (
        <div className="thread">
          <p key={oneboarddata.id}>{oneboarddata.title}</p>
        </div>
      ))}
      <Link to={"/threads/new/"}>
        <button>スレッドを作成</button>
      </Link>
    </div>
  );
}

export default Home;
