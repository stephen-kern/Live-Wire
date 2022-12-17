import React from "react";
import { Link } from "react-router-dom";
import { FaGithubSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-auto p-4">
      <div className="w-25 mt-auto container flex-row justify-space-around">
        &copy;2022 by Live Wire
        <Link to={"https://github.com/stephen-kern/Live-Wire"}>
          <FaGithubSquare fontSize={"2rem"}></FaGithubSquare>
        </Link>
        {/* put the stripe donation button here */}
      </div>
    </footer>
  );
};

export default Footer;
