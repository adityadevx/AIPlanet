import React, { useState } from 'react'
import { redirect } from 'react-router-dom'
import { Card, Container, Row, Col } from 'react-bootstrap'




const SubmissionCards = ({ submission }) => {
    const [naviagate, setNavigate] = useState(false);

    const handleHackathonDetails = (id) => {
        console.log("clicked")
        setNavigate(true);
        if (naviagate) {
            return redirect(`/submissiondetails/:${id}`)
        }
    }




    return (
        <Container>
            <Row >
                {
                    Array.from(submission).map((element) => {
                        return (
                            <>
                                <div key={element.id}>
                                    <Col sm={4} className='my-2' onClick={(e)=>{window.location.href =`/submissiondetails/${element.id}`}}>
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
                                                        <h5 className='mx-5'>{element.title}</h5>
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
                                </div>
                            </>
                        )
                    })



                }
            </Row>
        </Container>
    )
}

export default SubmissionCards