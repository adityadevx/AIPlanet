import React, { useState } from 'react';

import { Row, Col, Form, Button, Container } from 'react-bootstrap'

function UploadSubmission({ addSubmission }) {
  // formData is an object
  const [base64, setBase64] = useState("");
  const [formData, setFormData] = useState({
    title: '', summary: '', description: '', startDate: '', hackathonName: '', endDate: '', githubLink: '', otherLink: '', favourite: false
  })

  // Destructuring formData
  const { title, summary, description, startDate, endDate, githubLink, otherLink, hackathonName } = formData;


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
      setBase64(reader.result);
    }
    reader.readAsDataURL(selectedFile);
    console.log(reader.result);
    // console.log(image);
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    addSubmission(formData, base64);
    setFormData({ title: '', summary: '', description: '', startDate: '', endDate: '', githubLink: '', otherLink: '', hackathonName: '' });
    setBase64('');
    
    // addHackathonSubmission();
  }

  return (
    <Container className='mt-3 bg-light'>
      <h2>New Hackathon Submission</h2>
      <Form onSubmit={(e) => handleOnSubmit(e)}>

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
            <p className='text-end'>{description.length}/3000 characters</p>
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
          Upload Submission
        </Button>
      </Form>
    </Container>
  );
}

export default UploadSubmission;