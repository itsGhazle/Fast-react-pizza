import { Link } from "react-router-dom";
import SearchQuery from "../order/SearchOrder";

function Header() {
  return (
    <header>
      <Link to="/">Fast React Pizza Co.</Link>
      <SearchQuery/>
      <p>username</p>
    </header>
  );
}

export default Header;
