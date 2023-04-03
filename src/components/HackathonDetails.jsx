import { useState, useEffect } from 'react'
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap'
import UploadSubmission from './UploadSubmission';

function HackathonDetails() {

  const [details, setDetails] = useState([]);
  const [hackathonId, setHackathonId] = useState('')

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const hackathon = async () => {
    const currentUrl = await window.location.href;
    const hackathonId = await currentUrl.split('/').slice(-1).toString();
    setHackathonId(hackathonId);
    // console.log(hackathonId)

    const obj = await localStorage.getItem('hackathonSubmissions');
    console.log(JSON.parse(obj));
    const parsedObj = await JSON.parse(obj);

    const selectedItem = parsedObj.filter((item) => {
      console.log(item.github)
      return item.id == hackathonId;
    })
    console.log(typeof selectedItem, selectedItem)
    await setDetails(selectedItem)
    console.log(details)
  }

  const handleFavourite = async () => {
    console.log('favourite');
    const obj = localStorage.getItem('hackathonSubmissions');
    const parsedObj = JSON.parse(obj);
    const currentUrl = await window.location.href;
    const hackathonId = await currentUrl.split('/').slice(-1).toString();

    console.log(parsedObj[hackathonId]);
    parsedObj[hackathonId].favourite = true;

    localStorage.setItem('hackathonSubmissions', JSON.stringify(parsedObj));
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
    const hackhathonList = await JSON.parse(localStorage.getItem('hackathonSubmissions'));
    const filteredList = hackhathonList.filter((item) => {
      return item.id != hackathonId;
    })
    await localStorage.setItem('hackathonSubmissions', JSON.stringify(filteredList));
    const updated = await localStorage.getItem('hackathonSubmissions');
    const newupdated = await JSON.parse(updated);
    setDetails(newupdated)
    window.location.href = '/';
  }

 
  useEffect(() => {
    hackathon();
  }, [])

  return (
    <>
      {
        details.length === 0 ?
          <Container >
            <h2 className='m-3 text-center text-muted'>Nothing To Display</h2>
          </Container>
          :
          <>
            <Container style={{ backgroundColor: 'rgba(0, 49, 69, 1)', color: 'white' }} fluid>
              {details.length === 0 ? <h1>Nothing to display</h1> :
                <Row className='px-3 py-5 align-items-center'>
                  <Col sm={9}>
                    <Col className='d-flex align-items-center '>
                      <div>
                        <img src={details[0].imageName} alt="hackathon Poster" height={150} width={150}
                          style={{ borderRadius: '14px' }} />
                      </div>
                      <div>
                        <h1 className='px-3'>{details[0].title}</h1>
                      </div>

                    </Col>
                    <Col className='py-3'>{details[0].summary}</Col>
                    <Col className='d-flex align-items-center itemsMedia'>
                      <span onClick={() => { handleFavourite() }} >
                        {
                          details[0].favourite ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                              className={'bi bi-star'} viewBox="0 0 16 16" >
                              <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"
                              />
                            </svg>
                        }
                      </span>
                      <span style={{ borderLeft: '1px solid white', height: '30px' }} className='mx-3'></span>
                      {/* Date Card */}
                      <button type="button" className="btn btn-outline-light d-flex align-items-center" style={{ backgroundColor: 'rgba(37, 89, 115, 1)', borderRadius: "20px" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar2" viewBox="0 0 16 16">
                          <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z"></path>
                          <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z">
                          </path>
                        </svg>
                        <span className='px-1 fw-bold'>{dateInString(details[0].startDate)}</span>
                      </button>
                    </Col>
                  </Col>
                  <Col sm={3} className='align-items-center d-flex justify-content-center my-2' >
                    <div className="d-grid gap-2 col-6 ">
                       <a className="btn  btn-outline-light linkButtons" href={`/editsubmission/${hackathonId}`}
                        role="button">
                        <span className='px-1' >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                          </svg>
                        </span>
                        Edit
                      </a> 
                      <a className="btn btn-outline-light linkButtons" href={details[0].otherLink} target='_blank' role="button" onClick={() => { handleDelete() }}>
                        <span className='px-1'>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                          </svg>
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
                  <p>{details[0].description}</p>
                </Col>

                <Col sm={4}>
                  <Col className='text-muted my-1'>Hackathon</Col>
                  
                  <Col className='fw-bold'>{details[0].hackathonName}</Col>
                  <br />
                  <Col >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar2" viewBox="0 0 16 16">
                      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
                      <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z" />
                    </svg>
                    <span className='px-2'>26-Feb-2022 - 28-Feb-2022</span>
                  </Col>
                  <br />
                  <Col>
                    <div className="d-grid gap-2 col-auto ">
                      <a className="btn btn-light btn-outline-dark linkButtons" href={details[0].github}
                        target='_blank' role="button">
                        <span className='px-2'>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                          </svg>
                        </span>
                        Github Repository
                      </a>
                      <a className="btn btn-light btn-outline-dark linkButtons" href={details[0].otherLink} target='_blank' role="button">
                        <span className='px-2'>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z" />
                            <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z" />
                          </svg>
                        </span>
                        Other Link
                      </a>

                    </div>
                  </Col>
                  <br />

                </Col>
              </Row>
            </Container>
          </>
      }
    </>
  )
}

export default HackathonDetails