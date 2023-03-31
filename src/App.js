import React, { useState } from 'react'
import HeroSection from './components/HeroSection';
import Nav from './components/Nav';
import SubmissionCards from './components/SubmissionCards';
import Submissions from './components/Submissions';
import UploadSubmission from './components/UploadSubmission';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {

  let hackathonSubmissions;

  //Check if there are any submissions in local storage
  if (localStorage.getItem('hackathonSubmissions') === null) {
    hackathonSubmissions = [];
  }
  else {
    hackathonSubmissions = JSON.parse(localStorage.getItem('hackathonSubmissions'));
  }

  const [submission, setSubmission] = useState(hackathonSubmissions);

  const addSubmission = (formValue,imageValue) => {
   console.log(imageValue);
   
    let id;
    if (hackathonSubmissions.length === 0) {
      id = 0;
    }
    else {
      id = hackathonSubmissions[hackathonSubmissions.length - 1].id + 1;
    }
    const mySubmission = {
      id: id,
      title: formValue.title,
      summary: formValue.summary,
      description: formValue.description,
      imageName: imageValue.name,
      startDate: formValue.startDate,
      endDate: formValue.endDate,
      github: formValue.githubLink,
      otherLink: formValue.otherLink,
    }
    setSubmission([...submission, mySubmission]);
    localStorage.setItem('hackathonSubmissions', JSON.stringify([...submission, mySubmission]));

  }


  return (
    <>
      <Router>
        <Routes>
          <Route path='/'
            element={
              <>
                <Nav />
                <HeroSection />
                <Submissions />
                <SubmissionCards submission={submission}/>
              </>
            } />

          <Route path='/submissions' element={
            <>
              <Nav />
              <UploadSubmission addSubmission={addSubmission} />
            </>
          } />
        </Routes>
      </Router>
    </>
  );
}

export default App;
