import React, { useState } from 'react'
import HeroSection from './components/HeroSection';
import Nav from './components/Nav';
import SubmissionCards from './components/SubmissionCards';
import Submissions from './components/Submissions';
import UploadSubmission from './components/UploadSubmission';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HackathonDetails from './components/HackathonDetails';
import EditHackathon from './components/EditHackathon';


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
              </>
            } />

          <Route path='/submissions' element={
            <>
              <Nav />
              <UploadSubmission />
            </>
          } />

          <Route path='/submissiondetails/:id' element={
            <>
              <Nav />
              <HackathonDetails />
            </>
          } />

          <Route path='/editsubmission/:id' element={
            <>
              <Nav />
              <EditHackathon />
            </>
          } />
        </Routes>
      </Router>
    </>
  );
}

export default App;
