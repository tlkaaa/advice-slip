import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="/">Advice Slip Generator</Navbar.Brand>
        <Nav>
          <Link to="/" className="mx-1">
            Home
          </Link>
          <Link to="/about" className="mx-1">
            About
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
