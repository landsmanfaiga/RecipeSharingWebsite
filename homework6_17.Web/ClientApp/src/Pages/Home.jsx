import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipePreview from '../components/RecipePreview';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {

    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [arr1, setArr1] = useState([]);
    const [inArr, setInArr] = useState(false);
    const [text, setText] = useState('');


    useEffect(() => {
        getRecipes();
        setIsLoading(false);
    }, []);
    const getRecipes = async () => {
        const { data } = await axios.get('/api/recipe/getrecipes');
        setRecipes(data);
    };
    const onSubmitClick = async () => {
        if (text !== '') {
            setIsLoading(true);
            setInArr(true)
            let arr = [];
            recipes.forEach(r => (r.title.toLowerCase().includes(text.toLowerCase()) && arr.push(r)));
            recipes.forEach(r => (r.category.name.toLowerCase().includes(text.toLowerCase()) && arr.push(r)));
            setArr1(arr);
            setText('');
            setIsLoading(false);
        } 
    }

    const onSortChange = async(e) => {
        setIsLoading(true);
        if (e.target.value == 1) {
            setRecipes([...recipes].sort(function (a, b) {
                if (a.title < b.title) return -1;
                return 1;
            }))
        }
        else if (e.target.value == 2) {
            setRecipes([...recipes].sort(function (a, b) { return a.id - b.id }))
        }
        else if (e.target.value == 3) {
            setRecipes([...recipes].sort(function (a, b) { return b.rating - a.rating }))
        }
        setIsLoading(false);
    }

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
                    <div className="jumbotron bg-light p-5 rounded-lg mb-4 shadow" style={{ color: "rgb(35, 170, 200)" }}>
                        <h1 className="display-4 d-flex w-100 justify-content-center align-self-center">Welcome to Recipes.com</h1>
                        <p className="lead d-flex w-80" style={{ textAlign: 'center' }}>Explore the most delicious recipes shared by our community. Share your own recipes and get inspired by others!</p>
                        <p className="d-flex w-100 justify-content-center align-self-center">Here are some of the latest recipes:</p>
                    </div>
                    <div className='container col-md-8 mb-4'>
                        <select className="form-select" onChange={onSortChange}><option value="-1">Sort</option><option value="1">A to Z</option><option value="2">Most Recent</option><option value="3">Most Liked</option></select>
                        <input type="text" className="form-control" style={{ height: 50, marginTop: 20 }} placeholder="Search" value={text} onChange={e => setText(e.target.value)} />
                        <button type="submit" className="btn btn-info w-25 offset-4" style={{ color: "rgb(245, 245, 245)", marginTop: 10 }} onClick={onSubmitClick}>Search</button>
                    </div>
                    <div className="row" style={{ marginTop: 20 }}>
                        {!!recipes.length && !arr1.length && !inArr && recipes.map(r => (
                            <RecipePreview id={r.id}
                                title={r.title}
                                imageUrl={r.imageUrl}
                                category={r.category}
                                ingredients={r.ingredients}
                                steps={r.steps}
                                sharePublicly={r.sharePublicly}
                                fromAdd={false}
                                home={true}></RecipePreview>
                        ))}
                        {!!arr1.length && arr1.map(r => (
                            <RecipePreview id={r.id}
                                title={r.title}
                                imageUrl={r.imageUrl}
                                category={r.category}
                                ingredients={r.ingredients}
                                steps={r.steps}
                                sharePublicly={r.sharePublicly}
                                fromAdd={false}
                                home={true}></RecipePreview>
                        ))}

                        {!isLoading && (!recipes.length || (inArr && !arr1.length)) &&  <div className='container col-md-8 mb-4' style={{ marginTop: 75 }}>
                            <div>
                                <h1 style={{ textAlign: 'center', fontSize: 30 }}>Sorry, there are no recipes that match your search</h1>
                            </div>
                        </div> }
                    </div>
                </div>
            </div>

        );
    }


  


export default Home;