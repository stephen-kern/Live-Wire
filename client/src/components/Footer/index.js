import React from "react";
import { Link } from "react-router-dom";
import { FaGithubSquare } from "react-icons/fa";
import { Layout } from "antd";
const { Footer } = Layout;


const FooterComponent = () => {
  return (
    <Layout>
      <Footer className="mt-auto p-4 w-25 mt-auto container flex-row justify-space-around align-center">
          &copy;2022 by Live Wire
          <Link to={"https://github.com/stephen-kern/Live-Wire"}>
            <FaGithubSquare fontSize={"2rem"} className="ghlogo"></FaGithubSquare>
          </Link>
          {/* put the stripe donation button here */}
      </Footer>
    </Layout>
  );
};

export default FooterComponent;
