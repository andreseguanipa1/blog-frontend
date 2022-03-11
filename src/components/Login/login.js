import React, { useContext, useState } from 'react';
import axios from '../../config/axios';
import { useNavigate } from 'react-router';
import { types } from '../../config/constant';
import Footer from '../Footer/Footer';
import NavbarLogin from '../Navbar/NavbarLogin';
import { AuthContext } from '../../auth/AuthContext';
import swal from 'sweetalert';
import './login.css';

const Login = () => {

   let navigate = useNavigate();

   const { dispatch } = useContext(AuthContext);

   const defaultState = {
      username: '',
      password: ''
   }

   const [state, setState] = useState(defaultState);

   const onInputChange = (e) => {
      setState({ ...state, [e.target.name]: e.target.value });

   }

   const onSubmitForm = (e) => {

      e.preventDefault();

      if (state.username === '' || state.password === ``) {

         swal({
            title: 'Error',
            text: 'Check the inputs',
            icon: 'error'
         });

      } else {

         axios.post('/user/login',
            {
               username: state.username,
               password: state.password,
            }).then(data => {

               if (data.data.ok === true) {

                  dispatch({
                     type: types.login,
                     payload: {
                        id:data.data.usuario.id,
                        username: data.data.usuario.username,
                        name: data.data.usuario.name,
                        lastname: data.data.usuario.lastname,
                        token: data.data.token,
                     }
                  })

                  navigate("../", { replace: true });


               } else {
                  swal({
                     title: 'Error',
                     text: 'User or password Incorrect',
                     icon: 'error'
                  });
               }

            })
      }
   }


   return (
      <>

         <NavbarLogin />

         <div className='theLogin'>
            <div className="wrapper">
               <div className="title">
                  Log in
               </div>
               <form onSubmit={onSubmitForm}>
                  <div className="field">
                     <input type="text" name="username" onChange={onInputChange} required></input>
                     <label>User</label>
                  </div>
                  <div className="field">
                     <input type="password" name="password" onChange={onInputChange} required></input>
                     <label>Password</label>
                  </div>
                  <br /> <br />
                  <div className="field">
                     <input type="submit" value="Go!"></input>
                  </div>

               </form>
            </div>
         </div>

         <Footer />


      </>

   )
}

export default Login
