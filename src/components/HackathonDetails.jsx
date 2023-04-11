import { useState, useContext } from 'react'
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap'
import { allHackathonContext } from '../context/allHackathon';
import { useNavigate } from 'react-router-dom';

function HackathonDetails() {
  const navigate = useNavigate();

  const hackathons = useContext(allHackathonContext);
  const { items, handleFavourites, deleteHackathon } = hackathons;


  //set the hackathon id
  const currentUrl = window.location.href;
  const id = currentUrl.split('/').slice(-1);
  const intId = parseInt(id);



  const selectedHackathon = items.filter((item) => { return item.id == intId })
  // console.log(selectedHackathon)

  const [favourite, setFavourite] = useState(selectedHackathon[0].favourite)
  const [show, setShow] = useState(false);
  const handleModalClose = () => setShow(false);
  const handleModalShow = () => setShow(true);


  const handleFavourite = async () => {
    setFavourite(handleFavourites(intId))
  }

  const dateInString = (value) => {
    const date = new Date(value);
    const day = date.getDay();
    const month = date.getMonth();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthName = months[month];
    return (`${day} ${monthName}`);
  }

  const handleDelete = async () => {
    // setShow(true);
    // console.log('delete');
    await deleteHackathon(intId);
    setShow(false);
    navigate('/');
  }

  const dateFormat = (value) => {
    const date = new Date(value);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const formattedDate = date.getDate() + " " + monthNames[date.getMonth()].substr(0, 3) + " " + date.getFullYear();
    return formattedDate;
  }

  return (
    <>
      {
        selectedHackathon.length === 0 ?
          <Container >
            <h2 className='m-3 text-center text-muted'>Nothing To Display</h2>
          </Container>
          :
          <>
            <Container style={{ backgroundColor: 'rgba(0, 49, 69, 1)', color: 'white' }} fluid>
              {selectedHackathon.length === 0 ? <h1>Nothing to display</h1> :
                <Row className='px-3 py-5 align-items-center'>
                  <Col sm={9}>
                    <Col className='d-flex align-items-center '>
                      <div>
                        <img src={selectedHackathon[0].imageName} alt="hackathon Poster" height={150} width={150}
                          style={{ borderRadius: '14px', aspectRatio: '1/1 !important' }} />
                      </div>
                      <div>
                        <h1 className='px-3'>{selectedHackathon[0].title}</h1>
                      </div>

                    </Col>
                    <Col className='py-3'>{selectedHackathon[0].summary}</Col>
                    <Col className='d-flex align-items-center itemsMedia'>
                      <span onClick={handleFavourite} >
                        {
                          favourite ?
                            <i className="fa-solid fa-star fa-xl"></i>
                            :
                            <i className="fa-regular fa-star fa-xl"></i>
                        }
                      </span>
                      <span style={{ borderLeft: '1px solid white', height: '30px' }} className='mx-3'></span>
                      {/* Date Card */}
                      <button type="button" className="btn btn-outline-light d-flex align-items-center" style={{ backgroundColor: 'rgba(37, 89, 115, 1)', borderRadius: "20px" }}>
                        <i className="fa-regular fa-calendar"></i>
                        <span className='px-1 fw-bold'>{dateInString(selectedHackathon[0].startDate)}</span>
                      </button>
                    </Col>
                  </Col>
                  <Col sm={3} className='align-items-center d-flex justify-content-center my-2' >
                    <div className="d-grid gap-2 col-6 ">
                      <a className="btn  btn-outline-light linkButtons" href={`/editsubmission/${intId}`}
                        role="button">
                        <span className='px-1' >
                          <i className="fa-regular fa-pen-to-square fa-lg"></i>
                        </span>
                        Edit
                      </a>
                      <a className="btn btn-outline-light linkButtons" role="button" onClick={() => { handleModalShow() }}>
                        <span className='px-1'>
                          <i className="fa-regular fa-trash-can fa-lg"></i>
                        </span>
                        Delete
                      </a>
                    </div>
                  </Col>
                </Row>}
            </Container >

            {/* Description of the hackathon */}
            <Container className='mt-3'>
              <Row>
                <Col sm={8} className='px-2'>
                  <p className='fw-bold'>Description</p>
                  <p>{selectedHackathon[0].description}</p>
                </Col>

                <Col sm={4}>
                  <Col className='text-muted my-1'>Hackathon</Col>

                  <Col className='fw-bold'>{selectedHackathon[0].hackathonName}</Col>
                  <br />
                  <Col >
                    <i className="fa-regular fa-calendar"></i>
                    <span className='px-2'>{dateFormat(selectedHackathon[0].startDate)} - {dateFormat(selectedHackathon[0].endDate)}</span>
                  </Col>
                  <br />
                  <Col>
                    <div className="d-grid gap-2 col-auto ">
                      <a className="btn btn-light btn-outline-dark linkButtons" href={selectedHackathon[0].github}
                        target='_blank' role="button">
                        <span className='px-2'>
                          <i className="fa-brands fa-github fa-lg"></i>
                        </span>
                        Github Repository
                      </a>
                      <a className="btn btn-light btn-outline-dark linkButtons" href={selectedHackathon[0].otherLink} target='_blank' role="button">
                        <span className='px-2'>
                          <i className="fa-solid fa-up-right-from-square"></i>
                        </span>
                        Other Link
                      </a>
                    </div>
                  </Col>
                  <br />
                </Col>
              </Row>
            </Container>


            <Modal show={show} onHide={handleModalClose}>
              <Modal.Header closeButton>
              </Modal.Header>
              <Modal.Body>Do you want to delete this submission?</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleModalClose}>
                  No
                </Button>
                <Button variant="primary" onClick={handleDelete}>
                  Yes
                </Button>
              </Modal.Footer>
            </Modal>
          </>
      }
    </>
  )
}

export default HackathonDetails