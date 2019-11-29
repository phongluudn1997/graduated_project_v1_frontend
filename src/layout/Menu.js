import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
export default function MenuCustom(props) {
  return (
    <Menu
      className="menu"
      theme="light"
      mode={props.mode}
      style={{ lineHeight: "64px", float: "right" }}
    >
      <Menu.Item key="1">
        <Link to="/podcasts">Podcast</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/blogs">Blogs</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/writing-services">Writing Service</Link>
      </Menu.Item>
      <Menu.Item>Sign in</Menu.Item>
    </Menu>
  );
}
