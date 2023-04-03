import React from 'react'
import { Container, Row } from 'react-bootstrap'

function HackathonCard({cardData}) {
 
    const lastUpdated = (uploadDate) => {
        const today = new Date();
        const daysPassed = Math.floor((today - uploadDate) / (1000 * 60 * 60 * 24));
        // console.log(uploadDate, today, daysPassed)
        if (daysPassed === 0) return (`last updated 0 days ago`)
        return (`updated ${daysPassed} days ago`)
    }
 
    return (
    <>
     <Container>
                <Row >
                    {
                        Array.from(cardData).map((element, index) => {
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

export default HackathonCard