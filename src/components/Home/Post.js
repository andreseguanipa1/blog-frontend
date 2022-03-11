import React from 'react';
import './logged.css';

export const Post = (props) => {

    const { data } = props;

    return (

        <>
            <p className='cardText'>{data.content}</p>

            <br />

            <b>Autor:</b> {data.user.name} {data.user.lastname}
        </>

    )
}
