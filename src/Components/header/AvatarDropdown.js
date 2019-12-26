import React from "react";
import { Menu, message } from "antd";
import { Link } from "react-router-dom";
import auth from "../../auth/auth";
export default function(props) {
  return (
    <Menu>
      <Menu.Item>
        <Link to="users/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          auth.logout();
        }}
      >
        Log out
      </Menu.Item>
    </Menu>
  );
}
