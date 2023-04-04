import React, { useState, useRef, useEffect } from 'react'
import { Row, Col, Form, Button, Container } from 'react-bootstrap'

function EditHackathon() {

    const currenturl = window.location.href;
    const id = currenturl.split('/')[4];

    let editableItem = [];
    localStorage.getItem('hackathonSubmissions') === null ? editableItem = [] : editableItem = JSON.parse(localStorage.getItem('hackathonSubmissions'));

    const fileInputField = useRef(null);
    const [imgDisplay, setImgDisplay] = useState('');
    const [base64, setBase64] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        summary: '',
        description: '',
        startDate: '',
        hackathonName: '',
        endDate: '',
        github: '',
        otherLink: '',
        imageName: '',
    });


    const editItemIndex = editableItem.findIndex((item) => { return item.id == id })
    const availableInputs = editableItem[editItemIndex];






    // Destructuring formData
    const { title, summary, description, startDate, endDate, github, otherLink, hackathonName } = formData;

    const handleOnChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
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
                // console.log(height, width);
                if (height < 360 || width < 360) {
                    alert('Image resolution is too low. Minimum resolution : 360px X 360px')
                    return;
                }
                const imageName = selectedFile['name'];
                setImgDisplay(imageName);
            }
            setBase64(reader.result);
            // console.log(reader.result)
        }
        reader.readAsDataURL(selectedFile);
    }

    useEffect(() => {
        async function setData() {
            const allSubmissions = await JSON.parse(localStorage.getItem('hackathonSubmissions'));
            const editItemIndex = await editableItem.findIndex((item) => { return item.id == id });
            const availableInputs = await editableItem[editItemIndex];
            // console.log(availableInputs)

            // console.log(availableInputs)
            setFormData({
                id: availableInputs.id,
                title: availableInputs.title,
                summary: availableInputs.summary,
                description: availableInputs.description,
                startDate: availableInputs.startDate,
                endDate: availableInputs.endDate,
                github: availableInputs.github,
                otherLink: availableInputs.otherLink,
                hackathonName: availableInputs.hackathonName,
                favourite: availableInputs.favourite,
                imageName: availableInputs.imageName,
            })
            setImgDisplay('')
            formData.imageName ? setImgDisplay('Click on the box to update the image') : setImgDisplay('')
        }
        setData();

    }, [])




    const handleOnEdit = async (e) => {
        e.preventDefault();

        const allSubmissions = await JSON.parse(localStorage.getItem('hackathonSubmissions'));
        const editItemIndex = editableItem.findIndex((item) => { return item.id == id });

        const imageName = base64 ? base64 : availableInputs.imageName;

            allSubmissions[editItemIndex] = { ...formData, imageName: imageName };
        await localStorage.setItem('hackathonSubmissions', JSON.stringify(allSubmissions));

        window.location.href = '/';
        // console.log(allSubmissions)
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
                            <div>
                                <Form.Control type="file" onChange={(e) => { handleOnChangeImage(e) }} ref={fileInputField} />
                                <div className='inputFile'>
                                    <Form.Label className='custom-file-upload' onClick={() => fileInputField.current.click()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-image" viewBox="0 0 16 16">
                                            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                            <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
                                        </svg>
                                    </Form.Label>
                                </div>
                                <Form.Label className='text-muted'>{imgDisplay}</Form.Label>
                            </div>
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
                            <Form.Control type="text" name='github' placeholder="Enter your Submission's public Github repository link." value={github} onChange={(e) => { handleOnChange(e) }} required />
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