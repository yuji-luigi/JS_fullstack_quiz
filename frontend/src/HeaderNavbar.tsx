import { Link } from "react-router-dom";

const HeaderNavbar = () => {
  return (
    <div className="topnav">
      <img src="unnamed.png" />
      <Link to="/">Home</Link>
      <Link to="/accounts-cards">ACCOUNTS AND CARDS</Link>
      <Link to="/contact">LOANS AND MORTAGES</Link>
      <Link to="/consulting">CONSULTING</Link>
      <Link to="/trading">TRADING</Link>
      menu
      <button>LOGIN</button>
    </div>
  );
};

export default HeaderNavbar;
