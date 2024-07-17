import { useEffect, useState } from 'react';
import axios from 'axios';

const Categories = () => {

    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');

    useEffect(() => {

        getCategories();
    },[])

    const getCategories = async () => {
        const { data } = await axios.get('/api/category/getcategories');
        setCategories(data);

    }

    const onSubmitClick = async (e) => {
        e.preventDefault();
        if (category !== '') {
            await axios.post('/api/category/addcategory', { name: category });
            setCategory('');
            getCategories();
        }
  
    }

    return (<>
        <div className="container">
            <div className="container mt-5">
                <h2 className="mb-4 text-center">Categories</h2>
                <form className="mb-4" onSubmit={onSubmitClick}>
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Add new category" value={category} onChange={(e) => setCategory(e.target.value)} />
                        <button type="submit" className="btn btn-info" style={{ color: "rgb(245, 245, 245)" }}>Add</button>
                    </div>
                </form>
                <ul className="list-group shadow-sm">
                    {categories.map(c => (
                        <li className="list-group-item d-flex justify-content-between align-items-center" key={c.id}>{c.name}<span className="badge bg-primary rounded-pill"></span></li>
                    ))}              
                </ul>
            </div>
        </div>
    </>)
}

export default Categories;
