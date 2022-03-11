import React, { Component } from 'react'
import { Card } from "react-bootstrap";
import "./footer.css"


const Footer = () => {
    return (
        <div>
            <div>
                <Card className='style-footer'>
                    <Card.Body>
                        <p>Andres Guanipa - 2022</p>
                        <p>© All rights reserved</p>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default Footer
