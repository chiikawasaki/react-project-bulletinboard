import { useEffect, useState } from "react";
import "./App.css";

function App() {
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
    <>
      {boarddata.map((oneboarddata) => (
        <ul>
          <li key={oneboarddata.id}>{oneboarddata.title}</li>
        </ul>
      ))}
    </>
  );
}

export default App;
