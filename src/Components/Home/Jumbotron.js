import React from "react";
import { Row, Col } from "antd";

export default function Jumbotron(props) {
  const style = {
    padding: "10px"
  };
  return (
    <div style={style}>
      <Row type="flex" justify="center" align="middle">
        <Col span={8}>{props.left}</Col>
        <Col span={8}>{props.right}</Col>
      </Row>
    </div>
  );
}
