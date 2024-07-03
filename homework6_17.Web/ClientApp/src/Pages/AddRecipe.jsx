import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RecipePreview from '../components/RecipePreview';

const AddRecipe = () => {

    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [recipe, setRecipe] = useState({
        title: '',
        imageUrl: '',
        sharePublicly: false
    });
    const [category, setCategory] = useState('');
    const [categoryId, setCategoryId] = useState('');

    const [ingredients, setIngredients] = useState({ 0: '' });
    const [steps, setSteps] = useState({ 0: '' });

    const [array, setArray] = useState([0]);
    const [x, setX] = useState(1);

    const fileRef = useRef();
    const [image, setImage] = useState(null);

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const onFileChange = () => {
        setImage(fileRef.current.files[0]);
    }

    const onAddIngredient = () => {
        setX(x+1);
        setArray([...array, x]);
    }

    const onIngredientChange = (e, x) => {      
        setIngredients({ ...ingredients, [x]: e.target.value });
    }

    const [array2, setArray2] = useState([0]);
    const [y, setY] = useState(1);

    const onAddStep = () => {
        setY(y + 1);
        setArray2([...array2, y]);
    }

    const onStepChange = (e, y) => {
        setSteps({ ...steps, [y]: e.target.value });
    }

    useEffect(() => {
        const getCategories = async () => {
            const { data } = await axios.get('/api/category/getcategories')
            setCategories(data);
        }
        getCategories();
    },[])

    const onTextChange = (e) => {
        const copy = { ...recipe };
        copy[e.target.name] = e.target.value;
        setRecipe(copy);
    }

    const onAddClick = async (e) => {

        e.preventDefault();

        const recipe2 = {
            title: recipe.title,
            categoryId: categoryId,
            ingredients: JSON.stringify(Object.values(ingredients)),
            steps: JSON.stringify(Object.values(steps)),
            imageUrl: await toBase64(image),
            sharePublicly: recipe.sharePublicly
        }

        await axios.post('/api/recipe/addrecipe', recipe2);
        navigate('/');
    }

    const setShare = () => {
        const copy = { ...recipe };
        copy.sharePublicly = !copy.sharePublicly;
        setRecipe(copy);
    }

    const onCategoryChange = (e) => {
        setCategoryId(e.target.value);
        setCategory(categories.find(c => c.id === +e.target.value).name);        
    }

    let imageUrl = '';
    if (image) {
        imageUrl = URL.createObjectURL(image);
    }

    const { title, sharePublicly } = recipe;

    return (<>
        <div className="container">
            <div className="container mt-5 d-flex">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h2 className="mb-4 text-center">Add a New Recipe</h2>
                        <form onSubmit={onAddClick}>
                            <div className="mb-3">
                                <label className="form-label">Recipe Title</label>
                                <input type="text" className="form-control" name="title" value={title} onChange={onTextChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Category</label>
                                <select className="form-select" name="category" onChange={onCategoryChange}>
                                    <option value="-1">Select a category</option>
                                    {categories.map(c => (
                                        <option value={c.id} key={c.id}>{c.name}</option>
                                    )) }
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Ingredients</label>
                                {array.map(x => (<div key={x}>
                                    <input type="text" className="form-control mb-2" value={ingredients[x]} onChange={(e) => onIngredientChange(e, x)}/>
                                </div>
                                ))}
                                
                                <button type="button" className="btn btn-success" onClick={onAddIngredient}>Add Ingredient</button>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Steps</label>
                                {array2.map(y => (<textarea className="form-control mb-2" rows="3" value={steps[y]} onChange={(e) => onStepChange(e, y)} key={y}>
                                </textarea>))}
                                <button type="button" className="btn btn-info" onClick={onAddStep}>Add Step</button>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Upload Image</label>
                                <input ref={fileRef} onChange={onFileChange} type="file" className="form-control" id="image" />
                            </div>
                            {imageUrl && <img
                                src={imageUrl}
                                alt="Recipe"
                                className="img-fluid mb-3"
                            />}
                            <div className="form-check mb-3">
                                <input className="form-check-input" type="checkbox" id="isPublic" onChange={setShare}/>
                                <label className="form-check-label">Share this recipe publicly</label>
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Add Recipe</button>
                        </form>
                    </div>
                </div>
                <RecipePreview id="0"
                    title={title}
                    imageUrl={imageUrl}
                    category={category}
                    ingredients={Object.values(ingredients)}
                    steps={Object.values(steps)}
                    sharePublicly={sharePublicly}
                    fromAdd={true}></RecipePreview>        
            </div>
        </div>
    </>)
}

export default AddRecipe;
