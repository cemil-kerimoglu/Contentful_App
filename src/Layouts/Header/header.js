import "./header.css";
import React, { useState, useEffect } from "react";
import { client } from "../../App";

function Header(props) {
  const [logo, setLogo] = useState("");
  useEffect(() => {
    client
      .getAsset("1rOpLG8VVa6F2Sp1Ov0E0V")
      .then((asset) => setLogo(asset.fields.file.url))
      .catch(console.error);
  }, []);

  return (
    <div>
      <ul className="navbar">
        <li>
          <img className="logo" src={logo} alt="logo"></img>
        </li>
        <li>History Blog</li>
        <li>
          <a href="">Home</a>
        </li>
        <li>
          <a href="">Articles</a>
        </li>
        <li>
          <a href="">Contact</a>
        </li>
        <li>
          <a href="">About</a>
        </li>
        <li>
          <a href="">Log In</a>
        </li>
      </ul>
    </div>
  );
}

export default Header;
