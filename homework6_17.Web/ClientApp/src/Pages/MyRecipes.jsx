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
                    {recipes.map(r => (
                        <RecipePreview id={r.id}
                            title={r.title}
                            imageUrl={r.imageUrl}
                            category={r.category}
                            ingredients={r.ingredients}
                            steps={r.steps}
                            sharePublicly={r.sharePublicly}
                            fromAdd={false}></RecipePreview>
                    ))}

                </div>
            </div>
        </div>
    );
}

export default MyRecipes;
