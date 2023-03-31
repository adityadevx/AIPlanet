import mainLogo from '../assets/mainLogo.png'
import{Container,Navbar} from 'react-bootstrap'

function Nav() {
  return (
    <>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand to="/">
            <img
              src={mainLogo}
              width="auto"
              height="50"
              className="d-inline-block align-top"
              alt=""
            />
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default Nav;