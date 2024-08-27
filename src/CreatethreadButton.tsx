import { Link } from "react-router-dom";

const CreatethreadButton = () => {
  return (
    <Link to={"/threads/new/"}>
      <button>スレッドを作成</button>
    </Link>
  );
};

export default CreatethreadButton;
