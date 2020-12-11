import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import './CarDetails.css'
const CarDetails = () => {
    const [allCars, setAllCars] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/allCars')
            .then(response => response.json())
            .then(data => setAllCars(data))
    }, [])
    const { id } = useParams()
    const carDetails = allCars.find(cd => cd._id === id)

    return (
        <div className="carDetails">
            <Header />
            <Container className=" my-5">
                {
                    carDetails === undefined ? <p>lodding....</p> :
                        <div className="flex align-items-center  ">
                            <Row >
                                <Col md={6}>
                                    <img className="car-image w-100" src={`data:image/png;base64,${carDetails.image.img}`} alt="" />
                                </Col>
                                <Col className="d-flex align-items-center" md={6}>
                                    <div className="ml-md-5">
                                        <h2 className="product title">{carDetails.carName}</h2>
                                        <h5> Price : ${carDetails.price}</h5>
                                        <p>{carDetails.carDiscription}</p>
                                        <Button>Add to cart</Button>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                }
            </Container>
        </div>
    );
};

export default CarDetails;