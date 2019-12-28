import React, { Component } from "react";
import { Icon, List, Button, Row, Col, Tag, Typography, Radio } from "antd";
import { Link } from "react-router-dom";
import { axiosInstance } from "../helper/axiosConfig";

const { Title } = Typography;

export default class Blogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true,
      listData: [],
      type: ""
    };
    this.color = {
      reading: "magenta",
      listening: "volcano",
      speaking: "gold",
      writing: "lime"
    };
  }

  fetch = async type => {
    try {
      const resp = await axiosInstance.get("/posts", {
        params: {
          type
        }
      });
      console.log(resp);
      this.state.posts = resp.data.docs;
      console.log(this.state.posts);
      this.setState({
        listData: this.state.posts.map(post => {
          return {
            href: `/blogs/${post._id}`,
            title: post.title,
            content: post.body,
            type: post.type,
            image: post.image
              ? `http://localhost:3001/${post.image}`
              : "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          };
        })
      });
      this.setState({ loading: false });
      console.log(this.state.listData);
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    console.log("Did mount");
    this.fetch();
  }

  handleChange = e => {
    console.log(e.target.value);
    this.setState({ type: e.target.value });
    this.fetch(e.target.value);
  };

  shortenString = (str, maxWords, seperator) => {
    return str.substr(0, str.lastIndexOf(seperator, maxWords));
  };

  render() {
    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );
    console.log("render");
    return (
      <>
        {this.state.loading ? (
          "loading"
        ) : (
          <>
            <Row style={{ margin: "20px" }} type="flex" justify="space-around">
              <Col>
                <Button type="link">
                  <Title
                    code
                    level={3}
                    onClick={() => {
                      this.fetch();
                      this.setState({ type: null });
                    }}
                  >
                    Blogs
                  </Title>
                </Button>
              </Col>
              <Col>
                <Radio.Group
                  value={this.state.type}
                  onChange={this.handleChange}
                >
                  <Radio.Button value="reading">Reading</Radio.Button>
                  <Radio.Button value="listening">Listening</Radio.Button>
                  <Radio.Button value="speaking">Speaking</Radio.Button>
                  <Radio.Button value="writing">Writing</Radio.Button>
                </Radio.Group>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Col span={16}>
                <List
                  itemLayout="vertical"
                  size="large"
                  pagination={{
                    onChange: page => {
                      console.log(page);
                    },
                    pageSize: 3
                  }}
                  dataSource={this.state.listData}
                  renderItem={item => (
                    <List.Item
                      key={item.title}
                      extra={
                        <img
                          style={{ objectFit: "cover" }}
                          height={180}
                          width={272}
                          alt="logo"
                          src={item.image}
                        />
                      }
                    >
                      <List.Item.Meta
                        title={
                          <Link style={{ color: "DarkOrange " }} to={item.href}>
                            {item.title}
                          </Link>
                        }
                      />
                      {`${this.shortenString(item.content, 500, " ")}...`}
                    </List.Item>
                  )}
                />
              </Col>
            </Row>
          </>
        )}
      </>
    );
  }
}
