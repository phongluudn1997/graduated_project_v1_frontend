import React, { Component } from "react";
import { axiosInstance } from "../helper/axiosConfig";
import {
  message,
  Row,
  Col,
  Typography,
  Tag,
  Comment,
  Form,
  Button,
  Input
} from "antd";
import auth from "../auth/auth";
import moment from "moment";
import * as constant from "../helper/constant";
const { TextArea } = Input;

export default class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
      loading: true,
      comments: [],
      submitting: false,
      value: ""
    };
  }
  fetch = async () => {
    const { _id } = this.props.match.params;
    try {
      const resp = await axiosInstance.get(`/posts/${_id}`);
      console.log(resp);
      this.setState({
        post: resp.data.doc,
        comments: resp.data.comments
      });
    } catch (error) {
      console.log(error);
      message.error(error.data.message);
    }
    this.setState({ loading: false });
  };
  componentDidMount() {
    this.fetch();
  }
  handleChange = e => {
    this.setState({ value: e.target.value });
  };
  handleSubmit = async _id => {
    try {
      const data = await axiosInstance.post("/posts/comment", {
        content: this.state.value,
        postId: _id
      });
      message.success(data.data.message);
      this.setState({ value: "", submitting: false });
      this.fetch();
    } catch (error) {
      message.error(error.data.message);
      this.setState({ submitting: false });
    }
  };
  render() {
    const { post, loading, comments, value, submitting } = this.state;
    const { _id } = this.props.match.params;
    return (
      <div>
        {loading ? (
          "loading"
        ) : (
          <Row type="flex" justify="center">
            <Col span={16}>
              <Row type="flex" justify="center">
                <Col>
                  <Typography.Title level={2}>{post.title}</Typography.Title>
                </Col>
              </Row>
              <Row
                type="flex"
                justify="space-between"
                style={{ marginBottom: "20px" }}
              >
                <Col>
                  <Tag color="red">{post.type.toUpperCase()}</Tag>
                </Col>
                <Col>
                  <Typography.Text>
                    {" "}
                    Created at: {moment(post.created_at).format("MMMM Do YYYY")}
                  </Typography.Text>
                </Col>
              </Row>
              <Row
                type="flex"
                justify="center"
                style={{ marginBottom: "20px" }}
              >
                <Col>
                  <img
                    style={{ maxWidth: "532px" }}
                    src={
                      post.image
                        ? `${constant.HOSTNAME}/${post.image}`
                        : "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                    }
                  />
                </Col>
              </Row>
              <Row>
                <Typography.Paragraph>{post.body}</Typography.Paragraph>
              </Row>
              <Row type="flex" justify="end">
                <Col>
                  <Typography.Text>
                    Posted by:{" "}
                    {post.postedBy ? post.postedBy.name : "Anonymous"}
                  </Typography.Text>
                </Col>
              </Row>
              {auth.isAuthenticated() ? (
                <div style={{ marginTop: "20px" }}>
                  <Form.Item>
                    <TextArea
                      rows={4}
                      onChange={this.handleChange}
                      value={value}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      htmlType="submit"
                      loading={submitting}
                      onClick={() => this.handleSubmit(_id)}
                      type="primary"
                    >
                      Add Comment
                    </Button>
                  </Form.Item>
                </div>
              ) : null}
              {comments.map(c => (
                <Comment
                  key={c._id}
                  author={<a>{c.postedBy.name}</a>}
                  content={c.content}
                  datetime={moment(c.dateTime).fromNow()}
                  avatar={
                    <img
                      src={`${constant.HOSTNAME}/${c.postedBy.avatar}`}
                    ></img>
                  }
                />
              ))}
            </Col>
          </Row>
        )}
      </div>
    );
  }
}
