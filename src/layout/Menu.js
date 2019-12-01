import React from "react";
import { Menu, Avatar, message, Icon } from "antd";
import { Link, withRouter } from "react-router-dom";
import auth from "../auth/auth";
import axios from "axios";

function MenuCustom(props) {
  const getUser = async () => {
    if (auth.isAuthenticated()) {
      try {
        const resp = await axios.get(
          `http://localhost:3001/users/${localStorage.getItem("userId")}`
        );
        return resp.data.user;
      } catch (error) {
        console.log(error);
      }
    }
    return null;
  };
  const user = getUser();
  console.log(props);
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
      {!auth.isAuthenticated() ? (
        <Menu.Item>
          <Link to="/login">Login</Link>
        </Menu.Item>
      ) : (
        <Menu.SubMenu
          title={<Avatar src={`localhost:3001/${user.avatar}`} alt="avatar" />}
        >
          <Menu.Item>Profile</Menu.Item>
          <Menu.Item
            props={props}
            onClick={() => {
              auth.logout(() => console.log("log out"));
              props.history.push("/");
            }}
          >
            Logout
          </Menu.Item>
        </Menu.SubMenu>
      )}
    </Menu>
  );
}

export default withRouter(MenuCustom);
