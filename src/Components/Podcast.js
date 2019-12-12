import React, { Component } from "react";
import { axiosInstance } from "../helper/axiosConfig";
import { message, Row, Col, Divider } from "antd";
import moment from "moment";

export default class Podcast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }
  fetch = async () => {
    const { _id } = this.props.match.params;
    console.log(_id);
    try {
      const resp = await axiosInstance.get(`/podcasts/${_id}`);
      console.log(resp);
      this.setState({ data: resp.data.doc });
    } catch (error) {
      message.error(error.data.message);
    }
  };
  componentDidMount() {
    this.fetch();
  }
  render() {
    const podcast = this.state.data;
    return (
      <Row type="flex" justify="center">
        <Col span={16}>
          <Row gutter={[16, 16]} type="flex" justify="center">
            <Col>
              <h1
                style={{
                  marginTop: "20px",
                  color: "darkOrange",
                  fontSize: "x-large",
                  fontWeight: "bolder"
                }}
              >
                {podcast.title}
              </h1>
            </Col>
          </Row>
          <Row gutter={[16, 16]} type="flex" justify="center">
            <Col>
              <audio src={`http://localhost:3001/${podcast.audio}`} controls />
            </Col>
          </Row>
          <Row gutter={[16, 16]} type="flex" justify="center">
            <Col>
              <img src={`http://localhost:3001/${podcast.image}`} />
            </Col>
          </Row>
          <Row gutter={[16, 16]} type="flex" justify="end">
            <Col>
              <span>{moment(podcast.created_at).format("ll")}</span>
            </Col>
          </Row>
          <Divider />
          <Row gutter={[16, 16]}>
            <Col>{podcast.description}</Col>
          </Row>
          <Divider />
          <Row gutter={[16, 16]}>
            <Col>{podcast.transcript}</Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
