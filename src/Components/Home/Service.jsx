import React from "react";
import CenterButton from "./CenterButton";
import { Link } from "react-router-dom";

export default function Service(props) {
  const { service, button } = props;
  const list = service.map((s, index) => {
    return (
      <li key={index} style={{ margin: "5px 0px" }}>
        {s}
      </li>
    );
  });
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{props.nameService}</h1>
      <ul>{list}</ul>
      <CenterButton>
        <Link to={props.link}>{button}</Link>
      </CenterButton>
    </div>
  );
}
