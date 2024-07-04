import { BsCheckCircleFill, BsListUl, BsFillPersonFill } from "react-icons/bs";

const RecipePreview = ({ id, title, imageUrl, category, ingredients, steps, sharePublicly, fromAdd }) => {

    return (<>
        <div className="col-md-4 mb-4" key={id}>
            <div className="card shadow-sm h-200">
                <div className="card-body d-flex flex-column">
                    {fromAdd && <h3 className="text-center">Recipe Preview</h3>}
                    <div className="card shadow-sm h-100">
                        <div className="card-body d-flex flex-column">
                    <h3 className="text-center">{title}</h3>
                    <div className="d-flex justify-content-center mb-3">
                                {fromAdd && <img src={imageUrl} alt="Recipe Preview" className="img-fluid" />}
                                {!fromAdd && <img src={`/api/recipe/viewimage?imageUrl=${imageUrl}`} alt="Recipe Preview" className="img-fluid" />}
                            </div>

                            <div style={{ flex: "1 1 auto", overflowY: "auto" }}>
                        <p>
                            <strong>Category:</strong>{!fromAdd && category.name}
                                                       {fromAdd && category}</p>
                                <p>
                                    <strong>Ingredients:</strong>
                                </p>
                        <div className="mb-2">
                            {!fromAdd && JSON.parse(ingredients).map(i => (
                                <div className="d-flex align-items-center mb-1" key={i}>
                                    <BsCheckCircleFill style={{ color: "#28A745", marginRight: 10 }} />
                                    <span>{i}</span>
                                </div>
                            ))}
                            {fromAdd && ingredients.map(i => (
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
                            {!fromAdd && JSON.parse(steps).map(s => (
                                <div className="d-flex align-items-start mb-1" key={s}>
                                    <BsListUl style={{ color: "#17A2B8", marginRight: 10, marginTop: 5 }} />
                                    <span>{s}</span>
                                </div>
                            ))}
                            {fromAdd && steps.map(s => (
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

export default RecipePreview;
