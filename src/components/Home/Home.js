import React, { useEffect, useContext, useState } from 'react'
import axios, { generateToken } from '../../config/axios';
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../config/constant';
import NavbarLoged from '../Navbar/NavbarLoged';
import Footer from '../Footer/Footer';
import { Col, Row, Card, Container, Modal } from 'react-bootstrap';
import { Post } from './Post';


export const Home = () => {

    const userState = {
        publications: [],
        contentModal: {},
        titleModal: '',
    }

    const [state, setState] = useState(userState);


    const { user, dispatch } = useContext(AuthContext);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (data) => {

        setState({ ...state, contentModal: data, titleModal: data.title });
        setShow(true);

    }

    const logout = () => {
        dispatch({
            type: types.logout,
            payload: {
                name: '',
                token: '',
            }
        })
    }

    useEffect(function () {

        generateToken(user.token);

        axios.get('/user/')
            .then((resp) => {

                if (!resp.data.ok) {
                    logout();
                } else {

                    axios.get(`/publication/all?id=${user.id}`)
                        .then(res => {

                            setState({ publications: res.data.data });

                        }).catch((err) => {
                            console.log(err)

                        })

                }

            }).catch((err) => {
                console.log(err)

            })

    }, [user.token]);


    return (

        <>

            <NavbarLoged />

            <Container className='home'>

                <Row>

                    {
                        state.publications.map(data =>

                            <Col key={data.id}>

                                <Card style={{ width: '18rem', height: '14rem' }} className="card">
                                    <Card.Body>
                                        <Card.Title>{data.title}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{data.user.name} {data.user.lastname}</Card.Subtitle>
                                        <Card.Text className="cardText">
                                            {data.content.length > 94 ? `${data.content.substr(0, 92)}...` : data.content}
                                        </Card.Text>
                                        <Card.Link href="#" onClick={() => { handleShow(data) }} className="openModal"><b>Open</b></Card.Link>
                                    </Card.Body>
                                </Card>

                            </Col>

                        )
                    }




                </Row>

            </Container>

            <Footer id="footer" />


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{state.titleModal}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Post data={state.contentModal} />

                </Modal.Body>
            </Modal>

        </>

    )
}
