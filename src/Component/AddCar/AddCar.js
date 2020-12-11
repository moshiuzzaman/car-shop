import React from 'react';
import { Button, Col, Container, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import './AddCar.css'

const AddCar = () => {
    const history = useHistory()
    const { register, handleSubmit } = useForm();
    const onSubmit = (data, e) => {
        var uniqId = 'id' + (new Date()).getTime();
        const formData = new FormData()
        formData.append('file', data.image[0])
        formData.append('carName', data.carName)
        formData.append('id', uniqId)
        formData.append('price', data.price)
        formData.append('carDiscription', data.carDiscription)
        formData.append('brandName', data.brandName)
        fetch('http://localhost:5000/addCar', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data) {

                    history.push(`newAddedCar/${uniqId}`)
                }
            })
    }
    return (
        <div className="add_car_section">
            <Header />
            <Container>
                <div className='mt-5'>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Row className='dashboard-admin-form'>
                            <Form.Group as={Col} md='6' controlId="formGridName">
                                <Form.Label>Car name</Form.Label>
                                <Form.Control type="text" name='carName' placeholder="Car Name" ref={register({ required: true })} />
                            </Form.Group>
                            <Form.Group as={Col} md='6' controlId="formGridBrand">
                                <Form.Label>Brand Name</Form.Label>
                                <Form.Control type="text" name='brandName' placeholder="Brand Name" ref={register({ required: true })} />
                            </Form.Group>
                            <Form.Group as={Col} md='6' controlId="formGridPrice">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="number" name='price' placeholder="Price" ref={register({ required: true })} />
                            </Form.Group>

                            <Form.Group as={Col} md='6' controlId="formGridImage">
                                <Form.File
                                    label="Select a car image"
                                    data-browse="Upload Image"
                                    name='image'
                                    ref={register({ required: true })}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md='12' controlId="formGridDetails">
                                <Form.Label>Car Details</Form.Label>
                                <Form.Control name='carDiscription' placeholder="Enter Car Details" as="textarea" rows="3" ref={register({ required: true })} />
                            </Form.Group>
                        </Form.Row>
                        <Button className="Button-add-car-form mb-5" type="submit">Send</Button>
                    </Form>
                </div>
            </Container>
        </div>
    );
};

export default AddCar;