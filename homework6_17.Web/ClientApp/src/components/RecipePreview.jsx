import { BsCheckCircleFill, BsListUl, BsFillPersonFill } from "react-icons/bs";
import { Link } from 'react-router-dom';

const RecipePreview = ({ id, title, imageUrl, category, ingredients, steps, sharePublicly, fromAdd, home }) => {

    if (fromAdd) {
        return (<>
            <div className="col-md-4 mb-4 offset-1" key={id}>
                <div className="card shadow-sm h-200" style={{
                    position: "sticky",
                    top: 20,
                    maxWidth: 400,
                    width: "200%",
                    height: "fit-content",
                    borderRadius: 15,
                    backgroundColor: "rgb(248, 249, 250)"
                }}>
                    <div className="card-body d-flex flex-column" style={{ padding: 20 }}>
                         <h3 className="text-center">Recipe Preview</h3>
                        <div className="card shadow-sm h-100" style={{ borderRadius: 15 }}>
                            <div className="card-body d-flex flex-column" style={{ overflow: "hidden" }}>
                                <h3 className="text-center" style={{ fontFamily: "Arial, sans-serif", color: "rgb(52, 58, 64)" }}> {title}</h3>
                        <div className="d-flex justify-content-center mb-3">
                           <img src={imageUrl} alt="Recipe Preview" className="img-fluid"   style={{
                                    width: 150,
                                    height: 150,
                                    borderRadius: 10,
                                    objectFit: "cover"
                                }} />
                        </div>

                        <div style={{ flex: "1 1 auto", overflowY: "auto" }}>
                            <p>
                                <strong>Category:</strong>
                                {category}</p>
                            <p>
                                <strong>Ingredients:</strong>
                            </p>
                            <div className="mb-2">
                                        {ingredients.map(i => (
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
                                        {steps.map(s => (
                                            <div className="d-flex align-items-start mb-1" key={s}>
                                                <BsListUl style={{ color: "#17A2B8", marginRight: 10, marginTop: 5 }} />
                                                <span>{s}</span>
                                            </div>
                                        ))}

                            </div>
                            <p>
                                <strong>Public:</strong>
                                <BsFillPersonFill style={{ color: sharePublicly ? "#28A745" : "#DC3545" }} />
                            </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>)
    }
    return (<>
        <div className="col-md-4 mb-4" key={id}>
            <div className="card shadow-sm h-200" style={{ borderRadius: 15 }}>
                <div className="card-body d-flex flex-column" style={{ maxHeight: 500, overflow: "hidden" }}>
                        <Link to={`/recipe/${id}`} style={{ color: "rgb(35, 170, 200)", fontSize: 23} }
                    className="text-center">{title}
                    </Link>   
                    {home && <span style={{ textAlign: 'center' }}>Shared by: {category.user.firstName} {category.user.lastName}</span>}
                    <div className="d-flex justify-content-center mb-3">
                        <img src={`/api/recipe/viewimage?imageUrl=${imageUrl}`} alt="Recipe Preview" className="img-fluid" style={{
                                width: 150,
                                height: 150,
                                borderRadius: 10,
                                objectFit: "cover"
                            }} />
                            </div>

                            <div style={{ flex: "1 1 auto", overflowY: "auto" }}>
                        <p>
                            <strong>Category:</strong> {category.name}
                                                       </p>
                                <p>
                                    <strong>Ingredients:</strong>
                                </p>
                        <div className="mb-2">
                            {JSON.parse(ingredients).map(i => (
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
                            {JSON.parse(steps).map(s => (
                                <div className="d-flex align-items-start mb-1" key={s}>
                                    <BsListUl style={{ color: "#17A2B8", marginRight: 10, marginTop: 5 }} />
                                    <span>{s}</span>
                                </div>
                            ))}

                        </div>
                        <p>
                            <strong>Public:</strong>
                            <BsFillPersonFill style={{ color: sharePublicly ? "#28A745" : "#DC3545" }} />
                        </p>
            </div>
                </div> 
            </div>
        </div> 
    </>)
}

export default RecipePreview;
