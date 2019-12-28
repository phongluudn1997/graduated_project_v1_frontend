import React, { Component } from "react";
import {
  Button,
  Icon,
  Divider,
  message,
  Table,
  Popconfirm,
  Tag,
  Row,
  Col,
  Typography
} from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import { axiosInstance } from "../helper/axiosConfig";
export default class WritingService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: []
    };
    this.color = {
      Pending: "green",
      listening: "magenta",
      Done: "volcano",
      writing: "purple"
    };
    this.columns = [
      {
        title: "Question",
        dataIndex: "question",
        width: "600px"
      },
      {
        title: "Image",
        dataIndex: "image",
        render: image => (
          <img
            style={{ maxWidth: "300px" }}
            src={`http://localhost:3001/${image}`}
          ></img>
        )
      },
      {
        title: "Posted at",
        dataIndex: "postedAt",
        render: postedAt => (
          <Typography.Text>
            {moment(postedAt).format("MMM Do YY")}
          </Typography.Text>
        )
      },
      {
        title: "Status",
        dataIndex: "status",
        render: status => <Tag color={this.color[status]}>{status}</Tag>
      }
    ];
  }

  fetch = async () => {
    try {
      const resp = await axiosInstance.get("/writings/myWritings");
      console.log(resp);
      this.setState({ data: resp.data.data });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.fetch();
  }

  render() {
    const { data, loading } = this.state;
    return (
      <div>
        <Row type="flex" justify="center">
          <Col span={18}>
            <Button style={{ margin: "20px 0" }}>
              <Link to="/writing-services-new">Add new</Link>
            </Button>
            <Table
              onRow={(record, rowIndex) => {
                return {
                  onClick: e => {
                    console.log(record._id);
                    this.props.history.push(`/writing-services/${record._id}`);
                  }
                };
              }}
              style={{ background: "aliceblue" }}
              bordered={false}
              rowKey={record => record._id}
              columns={this.columns}
              dataSource={data}
              // loading={false}
              pagination={{ defaultPageSize: 5 }}
            ></Table>
          </Col>
        </Row>
      </div>
    );
  }
}
