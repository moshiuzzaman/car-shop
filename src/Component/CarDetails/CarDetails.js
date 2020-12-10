import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { carData } from '../../CarData';
import Header from '../Header/Header';
import './CarDetails.css'
const CarDetails = () => {
    const {id}=useParams()
    const carDetails =carData.find(cd=> cd.id==id)
    const { name, image, price }=carDetails
    return (
        <Container>
           <Header/>
           <Row>
               <Col md={6}>
                   <img className="w-100" src={image} alt=""/>
               </Col>
               <Col md={6}>
                   <h2>{name}</h2>
                   <h5>${price}</h5> 
               </Col>
           </Row>
        </Container>
    );
};

export default CarDetails;