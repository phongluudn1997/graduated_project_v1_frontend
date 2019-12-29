import React, { Component } from "react";
import background2 from "../public/img/gradient.png";
import { Redirect, withRouter, Link } from "react-router-dom";
import {
  Row,
  Form,
  Input,
  Icon,
  Button,
  Checkbox,
  Typography,
  Divider,
  message
} from "antd";
import axios from "axios";
import auth from "../auth/auth";

const { Title } = Typography;

class Login extends Component {
  constructor(props) {
    super(props);
  }
  handleSubmit = async e => {
    e.preventDefault();
    let { from } = this.props.location.state || { from: { pathname: "/" } };
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        axios
          .post("http://localhost:3001/users/login", values)
          .then(res => {
            console.log(res);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.user._id);
            auth.login(() => this.props.history.push(from.pathname));
          })
          .catch(error => {
            if (error.response) {
              message.error(error.response.data.message);
            } else {
              message.error(error);
            }
          });
      } else {
        return;
      }
    });
  };
  componentDidMount() {
    auth.logout(() => {
      console.log("log out");
    });
    localStorage.clear();
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div
        style={{
          backgroundImage: "url(" + background2 + ")",
          minHeight: "900px"
        }}
      >
        <Row type="flex" justify="center" style={{ padding: "100px" }}>
          <Divider>
            <Title level={1}>Login</Title>
          </Divider>
          <Form onSubmit={this.handleSubmit} style={{ minWidth: "300px" }}>
            <Form.Item>
              {getFieldDecorator("email", {
                rules: [{ required: true, message: "Please input your Email!" }]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Email"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "Please input your Password!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Link style={{ color: "black" }} to="/register">
                Yet have an account?
              </Link>
            </Form.Item>
            <Form.Item>
              <Row type="flex" justify="center">
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </Row>
            </Form.Item>
          </Form>
        </Row>
      </div>
    );
  }
}

export default Form.create()(Login);
