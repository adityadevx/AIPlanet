import React, { useState } from 'react'
import { Card, Container, Row, Col } from 'react-bootstrap'


const SubmissionCards = ({ submission }) => {
    return (
        <Container>
            <Row>
                {
                    Array.from(submission).map((element) => {
                        return (
                            <> 
                                    <Col sm={4} className='my-2' onClick={(e)=>{window.location.href =`/submissiondetails/${element.id}`}} key={element.id}>
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
                                                        <h5 className='mx-auto flex-grow-1'>{element.title}</h5>
                                                    </span>
                                                </div>
                                                <Card.Text className='m-2'>
                                                    {element.summary}
                                                </Card.Text>
                                                <Card.Text className='text-end font-weight-light'>
                                                    {element.startDate}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                            </>
                        )
                    })
                }
            </Row>
        </Container>
    )
}

export default SubmissionCards