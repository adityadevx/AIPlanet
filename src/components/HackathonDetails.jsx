import { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function HackathonDetails() {

  const [details, setDetails] = useState([]);

  const hackathon = async () => {
    const currentUrl = await window.location.href;
    const hackathonId = await currentUrl.split('/').slice(-1).toString();
    // console.log(hackathonId)

    const obj = await localStorage.getItem('hackathonSubmissions');
    console.log(JSON.parse(obj));
    const parsedObj = await JSON.parse(obj);


    const selectedItem = parsedObj.filter((item) => {
      return item.id == hackathonId;
    })
    console.log(typeof selectedItem, selectedItem)
    await setDetails(selectedItem)
    console.log(details)
  }

  const handleFavourite = async () => {
    console.log('favourite');
    const obj = localStorage.getItem('hackathonSubmissions');
    const parsedObj = JSON.parse(obj);

    // console.log(parsedObj);

    const currentUrl = await window.location.href;
    const hackathonId = await currentUrl.split('/').slice(-1).toString();

    console.log(parsedObj[hackathonId]);
     parsedObj[hackathonId].favourite = true;

    localStorage.setItem('hackathonSubmissions', JSON.stringify(parsedObj));

    // const selectedItem = parsedObj.filter((item) => {
    //   return item.id == hackathonId;
    // })



    // selectedItem[0].favourite = true;
    // console.log(selectedItem[0].favourite)
    // localStorage.setItem('hackathonSubmissions', JSON.stringify('hackathonSubmissions',));

  }


  useEffect(() => {
    hackathon();
  }, [])



  return (
    <>
      <Container fluid>
        {details.length === 0 ?
          <h1>Nothing to display</h1>
          :
          <>
            <Container fluid style={{ backgroundColor: 'rgba(0, 49, 69, 1)', color: 'white' }}>
              {details.length === 0 ? <h1>Nothing to display</h1> :
                <Row className='p-5'>
                  <Col sm={9}>
                    <Col className='d-flex align-items-center '>
                      <div>
                        <img src={details[0].imageName} alt="" height={100} width={100} />
                      </div>

                      <div>
                        <h1 className='px-5'>{details[0].title}</h1>
                      </div>

                    </Col>
                    <Col className='py-3'>{details[0].summary}</Col>
                    <Col><span onClick={() => { handleFavourite() }} ><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
                      <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                    </svg></span>
                      |
                      <span>{details[0].startDate}</span>
                    </Col>
                  </Col>
                  <Col sm={3} className='' >
                    <Col>1of 1</Col>
                    <Col>2of 2</Col>
                  </Col>
                </Row>}
            </Container >
            {/* desccription */}
            <Container className='mt-3'>
              <Row>
                <Col sm={9} className='px-2'>
                  <p>Description</p>
                  <p>{details[0].description}</p>
                </Col>
                <Col sm={3}>
                  <Col>Hackathon</Col>
                  <br />
                  <Col className='fw-bold'>Oceanic Treasure Hunt</Col>
                  <br />
                  <Col>26-Feb-2022 - 28-Feb-2022</Col>
                  <br />
                  <Col>
                    <button type='button'>Github Repository</button>
                  </Col>
                  <br />
                  <Col>
                    <button type='button'>Other Link</button>
                  </Col>
                </Col>
              </Row>
            </Container>
          </>
        }
      </Container>
    </>
  )
}

export default HackathonDetails