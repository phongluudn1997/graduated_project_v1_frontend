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
      console.log(result);
      this.setState({
        audio: result.data.doc,
        isLoading: false
      });
    });
  }

  render() {
    const { audio, isLoading } = this.state;
    return (
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <Card
              style={{ textAlign: "center" }}
              title={audio.title || "Title"}
            >
              <Paragraph style={{ textAlign: "start" }}>
                {audio.description}
              </Paragraph>
              <Row type="flex" justify="space-between">
                <Col span={6} style={{ textAlign: "start" }}>
                  {moment(audio.created_at).format("LL")}
                </Col>
                <Col span={6} style={{ textAlign: "end" }}>
                  By {audio.postedBy ? audio.postedBy.name : "Anonymouse"}
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
