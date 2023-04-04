import React from 'react';
import Container from 'react-bootstrap/Container';
import {Row,Col,Button} from 'react-bootstrap';

import HandHoldingBulb from '../assets/hand-holding-bulb.png'

const HeroSection = () => {
    return (
        <>
        <Container  style={{backgroundColor:'rgba(0, 49, 69, 1)'}} fluid>
            <Container className='py-5 heroContainer text-white'>
                <Row id='heroSectionRow'>
                    <Col sm={9}>
                        <h1>Hackathon Submissions</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, voluptatum explicabo voluptatem animi necessitatibus dolore laborum quibusdam molestiae sapiente, quae deserunt aperiam.quae deserunt aperiam. Lorem, ipsum dolor.</p>
                        <Button variant="primary" href={'/submissions'} size="lg" active className='uploadSubmissionBtn'>
                        Upload Submission
                    </Button>
                    </Col>
                    <Col sm={3}>
                        <img src={HandHoldingBulb} alt="hand-holding-bulb" 
                        height={"288"}
                        width={'auto'}
                        />
                    </Col>
                </Row>
            </Container>
            </Container>
        </>
    )
}

export default HeroSection;