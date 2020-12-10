import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SingleCar = ({ CarDetails }) => {
    const { carName, image, price,_id } = CarDetails
    return (
        <Col md={4}>
            <Card>
                <Card.Img variant="top" src={`data:image/png;base64,${image.img}`} />
                <Card.Body>
                    <Card.Title>{carName}</Card.Title>
                    <Card.Text>
                       ${price}
                    </Card.Text>
                    <Link to={`/cardetails/${_id}`}><Button variant="primary">Car Details</Button></Link>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default SingleCar;