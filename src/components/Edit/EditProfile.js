import React, { useState, useContext, useEffect } from 'react';
import { Container, Form, Button, DropdownButton, ButtonGroup, Dropdown } from 'react-bootstrap';
import { AuthContext } from '../../auth/AuthContext';
import swal from 'sweetalert';
import axios from '../../config/axios';
import { generateToken } from '../../config/axios';
import { types } from '../../config/constant';
import './editprofile.css';


const EditProfile = () => {

    const { user, dispatch } = useContext(AuthContext);

    const userState = {
        name: user.name,
        lastname: user.lastname,
        username: user.username,
        password: '',
        password1: '',
        password2: '',
        option: 1,

    }

    const [state, setState] = useState(userState);


    const onInputChange = e => {

        setState({ ...state, [e.target.name]: e.target.value });

    }

    useEffect(function () {
        generateToken(user.token);

    }, []);


    const onSubmit = async e => {



        try {

            if (state.option === 1) {

                if (state.name != "" && state.lastname != "" && state.username != "") {

                    const res = await axios.put('/user/updateUser',
                        {
                            id: user.id,
                            username: state.username,
                            name: state.name,
                            lastname: state.lastname
                        });

                    if (res.data.message) {

                        swal({
                            title: 'Error',
                            text: res.data.message,
                            icon: 'error'
                        });

                    } else {

                        swal({
                            title: 'Done',
                            text: 'The user was updated succesfully!',
                            icon: 'success'
                        });

                        let id = user.id;
                        let token = user.token;

                        dispatch({
                            type: types.login,
                            payload: {
                               id,
                               username: state.username,
                               name: state.name,
                               lastname: state.lastname,
                               token,
                            }
                         });

                    }

                } else {

                    swal({
                        title: 'Error',
                        text: 'Check the inputs',
                        icon: 'error'
                    });

                }

            } else {

                if (state.password != "" && state.password1 != "" && state.password2 != "") {
                    if (state.password1 == state.password2) {

                        const res = await axios.put('/user/updatePassword',
                            {
                                id: user.id,
                                password: state.password,
                                password1: state.password1,
                            });

                        if (res.data.message) {

                            swal({
                                title: 'Error',
                                text: res.data.message,
                                icon: 'error'
                            });

                        } else {

                            swal({
                                title: 'Done',
                                text: 'The user was updated succesfully!',
                                icon: 'success'
                            });

                        }

                    } else {

                        swal({
                            title: 'Error',
                            text: "Passwords don't match",
                            icon: 'error'
                        });

                    }

                } else {

                    swal({
                        title: 'Error',
                        text: 'Check the inputs',
                        icon: 'error'
                    });

                }
            }

            setTimeout(function () { window.location.reload(); }, 1800);



        }

        catch (error) {

            swal({
                title: 'Error',
                text: 'Server error',
                icon: 'error'
            });

        }

    }


    return (

        <>

            <Container>

                <DropdownButton as={ButtonGroup} className='dropdownMain' title="Select" id="bg-vertical-dropdown-1">
                    <Dropdown.Item eventKey="1" onClick={() => setState({ ...state, option: 1 })}>Username</Dropdown.Item>
                    <Dropdown.Item eventKey="2" onClick={() => setState({ ...state, option: 2 })}>Password</Dropdown.Item>
                </DropdownButton>

                <br />
                <br />

                {state.option === 1 ?

                    <>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="name" value={state.name} onChange={onInputChange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Lastname</Form.Label>
                            <Form.Control name="lastname" value={state.lastname} onChange={onInputChange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control name="username" value={state.username} onChange={onInputChange} />
                        </Form.Group>

                        <br />

                        <Button variant="success" className='btnMake' onClick={onSubmit} type="submit">Update profile</Button>
                    </>

                    :

                    <>
                        <Form.Group className="mb-3">
                            <Form.Label>Type yout current password</Form.Label>
                            <Form.Control name="password" type="password" value={state.password} onChange={onInputChange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Type your new password</Form.Label>
                            <Form.Control name="password1" type="password" value={state.password1} onChange={onInputChange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Confirm your new password</Form.Label>
                            <Form.Control name="password2" type="password" value={state.password2} onChange={onInputChange} />
                        </Form.Group>

                        <br />

                        <Button variant="success" className='btnMake' onClick={onSubmit} type="submit">Update password</Button>
                    </>


                }


            </Container>

        </>

    )
}

export default EditProfile
