import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';

const Header = (props) => {
  const navigate = useNavigate()
  const { logout } = useContext(UserContext)
  const { user } = useContext(UserContext)

  let location = useLocation()
    return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">React</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" activeKey={location.pathname}>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/users">Manage Users</Nav.Link>
            <NavDropdown title="Setting" id="basic-nav-dropdown">
              {
                user && user.auth === true 
                ? <Nav.Link href="/logout" onClick={logout}>Log out</Nav.Link>
                : <Nav.Link href="/login">Log in</Nav.Link>
              }
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
    )
}

export default Header