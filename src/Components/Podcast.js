import React, { Component } from "react";
import { Icon, List, Avatar, Row, Col, message, Card } from "antd";
import { axiosInstance } from "../helper/axiosConfig";
import moment from "moment";

export default class Podcast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      loading: true
    };
  }

  fetch = async () => {
    try {
      const resp = await axiosInstance.get("/podcasts");
      console.log(resp);
      this.setState({ listData: resp.data.data, loading: false });
    } catch (error) {
      message.error(error.data.message);
    }
  };

  componentDidMount() {
    this.fetch();
  }

  redirect = _id => {
    this.props.history.push(`/podcasts/${_id}`);
  };

  render = () => {
    const { listData, loading } = this.state;
    const latestPodcast = listData[0];
    console.log(latestPodcast);
    console.log(listData);
    return loading ? (
      "loading"
    ) : (
      <Row type="flex" justify="center">
        <Col span={14}>
          <Card
            onClick={() => this.redirect(latestPodcast._id)}
            style={{ margin: "20px 0" }}
            cover={
              <img
                style={{ maxHeight: "250px", objectFit: "cover" }}
                src={`http://localhost:3001/${latestPodcast.image}`}
              />
            }
            hoverable={true}
            title={latestPodcast.title}
            headStyle={{
              color: "tomato",
              fontWeight: "700",
              fontSize: "x-large"
            }}
          >
            <div>{latestPodcast.description}</div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
                alignItems: "center"
              }}
            >
              <audio
                src={`http://localhost:3001/${latestPodcast.audio}`}
                controls
              ></audio>
              <span>{moment(latestPodcast.created_at).format("ll")}</span>
            </div>
          </Card>
          <List
            grid={{ column: 2, gutter: 64 }}
            size="large"
            pagination={{
              onChange: page => {
                console.log(page);
              },
              pageSize: 3
            }}
            dataSource={listData.filter((value, index) => index > 0)}
            renderItem={item => (
              <List.Item>
                <Card
                  onClick={() => this.redirect(item._id)}
                  hoverable={true}
                  tabBarExtraContent={<span>Hey</span>}
                  title={item.title}
                  headStyle={{
                    color: "tomato",
                    fontWeight: "700"
                  }}
                >
                  {item.description}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "10px"
                    }}
                  >
                    <audio
                      src={`http://localhost:3001/${latestPodcast.audio}`}
                      controls
                    ></audio>
                  </div>
                </Card>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    );
  };
}
