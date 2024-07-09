import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BsCheckCircleFill, BsListUl, BsFillPersonFill, BsDownload } from "react-icons/bs";
import { useUser } from "../UserContext";

const Recipe = () => {

    const { id } = useParams();
    const [recipe, setRecipe] = useState({
        title: '',
        imageUrl: '',
        category: {
            name: ''
        },
        ingredients: '',
        steps: '',
        sharePublicly: false
    });
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useUser();

    useEffect(() => {
        const getRecipe = async() => {
            const { data } = await axios.get(`/api/recipe/getrecipe?id=${id}`)
            setRecipe(data);
        }
        getRecipe();
        setIsLoading(false);
    }, [])

    const onDownloadClick = () => {
        if (user) {
            let queryString = `title=${recipe.title}&ingredients=`;
            JSON.parse(recipe.ingredients).map(i => queryString += `${i},`);
            queryString = queryString.substring(0, queryString.length - 1);
            queryString += '&steps=';
            JSON.parse(recipe.steps).map(s => queryString += `${s},`);
            queryString = queryString.substring(0, queryString.length - 1);
            queryString += `&image=${recipe.imageUrl}`;
            window.location.href = `/api/recipe/generatepdf?${queryString}`;
        }
        
    }


    if (isLoading || !recipe.title) {
        return (<>
            <div className='container' style={{ marginTop: 300 }}>
                <div className='d-flex w-100 justify-content-center align-self-center'>
                    <h1>Loading...</h1>
                </div>
            </div>
        </>)
    }

    return (<>
        <div className="container" style={{ marginTop: 80 }}>
            <div className="container mt-5" style={{
                backgroundColor: "rgb(245, 245, 245)",
                padding: 10,
                borderRadius: 10,
                width: 500
            }}>
        <div className="col-md-4 mb-4" key={id}>
            <div className="card shadow-sm h-200" style={{ borderRadius: 15, width: 480 }}>
                        <div className="card-body d-flex flex-column" style={{ overflow: "hidden" }}>
                            {!user && <span className="text-center" style={{ color: "rgb(170, 170, 170)" } }>Sign in to download this recipe</span> }
                            {user && <BsDownload onClick={onDownloadClick} className="h2" style={{ marginRight: 30, cursor: 'pointer', textAlign: 'right' }} />}
                            <h1 className="text-center" style={{ color: "rgb(35, 170, 200)", fontSize: 35, style: "underline" }}>{recipe.title}</h1>              
                    <div className="d-flex justify-content-center mb-3">
                        <img src={`/api/recipe/viewimage?imageUrl=${recipe.imageUrl}`} alt="Recipe Preview" className="img-fluid" style={{
                            width: 300,
                            height: 300,
                            borderRadius: 10,
                            objectFit: "cover"
                        }} />
                    </div>

                    <div style={{ flex: "1 1 auto", overflowY: "auto" }}>
                        <p>
                            <strong>Category:</strong>{recipe.category.name}
                        </p>
                        <p>
                            <strong>Ingredients:</strong>
                        </p>
                        <div className="mb-2">
                            {recipe.ingredients && JSON.parse(recipe.ingredients).map(i => (
                                <div className="d-flex align-items-center mb-1" key={i}>
                                    <BsCheckCircleFill style={{ color: "#28A745", marginRight: 10 }} />
                                    <span>{i}</span>
                                </div>
                            ))}

                        </div>
                        <p>
                            <strong>Steps:</strong>
                        </p>
                        <div className="mb-2">
                            {recipe.steps && JSON.parse(recipe.steps).map(s => (
                                <div className="d-flex align-items-start mb-1" key={s}>
                                    <BsListUl style={{ color: "#17A2B8", marginRight: 10, marginTop: 5 }} />
                                    <span>{s}</span>
                                </div>
                            ))}

                        </div>
                        <p>
                            <strong>Public:</strong>
                            <BsFillPersonFill style={{ color: recipe.sharePublicly ? "#28A745" : "#DC3545" }} />
                        </p>
                    </div>
                </div>
            </div>
            </div>
            </div>
        </div>
    </>)
}

export default Recipe;
