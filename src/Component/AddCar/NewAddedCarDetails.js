import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import {  useHistory, useParams } from 'react-router-dom';
import Header from '../Header/Header';

const NewAddedCarDetails = (

) => {
    const { id } = useParams()
    const history = useHistory()
    const [allCars, setAllCars] = useState([])
    useEffect(() => {
        fetch('https://fathomless-tundra-53591.herokuapp.com/allCars')
            .then(response => response.json())
            .then(data => setAllCars(data))
    }, [])
    const carDetails = allCars.find(cd => cd.id === id)
    const deleteHandler = (id) => {
        fetch(`https://fathomless-tundra-53591.herokuapp.com/carDelete/${id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    alert('service Delete successfully')
                    history.push('/')
                }
            })
    }
    const [modalShow, setModalShow] = React.useState(false);
    const { register, handleSubmit } = useForm();
    const onSubmit = (data, e) => {
        const formData = new FormData()
        formData.append('carName', data.carName)
        formData.append('price', data.price)
        formData.append('carDiscription', data.carDiscription)
        fetch(`https://fathomless-tundra-53591.herokuapp.com/editDetails/${id}`, {
            method: 'PATCH',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    alert('Successfully Updated cars')
                    setModalShow(false)
                    window.location.reload()
                }
            })
    }
    return (
        <div className="addedNewCartDetails">
            <Header />
            <Container>
                {
                    carDetails === undefined ? <p>lodding....</p> :
                        <div className="flex align-items-center mt-5">
                            <Row >
                                <Col md={6}>
                                    <img className="car-image w-100" src={`data:image/png;base64,${carDetails.image.img}`} alt="" />
                                </Col>
                                <Col className="d-flex align-items-center" md={6}>
                                    <div className="ml-md-5">
                                        <h2 className="product title">{carDetails.carName}</h2>
                                        <h5> Price : ${carDetails.price}</h5>
                                        <p>{carDetails.carDiscription}</p>
                                        <Button onClick={() => setModalShow(true)} variant="primary">Edit Details</Button>
                                        <Button onClick={() => deleteHandler(id)}>Delete</Button>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                }
                <Modal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Update car Details
        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            carDetails !== undefined && <div>
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    <Form.Row className='dashboard-admin-form'>
                                        <Form.Group as={Col} md='6' controlId="formGridName">
                                            <Form.Label>Car name</Form.Label>
                                            <Form.Control type="text" defaultValue={carDetails.carName} name='carName' placeholder="Car Name" ref={register({ required: true })} />
                                        </Form.Group>
                                        <Form.Group as={Col} md='6' controlId="formGridPrice">
                                            <Form.Label>Price</Form.Label>
                                            <Form.Control type="number" name='price' defaultValue={carDetails.price} placeholder="Price" ref={register({ required: true })} />
                                        </Form.Group>
                                        <Form.Group as={Col} md='12' controlId="formGridDetails">
                                            <Form.Label>Car Details</Form.Label>
                                            <Form.Control name='carDiscription' defaultValue={carDetails.carDiscription} placeholder="Enter Car Details" as="textarea" rows="3" ref={register({ required: true })} />
                                        </Form.Group>
                                    </Form.Row>
                                    <Button className="Button-add-car-form mb-5" type="submit">UpdateDetails</Button>
                                </Form>
                            </div>
                        }
                    </Modal.Body>

                </Modal>
            </Container>
        </div>
    );
};

export default NewAddedCarDetails;