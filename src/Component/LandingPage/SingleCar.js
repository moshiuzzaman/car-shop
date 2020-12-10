import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';

const SingleCar = ({ CarDetails }) => {
    const { name, image, price } = CarDetails
    return (
        <Col md={4}>
            <Card>
                <Card.Img variant="top" src={image} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                       ${price}
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default SingleCar;