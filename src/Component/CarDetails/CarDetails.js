import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link, useHistory, useParams } from 'react-router-dom';
import Header from '../Header/Header';
import './CarDetails.css'
const CarDetails = () => {
    const history=useHistory()
    const [allCars, setAllCars] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/allCars')
            .then(response => response.json())
            .then(data => setAllCars(data))
    }, [])
    const { id } = useParams()
    const carDetails = allCars.find(cd => cd._id === id)
    const deleteHandler = (id) => {
        fetch(`http://localhost:5000/carDelete/${id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    alert('service Delete successfully')
                    history.push('/')
            }
        })}
    return (
        <Container>
            <Header />
            {
                carDetails === undefined ? <p>lodding....</p> :
                    <Row>
                        <Col md={6}>
                            <img className="car-image w-100" src={`data:image/png;base64,${carDetails.image.img}`} alt="" />
                        </Col>
                        <Col className="d-flex align-items-center" md={6}>
                            <div>
                                <h2>{carDetails.carName}</h2>
                                <h5> Price : ${carDetails.price}</h5>
                                <p>{carDetails.carDiscription}</p>
                                <Link to={`/editDetails/${id}`}><Button variant="primary">Edit Details</Button></Link>
                                <Button onClick={() =>deleteHandler(id)}>Delete</Button>
                            </div>
                        </Col>
                    </Row>
            }
        </Container>
    );
};

export default CarDetails;