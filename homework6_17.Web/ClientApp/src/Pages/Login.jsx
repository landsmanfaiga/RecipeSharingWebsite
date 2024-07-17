import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../UserContext';

const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useUser();

    const [user, setUser1] = useState({
        email: '',
        password: ''
    })
    const { email, password } = user;
    const [isValidLogin, setIsValidLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const onChange = (e) => {
        const copy = { ...user };
        copy[e.target.name] = e.target.value;
        setUser1(copy);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const { data } = await axios.post('/api/user/login', user);
        setIsLoading(false);
        const isValid = Boolean(data);
        setIsValidLogin(isValid);
        if (isValid) {
            setUser(data);
            navigate('/');
        }
    }

    if (isLoading) {
        return <div className='container' style={{ marginTop: 300 }}>
            <div className='d-flex w-100 justify-content-center align-self-center'>
                <h1>Logging in...</h1>
            </div>
        </div>
    }

    return (
        <div className="container">
            <main role="main" className="pb-3">
                <div className="row">
                    <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow">
                        <h3 style={{textAlign: 'center'} } >Log in to your account</h3>
                        {!isValidLogin && <span className='text-danger'>Invalid username/password. Please try again.</span>}
                        <form onSubmit={onSubmit}>
                            <input type="text" name="email" placeholder="Email" className="form-control" value={email} onChange={onChange} />
                            <br />
                            <input type="password" name="password" placeholder="Password" className="form-control" value={password} onChange={onChange} />
                            <br /><button className="btn btn-info d-flex w-100 justify-content-center align-self-center" style={{ color: "rgb(245, 245, 245)" }}>Login</button>
                        </form>
                        <Link to="/signup" className="d-flex w-100 justify-content-center align-self-center" style={{ color: "rgb(35, 170, 200)"} }>Sign up for a new account</Link>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Login;

