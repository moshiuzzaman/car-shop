import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SingleCar = ({ CarDetails }) => {
    const { name, image, price,id } = CarDetails
    return (
        <Col md={4}>
            <Card>
                <Card.Img variant="top" src={image} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                       ${price}
                    </Card.Text>
                    <Link to={`/cardetails/${id}`}><Button variant="primary">Car Details</Button></Link>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default SingleCar;