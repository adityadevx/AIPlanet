import mainLogo from '../assets/mainLogo.png'
import { Container, Navbar } from 'react-bootstrap'

function Nav() {

  return (
    <>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand href={'/'}>
            <img
              src={mainLogo}
              width="auto"
              height="50"
              className="d-inline-block align-top"
              alt="AI Planet"
            />
          </Navbar.Brand>
        </Container>
      </Navbar >
    </>
  );
}

export default Nav;