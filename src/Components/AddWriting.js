import React, { Component } from "react";
import TransformToFormData from "../helper/TransformToFormData";
import {
  Form,
  Input,
  Button,
  message,
  Radio,
  Row,
  Col,
  Icon,
  Typography
} from "antd";
import { axiosInstance } from "../helper/axiosConfig";

const { TextArea } = Input;

class AddWriting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      tempAvatarURL: ""
    };
  }
  handleChange = e => {
    console.log(e.target.files[0]);
    this.setState({
      tempAvatarURL: URL.createObjectURL(e.target.files[0]),
      data: { ...this.state.user, image: e.target.files[0] }
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    try {
      let values = await this.props.form.validateFields();
      await this.setState({
        data: { ...this.state.data, ...values }
      });
      console.log(this.state.data);
      const data = TransformToFormData(this.state.data);
      const resp = await axiosInstance.post("/writings", data);
      console.log(resp);
      message.success(resp.data.message);
      console.log(this.props);
      this.props.history.push("/writing-services");
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Row type="flex" justify="center">
          <Col span={18}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Item label="Question">
                {getFieldDecorator("question", {
                  rules: [
                    { required: true, message: "Please input your Question!" }
                  ]
                })(<Input placeholder="Question" />)}
              </Form.Item>
              <Form.Item
                label={
                  <>
                    <Typography.Text>Upload Image</Typography.Text>
                  </>
                }
              >
                <Button style={{ display: "block" }}>
                  <input
                    style={{
                      opacity: 0,
                      position: "absolute",
                      left: 0,
                      top: 0,
                      cursor: "pointer",
                      width: "-webkit-fill-available"
                    }}
                    type="file"
                    onChange={this.handleChange}
                    accept="image/*"
                  />
                  <Icon type="file-add" />
                </Button>
                <img
                  style={{
                    marginTop: "20px",
                    maxWidth: "500px",
                    objectFit: "cover"
                  }}
                  src={
                    this.state.tempAvatarURL ? this.state.tempAvatarURL : null
                  }
                />
              </Form.Item>
              <Form.Item label="Your writing">
                {getFieldDecorator("body", {
                  rules: [
                    { required: true, message: "Please input your writing!" }
                  ]
                })(<TextArea rows="10" placeholder="Body" />)}
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit">Submit</Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Form.create()(AddWriting);
