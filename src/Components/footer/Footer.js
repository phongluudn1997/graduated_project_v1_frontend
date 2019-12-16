import React from "react";
import { Row, Col, Divider, Icon } from "antd";
import logo from "../../public/img/logo.png";
import "./footer.css";

export default function Footer() {
  return (
    <React.Fragment>
      <Divider></Divider>
      <Row className="main" type="flex" justify="center" align="middle">
        <Col span={6}>
          <div>
            <img style={{ width: "50px" }} src={logo} alt="logo" />
          </div>
          <div>
            <span>
              I am guy who know nothing always looking for new and creative
              ideas to help you with our products in your everyday work.
            </span>
          </div>
        </Col>
        <Col span={6}>
          <div>
            <h3>Contact</h3>
          </div>
          <table>
            <tbody>
              <tr>
                <td>
                  <Icon type="phone" theme="filled" />
                </td>
                <td>0789.390.224</td>
              </tr>
              <tr>
                <td>
                  <Icon type="home" theme="filled" />
                </td>
                <td>K69/04 Ngo Thi Nham, Lien Chieu, Da Nang</td>
              </tr>
              <tr>
                <td>
                  <Icon type="mail" theme="filled" />
                </td>
                <td>huynhpluu@gmail.com</td>
              </tr>
            </tbody>
          </table>
        </Col>
        <Col span={6}>
          <div>
            <h3>Contact</h3>
          </div>
          <table>
            <tbody>
              <tr>
                <td>
                  <Icon type="facebook" theme="filled" />
                </td>
                <td>Huỳnh Phong Lưu</td>
              </tr>
              <tr>
                <td>
                  <Icon type="medium" />
                </td>
                <td>medium.com/luuhuynhphong</td>
              </tr>
              <tr>
                <td>
                  <Icon type="twitter" />
                </td>
                <td>Huynh Phong Luu</td>
              </tr>
            </tbody>
          </table>
        </Col>
      </Row>
    </React.Fragment>
  );
}
