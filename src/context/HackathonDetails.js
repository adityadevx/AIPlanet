import { createContext } from "react";


const hackathomContext = createContext();


const HackathonState = (props) => {

    const submissionDetails = {};
    const addSubmission = (value1,value2) => {


    };
    const deleteSubmission = (id) => {

    }
    return (
        <hackathomContext.Provider value={{ submissionDetails, addSubmission, deleteSubmission }}>
            {props.children}
        </hackathomContext.Provider>
    )

}

export default HackathonState;