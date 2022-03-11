import React, { useContext, useState } from 'react';
import { AuthContext } from '../../auth/AuthContext';
import { useNavigate } from 'react-router';
import { types } from '../../config/constant';
import { Navbar, Container, Button, Modal } from 'react-bootstrap';
import EditProfile from '../Edit/EditProfile';


const NavbarLoged = () => {

    const { user, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleLogout = () => {

        dispatch({
            type: types.logout,
            payload: {
                name: '',
                token: '',
                viewer: ''
            }
        })

        navigate("../login", { replace: true });

    }

    return (

        <>

            <Navbar bg="dark" variant="dark">

                <Container>

                    <Container>
                        <Navbar.Brand>
                            <b>My personal and awesome blog</b><br />
                            Welcome, {user.name}  {user.lastname}
                        </Navbar.Brand>
                    </Container>

                    <Navbar.Brand href="#" onClick={handleShow}>
                        Edit profile
                    </Navbar.Brand>

                    <Navbar.Brand href="/">
                        <b>Home</b>
                    </Navbar.Brand>

                    <Navbar.Brand href="/create">
                        <b>Create Post</b>
                    </Navbar.Brand>

                    <Button onClick={handleLogout}>
                        <b>Logout</b>
                    </Button>

                </Container>

            </Navbar>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <EditProfile />

                </Modal.Body>
            </Modal>

        </>


    )
}

export default NavbarLoged;