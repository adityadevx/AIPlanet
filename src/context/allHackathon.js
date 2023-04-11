import { createContext, useState } from "react";

const allHackathonContext = createContext();

const AllHackathonProvider = (props) => {
    // fetching the local storage items
    let items;
    localStorage.getItem('hackathonSubmissions') === null ? items = [] : items = JSON.parse(localStorage.getItem('hackathonSubmissions'));

    const [allHackathon, setAllHackathon] = useState(items);


    const handleFavourites = (id) => {
        const findUpdateIndex = allHackathon.findIndex((item) => { return item.id === id });
        allHackathon[findUpdateIndex].favourite = !allHackathon[findUpdateIndex].favourite;
        localStorage.setItem('hackathonSubmissions', JSON.stringify(allHackathon));
        return allHackathon[findUpdateIndex].favourite;
    }

    const deleteHackathon = (id) => {
        const findUpdateIndex = allHackathon.findIndex((item) => { return item.id === id });
        allHackathon.splice(findUpdateIndex, 1);
        localStorage.setItem('hackathonSubmissions', JSON.stringify(allHackathon));
    }


    return (
        <allHackathonContext.Provider value={{ items, handleFavourites, deleteHackathon }}>
            {props.children}
        </allHackathonContext.Provider>
    )
}

export { AllHackathonProvider, allHackathonContext };