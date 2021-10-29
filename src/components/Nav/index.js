import React from "react";
import "./nav.css";
import MarsIcon from "../../icons/mars.png";

const Nav = () => {
  const logoHandler = () => {
    window.scrollTo(0, 0);
  };

  return (
    <nav onClick={logoHandler} className="flex justify-start shadow-lg nav">
      <p>PROJECT MARS</p>
      <img className="logo" height="20" alt="" src={MarsIcon} />
    </nav>
  );
};

export default Nav;
