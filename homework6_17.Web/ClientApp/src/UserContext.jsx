import { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';

const UserContext = createContext();

const UserContextComponent = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const loadUser = async () => {
            setIsLoading(true);
            const { data } = await axios.get('/api/user/getcurrentuser');
            setUser(data);
            setIsLoading(false);
        }
        loadUser();
    }, []);

    if (isLoading) {
        return <h1>Loading....</h1>
    }

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )

}


const useUser = () => useContext(UserContext);


export { UserContextComponent, useUser };
