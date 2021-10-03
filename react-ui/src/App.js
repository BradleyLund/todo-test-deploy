import "./App.css";
import PrivateTeacherApp from "./Components/PrivateTeacherApp";
import Login from "./Components/Login";
import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";
import PrivateStudentApp from "./Components/PrivateStudentApp";

class App extends React.Component {
  constructor(props) {
    super(props);

    // initialise the state:
    this.state = {
      loggedin: null,
      username: "",
      isTeacher: null,
      teacherID: "",
      isLoading: false,
    };
  }

  componentDidMount() {
    if (window.localStorage.getItem("AuthToken") !== null) {
      // check the authtoken on the backend, and if the auth token is valid set loggedin to true otherwise say not logged in
      // and if authorized make sure what type of authorization, teacher or student. then display different private apps depending
      this.setState({ isLoading: true });

      let access_token = window.localStorage.getItem("AuthToken");
      axios
        .get("/authorize", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then((res) => {
          // handling getting the initial data once the user is logged in
          this.setState({
            username: res.data.username,
            isTeacher: res.data.isTeacher,
            loggedin: true,
            teacherID: res.data.teacherID,
            studentID: res.data.studentID,
          });
          this.setState({ isLoading: false });
        })
        .catch((error) => {
          console.error(error);
          this.setState({ isLoading: false });
        });
    } else {
      this.setState({ username: "", isTeacher: null, loggedin: false });
    }
  }

  handleLogout = (event) => {
    event.preventDefault();

    // remove the AuthToken from localStorage when logging out
    window.localStorage.removeItem("AuthToken");
    window.location.reload();
  };
  // here we want to put if logged in then show private app otherwise show the login screen
  // we need to authorize the token properly.
  render() {
    return (
      <div id="parentDiv">
        {this.state.isLoading ? (
          <div id="loadingSpinner">
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : this.state.loggedin ? (
          this.state.isTeacher ? (
            <PrivateTeacherApp
              handleLogout={this.handleLogout}
              username={this.state.username}
              teacherID={this.state.teacherID}
            />
          ) : (
            <PrivateStudentApp
              handleLogout={this.handleLogout}
              username={this.state.username}
            />
          )
        ) : (
          <Login />
        )}
      </div>
    );
  }
}

export default App;
