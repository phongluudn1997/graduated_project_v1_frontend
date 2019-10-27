import React, { Component } from "react";
import { Card, Typography, Row, Col } from "antd";
import { GET_PODCAST_API, HOST } from "../../global";
import moment from "moment";
import axios from "axios";

const { Paragraph } = Typography;

export default class Audio extends Component {
  state = {
    audio: null,
    isLoading: true
  };

  componentDidMount() {
    axios.get(`${GET_PODCAST_API}/latest`).then(result => {
      this.setState({
        audio: result.data.doc,
        isLoading: false
      });
      console.log(this.state.audio);
    });
  }

  render() {
    const { audio, isLoading } = this.state;
    console.log(audio);
    return (
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <Card style={{ textAlign: "center" }} title={audio.title}>
              <Paragraph style={{ textAlign: "start" }}>
                {audio.description}
              </Paragraph>
              <Row type="flex" justify="space-between">
                <Col span={6} style={{ textAlign: "start" }}>
                  {moment(audio.created_at).format("LL")}
                </Col>
                <Col span={6} style={{ textAlign: "end" }}>
                  By {audio.postedBy.name}
                </Col>
              </Row>
              <audio controls src={`${HOST}/${audio.audio}`}></audio>
            </Card>
          </div>
        )}
      </div>
    );
  }
}
