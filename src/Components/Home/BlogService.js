import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Typography, Menu, Tag, Tabs, Button } from "antd";
const { TabPane } = Tabs;

export default function BlogService() {
  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Checkout our latest blogs</h3>
      <Row type="flex" justify="center">
        <Col span={16}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Reading" key="1">
              <h3>Title of post</h3>
              <div>
                <span>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting // industry. Lorem Ipsum has been the industry's
                  standard dummy text // ever since the 1500s, when an unknown
                  printer took a galley of // type and scrambled it to make a
                  type specimen book. It has // survived not only five
                  centuries, but also the leap into // electronic typesetting,
                  remaining essentially unchanged. It was // popularised in the
                  1960s with the release of Letraset sheets // containing Lorem
                  Ipsum passages, and more recently with desktop // publishing
                  software like Aldus PageMaker including versions of // Lorem
                  Ipsum.{" "}
                  <Button type="link">
                    <Link to="/blogs">Check out more</Link>
                  </Button>
                </span>
                <Row
                  type="flex"
                  justify="space-between"
                  style={{ margin: "5px 0" }}
                >
                  <Col span={8}>Posted by: Someone else</Col>
                  <Col span={8}>In: Somewhere</Col>
                  <Col span={8}>
                    <Tag color="red">Reading</Tag>
                  </Col>
                </Row>
              </div>
            </TabPane>
            <TabPane tab="Tab 2" key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="Tab 3" key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
          ,
        </Col>
      </Row>
    </div>
  );
}
