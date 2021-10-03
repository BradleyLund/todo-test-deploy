import "../App.css";
import React from "react";
import axios from "axios";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AddStudent from "./AddStudent";
import EditStudent from "./EditStudent";
import DifficultyExamples from "./DifficultyExamples";
import StudentTable from "./StudentTable";
import Spinner from "react-bootstrap/Spinner";

class PrivateTeacherApp extends React.Component {
  constructor(props) {
    super(props);

    // initialise the state:
    this.state = {
      studentsArray: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    // send a get request to the backend with the token
    this.setState({ isLoading: true });
    let access_token = window.localStorage.getItem("AuthToken");
    axios
      .get("/getteachersclass", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        // getting the list of students once the teacher has logged in
        this.setState({ studentsArray: res.data });
        this.setState({ isLoading: false });
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
                    <Link to="/addstudent">
                      <span className="navbarLink">Add a student</span>
                    </Link>
                  </Navbar.Text>

                  <Navbar.Text>
                    <Link to="/editstudent">
                      <span className="navbarLink">Edit a student</span>
                    </Link>
                  </Navbar.Text>

                  <Navbar.Text>
                    <Link to="/difficultyexamples">
                      <span className="navbarLink">Difficulty Examples</span>
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
            <Route path="/addstudent">
              <AddStudent teacherID={this.props.teacherID} />
            </Route>
            <Route path="/editstudent">
              <EditStudent studentsArray={this.state.studentsArray} />
            </Route>
            <Route path="/difficultyexamples">
              <DifficultyExamples />
            </Route>
            {/* home needs to be at the bottom as the switch displays the first route that matches the link */}
            <Route path="/">
              {this.state.isLoading ? (
                <div id="loadingSpinner">
                  <Spinner animation="border" role="status" variant="primary">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              ) : this.state.studentsArray.length > 0 ? (
                <div id="classTable">
                  <h2 className="classAbout">
                    Welcome to your class! Here you can monitor all of your
                    students. 👨‍🎓
                  </h2>
                  <StudentTable studentsArray={this.state.studentsArray} />
                </div>
              ) : (
                <div id="noStudentsMessage">
                  You don't have any students in your class yet, click add a
                  student
                </div>
              )}
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default PrivateTeacherApp;
