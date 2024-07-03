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

    const onChange = (e) => {
        const copy = { ...user };
        copy[e.target.name] = e.target.value;
        setUser1(copy);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const { data } = await axios.post('/api/user/login', user);
        const isValid = Boolean(data);
        setIsValidLogin(isValid);
        if (isValid) {
            setUser(data);
            navigate('/');
        }
    }

    return (
        <div className="container">
            <main role="main" className="pb-3">
                <div className="row">
                    <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow">
                        <h3>Log in to your account</h3>
                        {!isValidLogin && <span className='text-danger'>Invalid username/password. Please try again.</span>}
                        <form onSubmit={onSubmit}>
                            <input type="text" name="email" placeholder="Email" className="form-control" value={email} onChange={onChange} />
                            <br />
                            <input type="password" name="password" placeholder="Password" className="form-control" value={password} onChange={onChange} />
                            <br /><button className="btn btn-primary">Login</button>
                        </form>
                        <Link to="/signup">Sign up for a new account</Link>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Login;

