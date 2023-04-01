import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import { Row, Col, Dropdown, DropdownButton } from 'react-bootstrap'

const Submissions = () => {
    const columnStyles = {
        span: {
            fontSize: "17px",
            lineHeight: '25px',
            fontWeight: '500',
            padding: '0px 10px',
            borderBottom: '6px solid green',
        },
        a: {
            textDecoration: 'none',
            color: 'black'
        }
    }
    
    return (
        <>
            <Container className='my-3'>
                <Row>
                    <Col >
                        <div className='d-flex'>
                            <p className='mx-2' style={columnStyles.span}>
                                <a href="#" style={columnStyles.a}>All Submissions</a>
                            </p>
                            <p className='mx-2' style={columnStyles.span}>
                                <a href="#" style={columnStyles.a}>Favourite Submissions</a>
                            </p>
                        </div>
                    </Col>
                    <Col className='d-flex align-items-center justify-content-end '>
                        <div className="form px-2">
                            <i className="fa fa-search"></i>
                            <input type="text" className="form-control form-input text-center " placeholder="Search..." style={{borderRadius: '2rem', borderColor:'black' }} />
                        </div>
                        <Dropdown >
                            <Dropdown.Toggle variant="light" id="dropdown-basic"style={{borderRadius: '2rem', borderColor:'black' }}>
                               Newest
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Newest</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Oldest</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default Submissions;