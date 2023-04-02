import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/esm/Container'
import { Row, Col, Dropdown, DropdownButton, Card } from 'react-bootstrap'

const Submissions = () => {
    let items;
    localStorage.getItem('hackathonSubmissions') === null ? items = [] : items = JSON.parse(localStorage.getItem('hackathonSubmissions'));

    const [active, setActive] = useState(items);
    const [searchQuery, setSearchQuery] = useState('');

    const handleAllSubmissions = () => {
        console.log('all submissions');
        document.body.querySelector('.allSubmissions').style.borderBottom = '6px solid green';
        document.body.querySelector('.favouriteSubmissions').style.borderBottom = 'none';
        setActive(items);
    };

    const handleFavouriteSubmissions = () => {
        console.log('favourite submissions');
        document.body.querySelector('.favouriteSubmissions').style.borderBottom = '6px solid green';
        document.body.querySelector('.allSubmissions').style.borderBottom = 'none';

        setActive(active.filter((element) => {
            return element.favourite === true;
        }
        ))
    };

    const handleSearchQuery = (e) => {
        // console.log(e.target.value);
        setSearchQuery(e.target.value);
        setActive(active.filter((element) => {
            return element.title.toLowerCase().includes(e.target.value.toLowerCase());
        }))
    }

    const handleNewset = () => {


    }

    const handleOldest = () => {
    
    }

    const lastUpdated = (uploadDate) => {
        const today = new Date();
        const daysPassed = Math.floor((today - uploadDate) / (1000 * 60 * 60 * 24));
        // console.log(uploadDate, today, daysPassed)
        if (daysPassed === 0) return (`last updated 0 days ago`)
        return (`last updated ${daysPassed} days ago`)
    }

    const columnStyles = {
        span: {
            borderBottom: '6px solid green',
        },

    }




    return (
        <>
            <Container className='my-3'>
                <Row>
                    <Col >
                        <div className='d-flex'>
                            <p className='mx-2 allSubmissions' style={columnStyles.span} onClick={() => {
                                handleAllSubmissions()
                            }}>
                                <a href="#" >All Submissions</a>
                            </p>
                            <p className='mx-2 favouriteSubmissions' onClick={() => { handleFavouriteSubmissions() }} >
                                <a href="#">Favourite Submissions</a>
                            </p>
                        </div>
                    </Col>
                    <Col className='d-flex align-items-center justify-content-end '>
                        <div className="form px-2">
                            <i className="fa fa-search"></i>
                            <input type="text" className="form-control form-input text-center " placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => { handleSearchQuery(e) }}
                                style={{ borderRadius: '2rem', borderColor: 'black' }}
                            />
                        </div>
                        <Dropdown >
                            <Dropdown.Toggle variant="light" id="dropdown-basic" style={{ borderRadius: '2rem', borderColor: 'black' }}>
                                Newest
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#" onClick={(e) => { handleNewset() }}>Newest</Dropdown.Item>
                                <Dropdown.Item href="#" onClick={() => { handleOldest() }} >Oldest</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
            </Container>

            {/* Displaying Cards */}
            <Container>
                <Row >
                    {
                        Array.from(active).map((element, index) => {
                            return (

                                <div className="card cardShadow col-md-3 m-2" key={index + 1}
                                    onClick={() => { window.location.href = `/submissiondetails/${element.id}` }}
                                >
                                    <div className="d-flex flex-row p-3 align-items-center">
                                        <img src={element.imageName} height="100" width="100" alt="" style={{ borderRadius: "10px" }} />
                                        <h5 className="card-title px-2">{element.hackathonName}</h5>
                                    </div>
                                    <div className="card-body">
                                        <p className="card-text">{element.summary}</p>
                                        <p className="text-end text-muted">{lastUpdated(new Date(element.startDate))}</p>
                                    </div>
                                </div>    
                            )
                                  {/* <Col sm={4} className='my-2' onClick={(e) => { window.location.href = `/submissiondetails/${element.id}` }} key={index + 1}>
                                        <Card style={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" }} >
                                            <Card.Body>
                                                <div className='d-flex align-items-center'>
                                                    <span>
                                                        <img src={element.imageName} alt=""
                                                            style={{
                                                                height: "100px",
                                                                width: "110px",
                                                                borderRadius: "6px"
                                                            }}
                                                        />
                                                    </span>
                                                    <span>
                                                        <h5 className='mx-auto'>{element.title}</h5>
                                                    </span>
                                                </div>
                                                <Card.Text className='m-2'>
                                                    {element.summary}
                                                </Card.Text>
                                                <Card.Text className='text-end font-weight-light'>
                                                    {lastUpdated( new Date(element.startDate))}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col> */}
                    })
                    }
                </Row>
            </Container>


        </>
    )
}
export default Submissions;