import { allHackathonContext } from '../context/allHackathon';
import React, { useState, useContext } from 'react'
import Container from 'react-bootstrap/esm/Container'
import { Row, Col, Dropdown } from 'react-bootstrap'
import HackathonCard from './HackathonCard';

const Submissions = () => {
    const hackathons = useContext(allHackathonContext);
    const { items } = hackathons;
    // console.log(items)


    const [active, setActive] = useState(items);
    const [searchQuery, setSearchQuery] = useState('');

    const handleAllSubmissions = () => {
        // console.log('all submissions');
        document.body.querySelector('.allSubmissions').style.borderBottom = '6px solid green';
        document.body.querySelector('.favouriteSubmissions').style.borderBottom = 'none';
        setActive(items);
    };

    const handleFavouriteSubmissions = () => {
        // console.log('favourite submissions');
        document.body.querySelector('.favouriteSubmissions').style.borderBottom = '6px solid green';
        document.body.querySelector('.allSubmissions').style.borderBottom = 'none';
        setActive(active.filter((element) => {
            return element.favourite === true;
        }
        ))
    };

    const handleSearchQuery = (e) => {
        // console.log(e.target.value)
        setSearchQuery(e.target.value);

        setActive(active.filter((element) => {
            return element.hackathonName.toLowerCase().includes(e.target.value.toLowerCase()) === true;
        }))
    };

    const handleNewest = async () => {
        const sortedNew = await active.sort((a, b) => {
            return new Date(b.startDate) - new Date(a.startDate);
        });
        setActive(sortedNew.filter((element) => { return element.id !== undefined }));
        // console.log(active);
    }

    const handleOldest = async () => {
        const sortedOld = await active.sort((a, b) => {
            return (
                new Date(a.startDate) - new Date(b.startDate)
            );
        });
        setActive(sortedOld.filter((element) => { return element.id !== undefined }));
        // console.log(active);
    }



    return (
        <>
            <Container className='my-3'>
                <Row>
                    <Col >
                        <div className='d-flex'>
                            <p className='mx-2 allSubmissions' style={{ borderBottom: '6px solid green' }} >
                                <a onClick={() => { handleAllSubmissions() }} >All Submissions</a>
                            </p>
                            <p className='mx-2 favouriteSubmissions' >
                                <a onClick={() => { handleFavouriteSubmissions() }}>Favourite Submissions</a>
                            </p>
                        </div>
                    </Col>
                    <Col className='d-flex align-items-center justify-content-end '>
                        <div className="form px-2">
                            <i className="fa fa-search"></i>
                            <input type="text" className="form-control form-input text-center searchBar" placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => { handleSearchQuery(e) }}
                                onBlur={(e) => { setActive(items) }}
                            />
                        </div>
                        <Dropdown >
                            <Dropdown.Toggle variant="light" id="dropdown-basic">
                                Sort By
                            </Dropdown.Toggle>
                            <Dropdown.Menu >
                                <Dropdown.Item onClick={e => handleNewest()} >Newest</Dropdown.Item>
                                <Dropdown.Item onClick={e => handleOldest()}>Oldest</Dropdown.Item>
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