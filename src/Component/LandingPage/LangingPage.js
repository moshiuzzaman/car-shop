import React, { useEffect, useState } from 'react';
import { Container, FormControl, InputGroup, Row } from 'react-bootstrap';
import Header from '../Header/Header';
import './LangingPage.css'
import { BsSearch } from 'react-icons/bs';
import SingleCar from './SingleCar';
const LangingPage = () => {
    const [search, setSearch] = useState("");
    const [allCars, setAllCars] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/allCars')
            .then(response => response.json())
            .then(data => setAllCars(data))
    }, [])
    const carfilter = allCars.length>0 && allCars.filter(cd => {
        return cd.brandName.toLowerCase().indexOf(search.toLowerCase()) !== -1
    })

const searchHandeler = (e) => {
    setSearch(e.target.value)
}
return (
    <Container>
        <Header />
        <div className="searchbar">
            <InputGroup className="mb-3">
                <FormControl onChange={searchHandeler} aria-label="Amount (to the nearest dollar)" />
                <InputGroup.Append>
                    <InputGroup.Text><BsSearch /></InputGroup.Text>
                </InputGroup.Append>
            </InputGroup>
            <Row>
                {
                   carfilter ===false  ? <p>lodding...</p> : carfilter.map((ac, index) => <SingleCar CarDetails={ac} key={index}></SingleCar>)
                }
            </Row>
        </div>
    </Container>
);
};

export default LangingPage;