import React from "react";
import "./App.css";
import { Layout } from "antd";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import NavBar from "./layout/NavBar";
import Home from "./Components/Home";
import Podcast from "./Components/Podcast";
import Blogs from "./Components/Blogs";
import Blog from "./Components/Blog";
import WritingService from "./Components/WritingService";
import Login from "./Components/Login";
import { ProtectedRoute } from "./auth/protected.route";

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Layout>
            <Header>
              <NavBar></NavBar>
            </Header>
            <Content>
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/podcasts" component={Podcast}></Route>
              <Route exact path="/blogs" component={Blogs}></Route>
              <ProtectedRoute
                exact
                path="/writing-services"
                component={WritingService}
              ></ProtectedRoute>
              <Route path="/blogs/:_id" component={Blog}></Route>
            </Content>
            <Footer>Footer</Footer>
          </Layout>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
