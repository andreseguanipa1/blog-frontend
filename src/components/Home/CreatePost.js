import React, { useEffect, useContext, useState } from 'react'
import axios, { generateToken } from '../../config/axios';
import { AuthContext } from '../../auth/AuthContext';
import { useNavigate } from 'react-router';
import swal from 'sweetalert';
import { types } from '../../config/constant';
import NavbarLoged from '../Navbar/NavbarLoged';
import Footer from '../Footer/Footer';
import './logged.css';


export const CreatePost = () => {

    let navigate = useNavigate();


    const { user, dispatch } = useContext(AuthContext);

    const defaultState = {
        title: '',
        content: ''
    }

    const [state, setState] = useState(defaultState);

    const onInputChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });

    }


    const onSubmitForm = (e) => {

        e.preventDefault();

        if (state.title === '' || state.content === ``) {

            swal({
                title: 'Error',
                text: 'Check the inputs',
                icon: 'error'
            });

        } else {

            axios.post('/publication/create',
                {
                    idUser: user.id,
                    title: state.title,
                    content: state.content,
                }).then(data => {

                    if (data.data.ok === true) {

                        swal({
                            title: 'Done',
                            text: 'Post saved successfully',
                            icon: 'success'
                        });

                        setTimeout(function(){
                            navigate("../", { replace: true });

                        }, 1100)


                    } else {
                        swal({
                            title: 'Error',
                            text: 'Check the inputs',
                            icon: 'error'
                        });
                    }

                })
        }
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
                }

            }).catch((err) => {
                console.log(err)

            })

    }, [user.token]);


    return (

        <>

            <NavbarLoged />



            <div className='d-flex justify-content-center insert'>
                <div className="wrapper-create">
                    <div className="title-create">
                        Create a post
                    </div>
                    <form onSubmit={onSubmitForm}>
                        <div className="field-create">
                            <input type="text" name="title" onChange={onInputChange} required></input>
                            <label>Titulo</label>
                        </div>
                        <div className="field-create">
                            <textarea type="password" name="content" onChange={onInputChange} required></textarea>
                            <label>Contenido</label>
                        </div>
                        <div className="field-create button">
                            <input type="submit" value="Save"></input>
                        </div>

                    </form>
                </div>
            </div>



            <br />
            <br />
            <br />
            <br />
            <br />


            <Footer />

        </>

    )
}
