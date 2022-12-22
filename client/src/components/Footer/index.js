// === PACKAGE IMPORT ===
import React from "react";
import { FaGithubSquare } from "react-icons/fa";
import { Layout } from "antd";

// ANT Layout for Footer
const { Footer } = Layout;

// Dynamically generated JSX for Global App
const FooterComponent = () => {
  return (
    <Footer className="mt-auto p-4">
      <div className="w-25 justify-space-around flex-row align-center m-auto">
        &copy;2022 by Live Wire
        <a href="https://github.com/stephen-kern/Live-Wire">
          <FaGithubSquare fontSize={"2rem"} className="ghlogo"></FaGithubSquare>
        </a>
      </div>
    </Footer>
  );
};

// Export FooterComponent
export default FooterComponent;
