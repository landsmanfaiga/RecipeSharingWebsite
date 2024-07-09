import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipePreview from '../components/RecipePreview';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {

    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getRecipes();
        setIsLoading(false);
    },[]);
    const getRecipes = async () => {
        const { data } = await axios.get('/api/recipe/getrecipes');
        setRecipes(data);
    };

    if (isLoading) {
        return <div className='container' style={{ marginTop: 300 }}>
            <div className='d-flex w-100 justify-content-center align-self-center'>
                <h1>Loading...</h1>
            </div>
        </div>
    }
    
    return (

        <div className="container" style={{ marginTop: 80 }}>
            <div className="container mt-5" style={{
                backgroundColor: "rgb(245, 245, 245)",
                padding: 20,
                borderRadius: 10
            }}>
                <div className="jumbotron bg-light p-5 rounded-lg mb-4 shadow" style={{ color: "rgb(35, 170, 200)" } }>
                    <h1 className="display-4 d-flex w-100 justify-content-center align-self-center">Welcome to Recipes.com</h1>    
                        <p className="lead d-flex w-80" style={{ textAlign: 'center' }}>Explore the most delicious recipes shared by our community. Share your own recipes and get inspired by others!</p>
                    <p className="d-flex w-100 justify-content-center align-self-center">Here are some of the latest recipes:</p>
                </div>
                <div className="row">
                    {recipes.map(r => (
                        <RecipePreview id={r.id}
                            title={r.title}
                            imageUrl={r.imageUrl}
                            category={r.category}
                            ingredients={r.ingredients}
                            steps={r.steps}
                            sharePublicly={r.sharePublicly}
                            fromAdd={false}></RecipePreview>
                    )) }
                    
                </div>
            </div>
        </div>
    );
};

export default Home;