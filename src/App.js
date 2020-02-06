import React from "react";
import { Container } from "reactstrap";

// Components
import HomePage from "./components/homepage";

// Modules css files
import "bootstrap/dist/css/bootstrap.min.css";

// Global css file
import "./App.css";

function App() {
  return (
    <Container className="themed-container" fluid="sm">
      <HomePage />
    </Container>
  );
}

export default App;
