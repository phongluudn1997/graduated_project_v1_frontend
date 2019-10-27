import React from "react";
import { Link } from "react-router-dom";
import CenterButton from "./CenterButton";

export default function WritingService() {
  const service = [
    "Correction of ALL grammar and vocabulary mistakes.",
    "Suggestions on how to improve your ideas, vocabulary, writing skills, academic language and structure.",
    "A detailed examiner’s report on each of the four marking criteria and ways to improve your score.",
    "Accurate IELTS band scores for all 4 criteria.",
    "Band 9 sample answer."
  ];
  const list = service.map((s, index) => {
    return (
      <li key={index} style={{ margin: "5px 0px" }}>
        {s}
      </li>
    );
  });
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Writing Service</h1>
      <ul>{list}</ul>
      <CenterButton>
        <Link to="/writingServices">Ask me</Link>
      </CenterButton>
    </div>
  );
}
