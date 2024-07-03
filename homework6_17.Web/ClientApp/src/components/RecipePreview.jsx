

const RecipePreview = ({ id, title, imageUrl, category, ingredients, steps, sharePublicly, fromAdd }) => {

    

    return (<>
        <div className="col-md-4 mb-4" key={id}>
            <div className="card shadow-sm h-100">
                <div className="card-body d-flex flex-column">
                    {fromAdd && <h3 class="text-center">Recipe Preview</h3>}
                    <h3 className="text-center">{title}</h3>
                    <div className="d-flex justify-content-center mb-3">
                        <img src={imageUrl} alt="Recipe Preview" className="img-fluid" />
                    </div>
                    <div>
                        <p>
                            <strong>Category:</strong>{!fromAdd && category.name}
                                                       {fromAdd && category}</p>
                        <p><strong>Ingredients:</strong></p>
                        <div className="mb-2">
                            {!fromAdd && JSON.parse(ingredients).map(i => (
                                <div className="d-flex align-items-center mb-1" key={i}>
                                    <span>{i}</span>
                                </div>
                            ))}
                            {fromAdd && ingredients.map(i => (
                                <div className="d-flex align-items-center mb-1" key={i}>
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
                                    <span>{s}</span>
                                </div>
                            ))}
                            {fromAdd && steps.map(s => (
                                <div className="d-flex align-items-start mb-1" key={s}>
                                    <span>{s}</span>
                                </div>
                            ))}

                        </div>
                        <p>
                            <strong>Public:</strong>
                            {sharePublicly && "yes"}
                            {!sharePublicly && "no"}
                        </p>
                    </div>
                </div>
            </div>
        </div>                   
    </>)
}

export default RecipePreview;
