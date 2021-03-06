import React from "react";
import { Row, Col } from "antd";

export default function Jumbotron(props) {
  return (
    <div style={props.style}>
      <Row gutter={[16, 24]} type="flex" justify="center" align="middle">
        <Col span={10}>{props.left}</Col>
        <Col span={10}>{props.right}</Col>
      </Row>
    </div>
  );
}
