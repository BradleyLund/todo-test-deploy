import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Spinner from "react-bootstrap/Spinner";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";

export default function AddStudent(props) {
  // initialise the states
  const [firstName, setFirstName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [surname, setSurname] = useState("");
  const [isLoading, setLoading] = useState(false);

  const [difficultyLevel, setDifficultyLevel] = useState("");

  // handle changes for all of the inputs
  const handleChange = (event) => {
    setDifficultyLevel(event.target.value);
  };
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleSurnameChange = (event) => {
    setSurname(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // First check that they have filled in the details
    if (
      username === "" ||
      password === "" ||
      firstName === "" ||
      surname === "" ||
      difficultyLevel === ""
    ) {
      alert("Please fill in all fields before submitting");
    } else {
      setLoading(true);
      axios
        .post("/newstudent", {
          username: username,
          password: password,
          difficultyLevel: difficultyLevel,
          firstName: firstName,
          surname: surname,
          teacherID: props.teacherID,
        })
        .then(
          (response) => {
            alert("The student has been successfully added to your class");

            setFirstName("");
            setUsername("");
            setPassword("");
            setSurname("");
            setLoading(false);
          },
          (error) => {
            alert(error.response.data);
            setLoading(false);
          }
        );
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div id="loginPage">
        {isLoading ? (
          <div id="loadingSpinner">
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <div>
            <h1 className="classAbout">Add a new student to your class</h1>
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
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoFocus
                value={firstName}
                onChange={handleFirstNameChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="surname"
                label="Surname"
                name="surname"
                autoFocus
                value={surname}
                onChange={handleSurnameChange}
              />

              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Difficulty Level
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={difficultyLevel}
                    label="Difficulty Level"
                    onChange={handleChange}>
                    <MenuItem value={1}>Grade 1</MenuItem>
                    <MenuItem value={2}>Grade 2</MenuItem>
                    <MenuItem value={3}>Grade 3</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <button
                id="logInButton"
                className="button-66"
                type="submit"
                onClick={handleSubmit}>
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </Container>
  );
}
