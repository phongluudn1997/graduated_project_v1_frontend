import React from "react";
import "./App.css";
import { Layout } from "antd";
import { Switch, Route } from "react-router-dom";
import NavBar from "./layout/NavBar";
import Home from "./Components/Home";
import Podcast from "./Components/Podcast";
import Blogs from "./Components/Blogs";
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
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route exact path="/podcasts">
              <Podcast></Podcast>
            </Route>
            <Route exact path="/blogs">
              <Blogs></Blogs>
            </Route>
            <Route exact path="/writing-service">
              <WritingService></WritingService>
            </Route>
          </Switch>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </div>
  );
}

export default App;
