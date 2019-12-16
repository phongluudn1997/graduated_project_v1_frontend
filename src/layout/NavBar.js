import { Button, Icon, Drawer } from "antd";
import "./Nav.css";
import MenuCustom from "./Menu";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../public/img/logo.png";

export default class NavBar extends Component {
  state = {
    visible: false
  };
  showDrawer = () => {
    this.setState({
      visible: true
    });
  };
  onClose = () => {
    this.setState({
      visible: false
    });
  };
  render() {
    return (
      <div style={{ position: "relative" }}>
        <Link to="/">
          <img src={logo} style={{ maxHeight: "50px" }} />
        </Link>
        <MenuCustom mode="horizontal"></MenuCustom>
        <Button className="button-menu" onClick={this.showDrawer}>
          <Icon type="menu"></Icon>
        </Button>
        <Drawer
          placement="right"
          onClose={this.onClose}
          closable={false}
          visible={this.state.visible}
        >
          <MenuCustom mode="inline"></MenuCustom>
        </Drawer>
      </div>
    );
  }
}
