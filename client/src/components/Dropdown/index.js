import React from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "antd";
import { FaBars } from "react-icons/fa";
import Auth from "../../utils/auth";


const logout = (event) => {
  event.preventDefault();
  Auth.logout();
};

const items = [
  {
    label: <Link to="/">Setlist</Link>,
    key: "0",
  },
  {
    label: <Link to="/compose">Compose</Link>,
    key: "1",
  },
  {
    label: <Link to="/profile">Profile</Link>,
    key: "2",
  },
  {
    type: "divider",
  },
  {
    label: (
      <a href="/" onClick={logout}>
        Logout
      </a>
    ),
    key: "3",
  },
];
const DropdownMenuLI = () => (
  <Dropdown
    menu={{
      items,
    }}
    trigger={["click"]}
  >
    <FaBars className="menu-btn" />
  </Dropdown>
);
export default DropdownMenuLI;
