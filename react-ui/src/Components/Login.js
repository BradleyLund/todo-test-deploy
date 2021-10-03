import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import axios from "axios";

export default function Login() {
  // initialise the state of the input boxes
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checkedOption, setCheckedOption] = useState("");

  // handle change
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleCheckBoxChange = (event) => {
    setCheckedOption(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRegister = (event) => {
    event.preventDefault();

    if (username === "" || password === "") {
      alert("Please enter a valid username and password");
    } else {
      axios
        .post("/newuser", {
          username: username,
          password: password,
        })
        .then(
          (response) => {
            // in here we can set the token in local storage which can then be sent in the authorization header for the future requests and will then let us see the privatepage
            const token = response.data.token;
            window.localStorage.setItem("AuthToken", token);
            window.location.reload();
          },
          (error) => {
            alert(error.response.data);
          }
        );
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();

    if (username === "" || password === "") {
      alert("Please enter a valid username and password");
    } else {
      // check if student or if teacher and then post the request to the correct route
      if (checkedOption === "") {
        alert("Please select whether you are a teacher or a student");
      } else if (checkedOption === "teacher") {
        //   take the state and post a request to the backend with the details
        axios
          .post("/login", {
            username: username,
            password: password,
          })
          .then(
            (response) => {
              // in here we can set the token in local storage which can then be sent in the authorization header for the future requests and will then let us see the privatepage
              const token = response.data.token;
              window.localStorage.setItem("AuthToken", token);
              window.location.reload();
            },
            (error) => {
              alert(error.response.data);
            }
          );
      } else if (checkedOption === "student") {
        // post to the student login route
        axios
          .post("/loginstudent", {
            username: username,
            password: password,
          })
          .then(
            (response) => {
              // in here we can set the token in local storage which can then be sent in the authorization header for the future requests and will then let us see the privatepage
              const token = response.data.token;
              window.localStorage.setItem("AuthToken", token);
              window.location.reload();
            },
            (error) => {
              alert(error.response.data);
            }
          );
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div id="loginPage">
        <h1 style={{ fontWeight: "bold" }}>MathsTracker</h1>
        <form noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={handleUsernameChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
          />
          <div id="radioButtons">
            <div className="inputBox">
              <input
                type="radio"
                value="teacher"
                name="isStudent"
                checked={checkedOption === "teacher"}
                onChange={handleCheckBoxChange}
              />{" "}
              Teacher
            </div>
            <div className="inputBox">
              <input
                type="radio"
                value="student"
                name="isStudent"
                checked={checkedOption === "student"}
                onChange={handleCheckBoxChange}
              />{" "}
              Student
            </div>
          </div>

          <button
            id="logInButton"
            className="button-66"
            type="submit"
            onClick={handleLogin}>
            Log In
          </button>

          {checkedOption === "teacher" ? (
            <button
              className="button-66"
              id="registerButton"
              type="submit"
              onClick={handleRegister}>
              Register
            </button>
          ) : (
            <></>
          )}
        </form>
        <div id="aboutSection">
          <h2 style={{ fontWeight: "bold" }}>About</h2>
          <p>
            Welcome to MathsTracker, the perfect web application to track your
            students maths performance 💯<br></br>
            <br></br>
            If you are a teacher, you can register a new account. If you are a
            student, your teacher will sign you up! 🚀
          </p>
        </div>
      </div>
    </Container>
  );
}
