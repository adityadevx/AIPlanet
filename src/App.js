import React from 'react'
import HeroSection from './components/HeroSection';
import Nav from './components/Nav';
import Submissions from './components/Submissions';
import UploadSubmission from './components/UploadSubmission';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HackathonDetails from './components/HackathonDetails';
import EditHackathon from './components/EditHackathon';
import NewComp from './components/NewComp';
import { AllHackathonProvider } from './context/allHackathon';



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

                <AllHackathonProvider>
                  <Submissions />
                  {/* <NewComp /> */}
                </AllHackathonProvider>
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
              <AllHackathonProvider>
                <HackathonDetails />
              </AllHackathonProvider>
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
