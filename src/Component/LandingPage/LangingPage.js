import React, { useEffect, useState } from 'react';
import { Container, FormControl, InputGroup, Row } from 'react-bootstrap';
import Header from '../Header/Header';
import './LangingPage.css'
import { BsSearch } from 'react-icons/bs';
import SingleCar from './SingleCar';
import CarsPagination from './CarsPagination';
import './LangingPage.css'
const LangingPage = () => {

    const [search, setSearch] = useState("");
    const [allCars, setAllCars] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [carsPerPage] = useState(6)
    useEffect(() => {
        fetch('https://fathomless-tundra-53591.herokuapp.com/allCars')
            .then(response => response.json())
            .then(data => setAllCars(data))
    }, [])
    let carfilter = allCars.length > 0 && allCars.filter(cd => {
        return cd.brandName.toLowerCase().indexOf(search.toLowerCase()) !== -1
    })
    // get current cars
    const indexOfLastCar = currentPage * carsPerPage;
    const indexOfFirstCar = indexOfLastCar - carsPerPage;
    const currentCars = carfilter !== false && carfilter.slice(indexOfFirstCar, indexOfLastCar)

    //change page
    const paginate = (num) => { setCurrentPage(num) }
    const searchHandeler = (e) => {
        setSearch(e.target.value)
    }
    return (
        <div className="landingPage">
            <Header />
            <Container>

                <div className="searchbar mt-4">
                    <div align="center" className="search-section">
                        <h4>Search your fevourite brand here</h4>
                        <InputGroup className="mb-3 searchbar">

                            <FormControl className="search-input" onChange={searchHandeler} aria-label="Amount (to the nearest dollar)" />
                            <InputGroup.Append>
                                <InputGroup.Text className="search-input_icon"><BsSearch /></InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </div>
                    <Row>
                        {
                            carfilter === false ? <p>lodding...</p> : carfilter.length === 0 ? <p>NO CAR FOUND </p> : currentCars.map((ac, index) => <SingleCar CarDetails={ac} key={index}></SingleCar>)
                        }
                    </Row>
                    <CarsPagination carsPerPage={carsPerPage} totalCars={carfilter.length} paginate={paginate} />
                </div>
            </Container>
        </div>
    );
};

export default LangingPage;