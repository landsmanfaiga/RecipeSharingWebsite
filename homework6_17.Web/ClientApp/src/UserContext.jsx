import { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';

const UserContext = createContext();

const UserContextComponent = ({ children }) => {
    const [user, setUser] = useState(null);


    useEffect(() => {
        const loadUser = async () => {
            const { data } = await axios.get('/api/user/getcurrentuser');
            setUser(data);
        }
        loadUser();
    }, []);


    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )

}


const useUser = () => useContext(UserContext);


export { UserContextComponent, useUser };
