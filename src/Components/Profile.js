import React, { Component } from "react";
import { Row, Col, Button, Form, Input, Upload, message } from "antd";
import { axiosInstance } from "../helper/axiosConfig";
import TransformToFormData from "../helper/TransformToFormData";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      tempAvatarURL: ""
    };
  }
  handleChange = e => {
    console.log(e.target.files[0]);
    this.setState({
      tempAvatarURL: URL.createObjectURL(e.target.files[0]),
      user: { ...this.state.user, avatar: e.target.files[0] }
    });
  };
  fetch = async () => {
    try {
      const resp = await axiosInstance.get("/users/profile");
      console.log(resp);
      this.setState({ user: resp.data.user });
    } catch (error) {
      console.log(error);
      message.error(error.data.message);
    }
  };
  componentDidMount() {
    this.fetch();
  }
  handleSubmit = async e => {
    e.preventDefault();
    try {
      let values = await this.props.form.validateFields();
      await this.setState({
        user: { ...this.state.user, ...values }
      });
      const data = TransformToFormData(this.state.user);
      const resp = await axiosInstance.patch("/users/profile", data);
      message.success(resp.data.message);
      this.fetch();
    } catch (error) {
      console.log(error);
      message.error(error.data.message);
    }
  };
  render() {
    const { user } = this.state;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Row style={{ margin: "20px 0" }} type="flex" justify="center">
          <Col span={16}>
            <Row>
              <Col span={8}>
                <Row gutter={[0, 64]} type="flex" justify="center">
                  <Col>
                    <img
                      style={{ width: "100%", objectFit: "cover" }}
                      src={
                        this.state.tempAvatarURL
                          ? this.state.tempAvatarURL
                          : `http://localhost:3001/${this.state.user.avatar}`
                      }
                    />
                  </Col>
                </Row>
                <Row gutter={[0, 64]} type="flex" justify="center">
                  <Col>
                    <Button>
                      {" "}
                      <input
                        style={{
                          opacity: 0,
                          position: "absolute",
                          left: 0,
                          top: 0,
                          cursor: "pointer"
                        }}
                        type="file"
                        onChange={this.handleChange}
                        accept="image/*"
                      />
                      Change avatar
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Col span={16}>
                <Row gutter={[0, 64]} type="flex" justify="center">
                  <Col>CONTACT INFORMATION</Col>
                </Row>
                <Row gutter={[0, 64]} type="flex" justify="center">
                  <Col span={24}>
                    <Form>
                      <Form.Item {...formItemLayout} label="Name">
                        {getFieldDecorator("name", {
                          initialValue: `${user.name}`,
                          rules: [
                            {
                              required: true,
                              message: "Please input your name"
                            }
                          ]
                        })(<Input placeholder="Please input your name" />)}
                      </Form.Item>
                      <Form.Item {...formItemLayout} label="Address">
                        {getFieldDecorator("address", {
                          initialValue: `${user.address}`,
                          rules: [
                            {
                              required: true,
                              message: "Please input your address"
                            }
                          ]
                        })(<Input placeholder="Please input your address" />)}
                      </Form.Item>
                      <Form.Item {...formItemLayout} label="Email">
                        {getFieldDecorator("email", {
                          initialValue: `${user.email}`,
                          rules: [
                            {
                              required: true,
                              message: "Please input your email"
                            }
                          ]
                        })(
                          <Input
                            disabled
                            placeholder="Please input your email"
                          />
                        )}
                      </Form.Item>
                    </Form>
                  </Col>
                  <Button onClick={this.handleSubmit}>Save Infomation</Button>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create()(Profile);
