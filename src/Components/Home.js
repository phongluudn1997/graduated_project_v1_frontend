import React from "react";
import Jumbotron from "./Home/Jumbotron";
import Banner from "./Home/Banner";
import Audio from "./Home/Audio";
import writingPic from "../public/img/writingPic.jpeg";
import Img from "./Home/Img";
import Service from "./Home/Service";
import Podcast from "./Podcast";
import BlogService from "./Home/BlogService";
export default function Home() {
  const writingService = [
    "Correction of ALL grammar and vocabulary mistakes.",
    "Suggestions on how to improve your ideas, vocabulary, writing skills, academic language and structure.",
    "A detailed examiner’s report on each of the four marking criteria and ways to improve your score.",
    "Accurate IELTS band scores for all 4 criteria.",
    "Band 9 sample answer."
  ];
  const podcastService = [
    "Luke’s English Podcast is an award-winning audio show for learners of English as a foreign language.",
    "The podcast started in 2009 and is still going strong.",
    "The podcast has won 5 awards, received a British Council ELTon nomination and has now been downloaded over 50 million times."
  ];
  return (
    <div>
      <Jumbotron
        left={<Img src={writingPic}></Img>}
        right={
          <Service
            nameService={"Writing Service"}
            service={writingService}
            link="/writing-services"
            button={"Ask me"}
          ></Service>
        }
      ></Jumbotron>
      <Jumbotron
        left={
          <Service
            nameService="Podcast"
            service={podcastService}
            link="/podcasts"
            button="Check out"
          ></Service>
        }
        right={<Audio></Audio>}
      ></Jumbotron>
      <BlogService />
    </div>
  );
}
