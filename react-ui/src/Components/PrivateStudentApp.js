import "../App.css";
import React from "react";
import axios from "axios";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LessonPage from "./LessonPage";
import LessonHistoryTable from "./LessonHistoryTable";

class PrivateStudentApp extends React.Component {
  constructor(props) {
    super(props);

    // initialise the state:
    this.state = {
      isLoading: false,
      lessonHistoryArray: [],
      difficultyLevel: null,
    };
  }

  componentDidMount() {
    // send a get request to the backend with the token
    this.setState({ isLoading: true });
    let access_token = window.localStorage.getItem("AuthToken");
    axios
      .get("/getstudenthistory", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        // getting the list of lessons once the student has logged in and been authenticated
        this.setState({
          lessonHistoryArray: res.data.lessonHistoryArray,
          isLoading: false,
          difficultyLevel: res.data.difficultyLevel,
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ isLoading: false });
      });
  }

  render() {
    return (
      <div>
        <Router>
          <Navbar bg="primary" expand="lg" variant="dark">
            <Container>
              <Navbar.Brand>Welcome, {this.props.username} </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                  <Navbar.Text>
                    <Link to="/">
                      <span className="navbarLink">Home</span>
                    </Link>
                  </Navbar.Text>
                  <Navbar.Text>
                    <Link to="/nextlesson">
                      <span className="navbarLink">Start your next lesson</span>
                    </Link>
                  </Navbar.Text>
                  <Nav.Link onClick={this.props.handleLogout}>
                    <span className="navbarLink">Log out</span>
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <Switch>
            <Route path="/nextlesson">
              <LessonPage
                username={this.props.username}
                difficultyLevel={this.state.difficultyLevel}
              />
            </Route>

            {/* home needs to be at the bottom as the switch displays the first route that matches the link */}
            <Route path="/">
              <div id="classTable">
                <h2 className="classAbout">
                  Welcome to your lesson History! Here you can see all of your
                  results from previous lessons! 👨‍🎓
                </h2>
                <LessonHistoryTable
                  lessonHistoryArray={this.state.lessonHistoryArray}
                />
              </div>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default PrivateStudentApp;
