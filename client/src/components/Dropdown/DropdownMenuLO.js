import React from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "antd";
import { FaBars } from "react-icons/fa";

const items = [
  {
    label: <Link to="/login">Login</Link>,
    key: "0",
  },
  {
    label: <Link to="/signup">Signup</Link>,
    key: "1",
  },
];
const DropdownMenuLO = () => (
  <Dropdown
    menu={{
      items,
    }}
    trigger={["click"]}
  >
    <FaBars className="menu-btn" />
  </Dropdown>
);
export default DropdownMenuLO;
