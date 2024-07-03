import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';

const Logout = () => {
    const navigate = useNavigate();
    const { setUser } = useUser();
    useEffect(() => {
        const doLogout = async () => {
            await axios.post('/api/User/logout');
            setUser(null);
            navigate('/');
        }
        doLogout();
    }, []);

    return (<></>);
}

export default Logout;

