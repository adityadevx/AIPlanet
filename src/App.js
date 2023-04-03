import React, { useState } from 'react'
import HeroSection from './components/HeroSection';
import Nav from './components/Nav';
import SubmissionCards from './components/SubmissionCards';
import Submissions from './components/Submissions';
import UploadSubmission from './components/UploadSubmission';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HackathonDetails from './components/HackathonDetails';


function App() {
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
                {/* <SubmissionCards submission={submission}/> */}
              </>
            } />

          <Route path='/submissions' element={
            <>
              <Nav />
              <UploadSubmission  />
            </>
          } />

          <Route path='/submissiondetails/:id' element={
            <>
              <Nav />
              <HackathonDetails />
              </>
          }/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
