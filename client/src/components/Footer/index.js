import React from "react";
import { Link } from "react-router-dom";
import { FaGithubSquare } from "react-icons/fa";
import { Layout } from "antd";
const { Footer } = Layout;

const FooterComponent = () => {
  return (
    <Footer className="mt-auto p-4">
      <div className="w-25 justify-space-around flex-row align-center m-auto">
      &copy;2022 by Live Wire
      <Link to={"https://github.com/stephen-kern/Live-Wire"}>
        <FaGithubSquare fontSize={"2rem"} className="ghlogo"></FaGithubSquare>
      </Link>
      {/* put the stripe donation button here */}
      </div>
    </Footer>
  );
};

export default FooterComponent;
