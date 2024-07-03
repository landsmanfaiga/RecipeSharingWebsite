import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const { firstName, lastName, email, password } = user;
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post('/api/user/adduser', { user, password })
        navigate('/login');
    }

    const onTextChange = (e) => {
        const copy = { ...user };
        copy[e.target.name] = e.target.value;
        setUser(copy);
    }
    return (
        <div className="container">
            <main role="main" className="pb-3">
                <div className="row">
                    <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow">
                        <h3>Sign up for a new account</h3>
                        <form onSubmit={onSubmit}>
                            <input type="text" name="firstName" placeholder="First Name" className="form-control" value={firstName} onChange={onTextChange} />
                            <br />
                            <input type="text" name="lastName" placeholder="Last Name" className="form-control" value={lastName} onChange={onTextChange} />
                            <br />
                            <input type="text" name="email" placeholder="Email" className="form-control" value={email} onChange={onTextChange} />
                            <br />
                            <input type="password" name="password" placeholder="Password" className="form-control" value={password} onChange={onTextChange} />
                            <br />
                            <button className="btn btn-primary">Signup</button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Signup;

