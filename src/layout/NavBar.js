import { Button, Icon, Drawer } from "antd";
import "./Nav.css";
import MenuCustom from "./Menu";
import React, { Component } from "react";
import { Link } from "react-router-dom";

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
        <Link to="/" className="logo"></Link>
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
