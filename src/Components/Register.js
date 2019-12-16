import React, { Component } from "react";
import background2 from "../public/img/gradient.png";
import { Redirect, withRouter } from "react-router-dom";
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

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false
    };
  }

  handleSubmit = async e => {
    e.preventDefault();
    console.log("here");
    try {
      const values = await this.props.form.validateFields();
      console.log(values);
      const data = {
        email: values.email,
        name: values.name,
        password: values.password
      };
      const resp = await axios.post(
        "http://localhost:3001/users/register",
        data
      );
      message.success(resp.data.message);
      this.props.history.push("/login");
    } catch (error) {
      if (error.response) {
        message.error(error.response.data.message);
      } else {
        return;
      }
    }
  };

  componentDidMount() {
    auth.logout(() => {
      console.log("log out");
    });
    localStorage.clear();
  }
  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("You must confirm the same password");
    } else {
      callback();
    }
  };
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
            <Title level={1}>Register</Title>
          </Divider>
          <Form onSubmit={this.handleSubmit} style={{ minWidth: "300px" }}>
            <Form.Item label="Email">
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
            <Form.Item label="Name">
              {getFieldDecorator("name", {
                rules: [{ required: true, message: "Please enter user name" }]
              })(<Input placeholder="Please enter user name" />)}
            </Form.Item>
            <Form.Item label="Password">
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "Please input your Password!" },
                  { validator: this.validateToNextPassword }
                ]
              })(
                <Input.Password
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Please enter the password"
                />
              )}
            </Form.Item>
            <Form.Item label="Confirm Password">
              {getFieldDecorator("confirm", {
                rules: [
                  {
                    required: true,
                    message: "Please confirm your password!"
                  },
                  { validator: this.compareToFirstPassword }
                ]
              })(
                <Input.Password
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  onBlur={this.handleConfirmBlur}
                  placeholder="Please enter the password"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Row type="flex" justify="center">
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              </Row>
            </Form.Item>
          </Form>
        </Row>
      </div>
    );
  }
}

export default Form.create()(Register);
