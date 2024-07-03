import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Logout from './Pages/Logout';
import Categories from './Pages/Categories';
import AddRecipe from './Pages/AddRecipe';

import { UserContextComponent } from './UserContext';

const App = () => {
    return (
        <UserContextComponent>
        <Layout>
            <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/logout' element={<Logout />} />
                    <Route path='/categories' element={<Categories />} />
                    <Route path='/addrecipe' element={<AddRecipe />}/>
            </Routes>
            </Layout>
        </UserContextComponent>
    );
}

export default App;