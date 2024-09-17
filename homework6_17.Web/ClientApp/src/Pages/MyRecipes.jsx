import { useEffect, useState } from 'react';
import RecipePreview from '../components/RecipePreview';
import axios from 'axios';
import { useUser } from '../UserContext';

const MyRecipes = () => {

    const { user } = useUser();
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const getRecipes = async () => {
            const { data } = await axios.get('/api/recipe/getrecipesforme');
            setRecipes(data);
            setIsLoading(false);
        }
        getRecipes();
    },[])

    if (isLoading) {
        return <div className='container' style={{ marginTop: 300 }}>
            <div className='d-flex w-100 justify-content-center align-self-center'>
                <h1>Loading...</h1>
            </div>
        </div>
    }

    return (

        <div className="container">
            <div className="container mt-5">
                <div className="jumbotron bg-light p-5 rounded-lg mb-4 shadow">
                    <h1 className="display-4">{user.firstName} {user.lastName}'s Recipes:</h1>
                </div>
                <div className="row">
                    {recipes && recipes.map(r => (
                        <RecipePreview id={r.id}
                            title={r.title}
                            imageUrl={r.imageUrl}
                            category={r.category}
                            ingredients={r.ingredients}
                            steps={r.steps}
                            sharePublicly={r.sharePublicly}
                            fromAdd={false}
                            home={false}></RecipePreview>
                    ))}
                    {!recipes.length && <div className='container col-md-8 mb-4' style={{ marginTop: 75 }}>
                        <div>
                            <h1 style={{ textAlign: 'center', fontSize: 30 }}>There are no recipes for this user</h1>
                        </div>
                    </div> }

                </div>
            </div>
        </div>
    );
}

export default MyRecipes;
