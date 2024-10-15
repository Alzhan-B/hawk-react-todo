import { Link } from "react-router-dom";
import style from "./NavBar.module.css";

const NavBar = () => {
  return (
    <nav className={style.nav}>
      <ul className={style.ul}>
        <li className={style.li}>
          <Link to="/">Home</Link>
        </li>
        <li className={style.li}>
          <Link to="/todos">Todo List</Link>
        </li>
        <li className={style.li}>
          <Link to="/learn">Learn</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
