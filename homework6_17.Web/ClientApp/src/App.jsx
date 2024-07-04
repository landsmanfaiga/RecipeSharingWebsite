import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Logout from './Pages/Logout';
import Categories from './Pages/Categories';
import AddRecipe from './Pages/AddRecipe';
import MyRecipes from './Pages/MyRecipes';

import PrivateRoute from './components/PrivateRoute';
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
                    <Route path='/categories' element={
                        <PrivateRoute>
                            <Categories />
                        </PrivateRoute>} />
                    <Route path='/addrecipe' element={
                        <PrivateRoute>
                            <AddRecipe />
                        </PrivateRoute>} />
                    <Route path='/myrecipes' element={
                        <PrivateRoute>
                            <MyRecipes />
                        </PrivateRoute>} />
            </Routes>
            </Layout>
        </UserContextComponent>
    );
}

export default App;