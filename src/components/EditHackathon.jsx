import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button, Container } from 'react-bootstrap'

function EditHackathon() {

    const currenturl = window.location.href;
    const id = currenturl.split('/')[4];

    let items; 
    localStorage.getItem('hackathonSubmissions') === null ? items = [] : items = JSON.parse(localStorage.getItem('hackathonSubmissions'));


    const filter = items.filter((element) => {
        return element.id === id
    })

    const [item , setItem] = useState(filter);
    console.log(item);
    
    const [hackathonId, setHackathonId] = useState(id);
    const [base64, setBase64] = useState("");
    const [formData, setFormData] = useState({
        title: '', summary: '', description: '', startDate: '', hackathonName: '', endDate: '', githubLink: '', otherLink: '', favourite: false
    })

    // Destructuring formData
    const { title, summary, description, startDate, endDate, githubLink, otherLink, hackathonName, favourite } = formData;

    const handleOnChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
        // console.log(formData)
    }
    const handleOnChangeImage = (e) => {
        const selectedFile = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {

            const image = new Image();
            image.src = reader.result;
            image.onload = () => {
                const height = image.height;
                const width = image.width;
                console.log(height, width);
                if (height < 360 || width < 360) {
                    alert('Image resolution is too low. Minimum resolution : 360px X 360px')
                    return;
                }
            }
            setBase64(reader.result);
        }
        reader.readAsDataURL(selectedFile);
        console.log(reader.result);
    }

    const handleOnEdit = (e) => {
        e.prevenDefault();
        console.log('one edit');
        window.location.href = `/submissiondetails/${hackathonId}`;
    }



    return (
        <>
            <Container className='mt-3 bg-light'>
                <h2>Edit Hackathon Details</h2>
                <Form onSubmit={(e) => handleOnEdit(e)}>

                    {/* Title */}
                    <Row className="mb-3">
                        <Form.Group as={Col} sm={6} controlId="formGridEmail">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Title of your Submission" value={title} onChange={(e) => { handleOnChange(e) }} name='title' required />
                        </Form.Group>
                    </Row>

                    {/* Summary */}
                    <Row className="mb-3">
                        <Form.Group as={Col} sm={6} controlId="formGridEmail">
                            <Form.Label className='font-bold'>Summary</Form.Label>
                            <Form.Control type="text" placeholder="A short summary of your submission(this will be visible to your submission)" name='summary' value={summary} onChange={(e) => { handleOnChange(e) }} required />
                        </Form.Group>
                    </Row>

                    {/* Description */}
                    <Row className="mb-3">
                        <Form.Group as={Col} sm={6} controlId="formGridEmail">
                            <Form.Label className='font-bold'>Description</Form.Label>
                            <Form.Control as="textarea" rows={6} placeholder="Write a long description of your project. You can describe your idea and approach here" name='description' value={description} onChange={(e) => { handleOnChange(e) }} required />
                            {/* <p className='text-end'>{description.length}/3000 characters</p> */}
                        </Form.Group>
                    </Row>

                    {/* Hackathon Name */}
                    <Row className="mb-3">
                        <Form.Group as={Col} sm={6} controlId="formGridEmail">
                            <Form.Label className='font-bold'>Hackathon Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter your hackathon name" name='hackathonName' value={hackathonName} onChange={(e) => { handleOnChange(e) }} required />
                        </Form.Group>
                    </Row>

                    {/* Cover Image  */}
                    <Row className="mb-3">
                        <Form.Group as={Col} sm={6} controlId="formGridEmail">
                            <Form.Label className='font-bold'>Cover Image</Form.Label>
                            <br />
                            <Form.Label className='text-muted'>Minimum resolution : 360px X 360px</Form.Label>
                            <Form.Control type="file" placeholder="A short summary of your submission(this will be visible to your submission)" onChange={(e) => { handleOnChangeImage(e) }} required />
                        </Form.Group>
                    </Row>

                    {/* Date */}
                    <Row sm={6} className="mb-3">
                        <Col sm={3}>
                            <Form.Label>
                                <span>Hackathon Start Date</span>
                            </Form.Label>
                            <Form.Control type='text' name='startDate' value={startDate} onChange={(e) => { handleOnChange(e) }} placeholder='Select Start Date'
                                onFocus={(e) => { e.target.type = 'date' }}
                                onBlur={(e) => { e.target.type = 'text' }}
                            />
                        </Col>
                        <Col sm={3}>
                            <Form.Label>Hackathon End Date</Form.Label>
                            <Form.Control type='text' name="endDate" value={endDate} onChange={(e) => { handleOnChange(e) }} placeholder="Select End Date"
                                onFocus={(e) => { e.target.type = 'date' }}
                                onBlur={(e) => { e.target.type = 'text' }}
                            />
                        </Col>
                    </Row>

                    {/* Github Repository */}
                    <Row className="mb-3">
                        <Form.Group as={Col} sm={6} controlId="formGridText">
                            <Form.Label className='font-bold'>Github Repository</Form.Label>
                            <Form.Control type="text" name='githubLink' placeholder="Enter your Submission's public Github repository link." value={githubLink} onChange={(e) => { handleOnChange(e) }} required />
                        </Form.Group>
                    </Row>

                    {/* Other Links */}
                    <Row className="mb-5">
                        <Form.Group as={Col} sm={6} controlId="formGridText">
                            <Form.Label className='font-bold'>Other Links</Form.Label>
                            <Form.Control type="text" name='otherLink' placeholder="You can upload a video demo or URL of your demo app here." value={otherLink} onChange={(e) => { handleOnChange(e) }} />
                        </Form.Group>
                    </Row>
                    <hr />
                    <Button variant="primary" type="submit" className='uploadSubmissionBtn'>
                        Edit Submission
                    </Button>
                </Form>
            </Container>
        </>
    )
}

export default EditHackathon