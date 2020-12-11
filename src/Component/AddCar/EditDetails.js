import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import Header from '../Header/Header';

const EditDetails = () => {
    const history=useHistory()
    const location=useLocation()
    const [allCars, setAllCars] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/allCars')
            .then(response => response.json())
            .then(data => setAllCars(data))
    }, [])
    const { id } = useParams()
    const carDetails = allCars.find(cd => cd.id === id)
    const { register, handleSubmit } = useForm();
    const onSubmit = (data, e) => {
        const formData = new FormData()
        formData.append('carName', data.carName)
        formData.append('price', data.price)
        formData.append('carDiscription', data.carDiscription)
        fetch(`http://localhost:5000/editDetails/${id}`, {
            method: 'PATCH',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    alert('Successfully Updated cars')
                    console.log(location , history)
                    // history.push(`http://localhost:3000/editDetails/${id}`)
                }
            })
    }
    return (
        <Container>
            <Header />
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
        </Container>
    );
};

export default EditDetails;