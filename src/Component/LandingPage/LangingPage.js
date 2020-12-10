import React, { useState } from 'react';
import { Container, FormControl, InputGroup, Row } from 'react-bootstrap';
import Header from '../Header/Header';
import './LangingPage.css'
import { BsSearch } from 'react-icons/bs';
import { carData } from '../../CarData';
import SingleCar from './SingleCar';
const LangingPage = () => {
    let AllCars = carData
    const [search, setSearch] = useState("");

    const carfilter = carData.filter(cd => {
        return cd.brand.toLowerCase().indexOf(search.toLowerCase()) !== -1
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
                    carfilter.map((ac, index) => <SingleCar CarDetails={ac} key={index}></SingleCar>)
                }
            </Row>
        </div>
    </Container>
);
};

export default LangingPage;