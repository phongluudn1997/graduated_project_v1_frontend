import React from "react";
import banner from "../../public/img/homeBanner.png";

export default function Banner() {
  const style = {
    background: { banner }
  };
  return (
    <div style={style}>
      <img src={banner} alt="img"></img>
    </div>
  );
}
