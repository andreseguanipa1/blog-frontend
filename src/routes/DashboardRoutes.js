import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../components/Home/Home';
import { CreatePost } from '../components/Home/CreatePost';
/* import Main from '../components/Main/main';
import Seller from '../components/Seller/Seller';
import Payments from '../components/Payments/Payments'; */

function DashboardRoutes() {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreatePost />} />
            {/*             <Route path="/payments" element={<Payments />} />    */}
        </Routes>
    )

}

export default DashboardRoutes;