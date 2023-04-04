import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/esm/Container'
import { Row, Col, Dropdown } from 'react-bootstrap'
import HackathonCard from './HackathonCard';

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
    const handleNewest = async () => {
        const sortedNew = await active.sort((a, b) => {
            return new Date(b.startDate) - new Date(a.startDate);
        });
        setActive(sortedNew);

        console.log(active);
    }

    const handleOldest = async () => {
        const sortedOld = await active.sort((a, b) => {
            return (
                new Date(a.startDate) - new Date(b.startDate)
            );
        });

        await setActive(sortedOld);
        console.log(active);
    }



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
                                Sort By
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item  onClick={e => handleNewest()} >Newest</Dropdown.Item>
                                <Dropdown.Item onClick={e => handleOldest()} >Oldest</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
            </Container>
            {/* Displaying Cards */}
            <HackathonCard cardData={active} />


        </>
    )
}
export default Submissions;