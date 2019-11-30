import React from "react";
import "./App.css";
import { Layout } from "antd";
import { Switch, Route } from "react-router-dom";
import NavBar from "./layout/NavBar";
import Home from "./Components/Home";
import Podcast from "./Components/Podcast";
import Blogs from "./Components/Blogs";
import Blog from "./Components/Blog";
import WritingService from "./Components/WritingService";
const { Header, Content, Footer } = Layout;

function App() {
  return (
    <div className="App">
      <Layout>
        <Header>
          <NavBar></NavBar>
        </Header>
        <Content>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/podcasts" component={Podcast}></Route>
            <Route exact path="/blogs" component={Blogs}></Route>
            <Route
              exact
              path="/writing-services"
              component={WritingService}
            ></Route>
            <Route path="/blogs/:_id" component={Blog}></Route>
          </Switch>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </div>
  );
}

export default App;
