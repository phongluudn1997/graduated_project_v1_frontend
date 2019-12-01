import React, { Component } from "react";
import { axiosInstance } from "../helper/axiosConfig";
import { message, Row, Col, Typography, Tag } from "antd";
import moment from "moment";

export default class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
      loading: true
    };
  }
  fetch = async () => {
    const { _id } = this.props.match.params;
    try {
      const resp = await axiosInstance.get(`/posts/${_id}`);
      console.log(resp);
      this.setState({
        post: resp.data.doc
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
  render() {
    const { post, loading } = this.state;
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
                        ? `http://localhost:3001/${post.image}`
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
                    Posted by: {post.postedBy.name}
                  </Typography.Text>
                </Col>
              </Row>
            </Col>
          </Row>
        )}
      </div>
    );
  }
}
