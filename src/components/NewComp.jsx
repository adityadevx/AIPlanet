import { useContext } from 'react'
import { allHackathonContext } from '../context/allHackathon'

const NewComp = () => {

    const hackathons = useContext(allHackathonContext);
    const { items } = hackathons;




    const handleOutput = () => {
        // console.log(getAllHackathon())
        console.log(items)
    }

    return (
        <div>
            <button onClick={handleOutput}>ok</button>
        </div>

    )
}

export default NewComp