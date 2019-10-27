import React from "react";
import { Button } from "antd";

export default function CenterButton(props) {
  return (
    <div>
      <Button style={{ display: "block", margin: "auto" }}>
        {props.children}
      </Button>
    </div>
  );
}
