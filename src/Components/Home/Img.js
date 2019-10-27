import React from "react";

export default function Img(props) {
  return (
    <div>
      <img
        style={{ display: "block", margin: "auto", maxHeight: "250px" }}
        src={props.src}
        alt="img"
      ></img>
    </div>
  );
}
