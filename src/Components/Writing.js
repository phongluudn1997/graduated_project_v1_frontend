import React, { Component } from "react";
import { Form, Input, Button, message, Radio, Row, Col } from "antd";
import { axiosInstance } from "../helper/axiosConfig";
import TextArea from "antd/lib/input/TextArea";
import TransformToFormData from "../helper/TransformToFormData";

class Writing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      loading: true
    };
  }
  fetch = async () => {
    try {
      console.log(this.props.match.params);
      const resp = await axiosInstance.get(
        `/writings/${this.props.match.params._id}`
      );
      this.setState({ data: resp.data.data });
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
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
      const resp = await axiosInstance.patch(
        `/writings/${this.props.match.params._id}`,
        data
      );
      console.log(resp);
      message.success(resp.data.message);
      this.props.history.push("/writing-services");
    } catch (error) {
      console.log(error);
    }
  };
  componentDidMount() {
    this.fetch();
  }
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Row type="flex" justify="center">
          <Col span={18}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Item label="Question">
                {getFieldDecorator("question", {
                  initialValue: this.state.data.question
                })(<Input disabled placeholder="Question" />)}
              </Form.Item>
              <Form.Item>
                <img
                  src={`http://localhost:3001/${this.state.data.image}`}
                ></img>
              </Form.Item>
              <Form.Item label="Body">
                {getFieldDecorator("body", {
                  initialValue: this.state.data.body
                })(<TextArea disabled placeholder="Question" />)}
              </Form.Item>
              {this.state.data.status == "Done" ? (
                <Form.Item label="Response">
                  {getFieldDecorator("responsePost", {
                    initialValue: this.state.data.responsePost
                  })(<TextArea disabled placeholder="Response" />)}
                </Form.Item>
              ) : null}
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create()(Writing);
