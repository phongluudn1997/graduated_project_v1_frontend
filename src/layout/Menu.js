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
      <Menu.SubMenu title={<span>Blogs</span>}>
        <Menu.Item>
          <Link to="/posts/reading">Reading</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/posts/listening">Listening</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/posts/speaking">Speaking</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/posts/writing">Writing</Link>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.Item key="3">
        <Link to="/writing-service">Writing Service</Link>
      </Menu.Item>
      <Menu.Item>Sign in</Menu.Item>
    </Menu>
  );
}
