import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-green-50 shadow-md mb-10">
      <div className="flex-1">
        <Link to={"/"}>
          <a className="btn btn-ghost text-xl">掲示板</a>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to={"/threads/new"}>
              <a>スレッドを作成</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
