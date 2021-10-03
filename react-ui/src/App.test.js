import { render, screen } from "@testing-library/react";
import App from "./App";
import renderer from "react-test-renderer";
import PrivateStudentApp from "./Components/PrivateStudentApp";
import PrivateTeacherApp from "./Components/PrivateTeacherApp";

// A frontend test to see whether the login button is rendered

test("renders login button", () => {
  render(<App />);
  const linkElement = screen.getByText(/Log In/i);
  expect(linkElement).toBeInTheDocument();
});

//  test the render tree of the private student app

it("renders Private Student App correctly", () => {
  const tree = renderer.create(<PrivateStudentApp />).toJSON();
  expect(tree).toMatchSnapshot();
});
