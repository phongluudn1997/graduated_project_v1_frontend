import React, { Component } from "react";
import { Menu, Avatar, message, Icon } from "antd";
import { Link, withRouter } from "react-router-dom";
import auth from "../auth/auth";
import axios from "axios";

class MenuCustom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }
  componentDidMount() {
    this.fetch();
  }
  fetch = async () => {
    if (auth.isAuthenticated()) {
      try {
        const resp = await axios.get(
          `http://localhost:3001/users/${localStorage.getItem("userId")}`
        );
        console.log(resp);
        this.setState({
          user: resp.data.user
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  render() {
    const { user } = this.state;
    return (
      <Menu
        className="menu"
        theme="light"
        mode={this.props.mode}
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
            title={
              <Avatar
                src={
                  user.avatar
                    ? `http://localhost:3001/${user.avatar}`
                    : "https://cdn0.iconfinder.com/data/icons/avatars-3/512/avatar_smart_guy-512.png"
                }
                alt="avatar"
              />
            }
          >
            <Menu.Item>
              <Link to="/profile">Profile</Link>
            </Menu.Item>
            <Menu.Item
              props={this.props}
              onClick={() => {
                auth.logout(() => console.log("log out"));
                this.props.history.push("/");
              }}
            >
              Logout
            </Menu.Item>
          </Menu.SubMenu>
        )}
      </Menu>
    );
  }
}
export default withRouter(MenuCustom);
