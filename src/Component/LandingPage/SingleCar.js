import { Rating } from '@material-ui/lab';
import React, { useState } from 'react';
import { Button, Card, Col, Form, Modal } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

const SingleCar = ({ CarDetails }) => {
    const { carName, image, price, _id, rating } = CarDetails
    console.log(CarDetails)
    const history = useHistory()
    const redirect = () => {
        history.push(`/cardetails/${_id}`)
    }
    const [ratingAndComment, setRatingAndComment] = useState({
        comment:'',
        rating:''
    });
    const [modalShow, setModalShow] = React.useState(false);
    const feedbackHandeler=()=>{
        fetch(`http://localhost:5000/review/${_id}`, {
            method: 'PATCH',
            body: JSON.stringify({ ratingAndComment }),
            headers: { "Content-Type": "application/json" }
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    window.location.reload();
                }
            })
    }
    return (
        <Col md={4}>
            <Card>
                <Card.Img onClick={() => { redirect(_id) }} variant="top" src={`data:image/png;base64,${image.img}`} />
                <Rating
                    name="simple-controlled"
                    value={rating}
                    readOnly
                />
                <Card.Body>
                    <Card.Title>{carName}</Card.Title>
                    <Card.Text>
                        Price : ${price}
                    </Card.Text>
                    <Link to={`/cardetails/${_id}`}><Button variant="primary">Car Details</Button></Link>
                    <Button variant="primary" onClick={() => setModalShow(true)}>Car Details</Button>
                </Card.Body>
            </Card>
            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Ratting and comment
                 </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Row className='dashboard-admin-form'>
                            <Form.Group as={Col} md='6' controlId="formGridName">
                                <Form.Control 
                                type="text" 
                                placeholder="Add your comment"  
                                onChange={(e) => {
                                    setRatingAndComment({...ratingAndComment, comment:e.target.value});
                                }}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md='6' controlId="formGridPrice">
                                <Rating
                                    name="simple-controlled"
                                    onChange={(event, newValue) => {
                                        setRatingAndComment({...ratingAndComment, rating:newValue});
                                    }}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Button onClick={feedbackHandeler}  className="Button-add-car-form mb-5">send feedback</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Col>
    );
};

export default SingleCar;