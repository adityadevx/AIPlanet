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
        console.log(e.target.value);
        setSearchQuery(e.target.value);
        setActive(active.filter((element) => {
            return element.hackathonName.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1;
        }))
    }

    const handleNewset = async () => {
        const sortedNew = await active.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
        // console.log(sortedNews)
        await setActive(sortedNew);
    }

    const handleOldest = async () => {
        const sortedNews = await active.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
        console.log(sortedNews);
      await  setActive(sortedNews);
    }

    const lastUpdated = (uploadDate) => {
        const today = new Date();
        const daysPassed = Math.floor((today - uploadDate) / (1000 * 60 * 60 * 24));
        // console.log(uploadDate, today, daysPassed)
        if (daysPassed === 0) return (`last updated 0 days ago`)
        return (`updated ${daysPassed} days ago`)
    }

    useEffect(() => {
        console.log('rendered')
    }, [active])


    return (
        <>
            <Container className='my-3'>
                <Row>
                    <Col >
                        <div className='d-flex'>
                            <p className='mx-2 allSubmissions' style={{ borderBottom: '6px solid green' }} onClick={() => {
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
                                <Dropdown.Item onClick={(e) => { handleOldest() }} >Oldest</Dropdown.Item>
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
                                <div className="col-md-4 mb-3 mb-sm-0 " key={element.id}>
                                    <div className="card cardShadow"
                                        onClick={() => { window.location.href = `/submissiondetails/${element.id}` }} >
                                        <div className="d-flex flex-row p-3 align-items-center">
                                            <img src={element.imageName} height="100" width="100" alt="" style={{ borderRadius: "10px" }} />
                                            <h5 className="card-title px-2 fw-bold">{element.hackathonName}</h5>
                                        </div>
                                        <div className="card-body">
                                            <p className="card-text">{element.summary}</p>
                                            <p className="text-end text-muted">{lastUpdated(new Date(element.startDate))}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </Row>
            </Container >


        </>
    )
}
export default Submissions;