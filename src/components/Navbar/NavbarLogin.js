import React from 'react'
import { Navbar, Container, Nav } from "react-bootstrap";
// import '../../assets/css/navbar.css'


const NavbarLogin = () => {
    return (

        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">
                    My personal and awesome blog
                </Navbar.Brand>

            </Container>
        </Navbar>
    )
}

export default NavbarLogin


// <Navbar className="color-nav"  variant="dark">
// <Container>
//     <Navbar.Brand href="#home">
//         <b className="nav">Control de cobranzas Lago Mall</b>
//     </Navbar.Brand>
// </Container>
// </Navbar>
