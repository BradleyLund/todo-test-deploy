import "./App.css";
import PrivateApp from "./Components/PrivateApp";
import Login from "./Components/Login";
import React from "react";

let loggedin = false;

class App extends React.Component {
  // here we want to put if logged in then show private app otherwise show the login screen
  render() {
    return <div>{loggedin ? <PrivateApp /> : <Login />}</div>;
  }
}

export default App;
