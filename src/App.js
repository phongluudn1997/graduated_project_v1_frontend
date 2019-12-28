import React from "react";
import "./App.css";
import { Layout } from "antd";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import NavBar from "./layout/NavBar";
import Home from "./Components/Home";
import Podcasts from "./Components/Podcasts";
import Blogs from "./Components/Blogs";
import Blog from "./Components/Blog";
import WritingService from "./Components/WritingService";
import Login from "./Components/Login";
import { ProtectedRoute } from "./auth/protected.route";
import Profile from "./Components/Profile";
import AddWriting from "./Components/AddWriting";
import Writing from "./Components/Writing";
import Podcast from "./Components/Podcast";
import Register from "./Components/Register";
import Footer from "./Components/footer/Footer";

const { Header, Content } = Layout;

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register} />
          <Layout>
            <Header>
              <NavBar></NavBar>
            </Header>
            <Content style={{ backgroundColor: "lightgoldenrodyellow" }}>
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/podcasts" component={Podcasts}></Route>
              <Route exact path="/blogs" component={Blogs}></Route>
              <ProtectedRoute
                exact
                path="/writing-services"
                component={WritingService}
              />
              <Route path="/blogs/:_id" component={Blog}></Route>
              <Route path="/podcasts/:_id" component={Podcast} />
              <ProtectedRoute path="/profile" component={Profile} />
              {/* <ProtectedRoute
                exact
                path="/writing-services/new"
                component={AddWriting}
              />
              <ProtectedRoute
                path="/writing-services/:_id"
                component={Writing}
              /> */}

              <ProtectedRoute exact path="/writing-services-new">
                <AddWriting />
              </ProtectedRoute>
              <ProtectedRoute
                path="/writing-services/:_id"
                component={Writing}
              ></ProtectedRoute>
            </Content>
            <Footer></Footer>
          </Layout>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
