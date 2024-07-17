import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { BsCheckCircleFill, BsListUl, BsFillPersonFill, BsDownload } from "react-icons/bs";
import { useUser } from "../UserContext";

const Recipe = () => {

    const { id } = useParams();
    const [recipe, setRecipe] = useState({
        id: 0,
        title: '',
        imageUrl: '',
        category: {
            name: ''
        },
        ingredients: '',
        steps: '',
        sharePublicly: false,
    });
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useUser();
    const [isRate, setIsRate] = useState(false);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    const getComments = async () => {
        const { data } = await axios.get(`/api/recipe/getcomments?id=${id}`)
        setComments(data);
    }

    useEffect(() => {
        const getRecipe = async () => {
            const { data } = await axios.get(`/api/recipe/getrecipe?id=${id}`)
            setRecipe(data);
        }

        getRecipe();
        getComments();
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

    const onAddClick = async () => {
        const rlComment = {
            commenter: `${user.firstName} ${user.lastName}`,
            description: comment,
            recipeId: recipe.id
        }
        await axios.post('/api/recipe/addcomment', rlComment);
        setComment('');
        setIsRate(false);
        getComments();
    }


    if (isLoading) {
        return (<>
            <div className='container' style={{ marginTop: 300 }}>
                <div className='d-flex w-100 justify-content-center align-self-center'>
                    <h1>Loading...</h1>
                </div>
            </div>
        </>)
    }

    return (<>
        {recipe && <div className="container" style={{ marginTop: 80 }}>
            <div className="container mt-5" style={{
                backgroundColor: "rgb(245, 245, 245)",
                padding: 10,
                borderRadius: 10,
                width: 500
            }}>
                <div className="col-md-4 mb-4" key={id}>
                    <div className="card shadow-sm h-200" style={{ borderRadius: 15, width: 480 }}>
                        <div className="card-body d-flex flex-column" style={{ overflow: "hidden" }}>
                            {!user && <span className="text-center" style={{ color: "rgb(170, 170, 170)" }}>Sign in to download this recipe</span>}
                            {user && <BsDownload onClick={onDownloadClick} className="h2" style={{ marginRight: 30, cursor: 'pointer', textAlign: 'right' }} />}
                            <h1 className="text-center" style={{ color: "rgb(35, 170, 200)", fontSize: 35, style: "underline" }}>{recipe.title}</h1>
                            <div className="d-flex justify-content-center mb-3">
                                {recipe.imageUrl && <img src={`/api/recipe/viewimage?imageUrl=${recipe.imageUrl}`} alt="Recipe Preview" className="img-fluid" style={{
                                    width: 300,
                                    height: 300,
                                    borderRadius: 10,
                                    objectFit: "cover"
                                }} />}
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
        </div>}
        {recipe.sharePublicly && <div className="col-md-4 mb-4 offset-3" style={{ marginTop: 20 }}>
            {!user && <span className="d-flex w-100 justify-content-center align-self-center offset-3" style={{ color: "rgb(170, 170, 170)", fontSize: 20 }}>Sign in to rate this recipe</span>}
            {user && !isRate && <button type="button" className="btn btn-info" style={{ color: "rgb(245, 245, 245)" }} onClick={() => setIsRate(true)}>Rate this Recipe</button>}
            {user && isRate && <>
                <textarea className="form-control mb-2" rows="3" value={comment} onChange={(e) => setComment(e.target.value)} style={{ width: 470 }}></textarea>
                <button type="button" className="btn btn-info" style={{ color: "rgb(245, 245, 245)" }} onClick={onAddClick}>Add Comment</button>
            </>}
            {comments.map(c => (
                <div className="container offset-2" >
                    <div className="container mt-5" style={{
                        backgroundColor: "rgb(245, 245, 245)",
                        padding: 10,
                        borderRadius: 10,
                        width: 500
                    }}>
                        <div key={c.id} className="col-md-10 mb-6">
                            <h3 style={{ color: "rgb(35, 170, 200)" }}>{c.commenter}</h3>
                            <h7 className="d-flex w-100 offset-3">{c.description}</h7>
                        </div>
                    </div>
                </div>
            ))}
        </div>}
        {!recipe && <div className='container col-md-8 mb-4' style={{ marginTop: 300 }}>
            <div>
                <h1 style={{ textAlign: 'center', fontSize: 30 }}>Sorry, this recipe is blocked due to its share-publicly status</h1>
                <div className='container col-md-4 mb-4'>
                <Link to='/'>
                        <button className="btn btn-info justify-content-center w-100" style={{ color: "rgb(245, 245, 245)" } }>Back to Home</button>
                    </Link>
                </div>
            </div>
        </div>}
    </>)
}

export default Recipe;
