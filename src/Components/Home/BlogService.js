import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Typography, Menu, Tag, Tabs, Button } from "antd";
import { GET_POST_API, GET_POST_READING_API } from "../../global";
import axios from "axios";
import { Item } from "rc-menu";
const { TabPane } = Tabs;

export default class BlogService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: ["Reading", "Listening", "Speaking", "Writing"],
      post: ""
    };
  }

  onTabClick = async (key, event) => {
    let post = await axios.get(`${GET_POST_API}/${key}/latest`);
    console.log(post);
    this.setState({ ...this.state, post: post.data.doc });
  };

  async componentDidMount() {
    let post = await axios.get(`${GET_POST_API}/${this.state.type[0]}/latest`);
    console.log(post);
    this.setState({ ...this.state, post: post.data.doc });
  }

  render() {
    const { post } = this.state;
    console.log(post);
    return (
      <div style={{ padding: "50px 0" }}>
        <h3 style={{ textAlign: "center" }}>Checkout our latest blogs</h3>
        <Row type="flex" justify="center">
          <Col span={16}>
            <Tabs onTabClick={this.onTabClick}>
              {this.state.type.map(type => {
                return (
                  <TabPane tab={type} key={type}>
                    <Button style={{ padding: "0" }} type="link" size="large">
                      {post.title}
                    </Button>
                    <div>
                      <span>{post.body}</span>
                      <Row
                        type="flex"
                        justify="space-between"
                        style={{ margin: "5px 0" }}
                      >
                        <Col span={8}>
                          Posted by:{" "}
                          {post.postedBy ? post.postedBy.name : "anonymous"}
                        </Col>
                        <Col span={8}>
                          In: <Tag color="red">{type}</Tag>
                        </Col>
                      </Row>
                    </div>
                  </TabPane>
                );
              })}
            </Tabs>
          </Col>
        </Row>
      </div>
    );
  }
}
