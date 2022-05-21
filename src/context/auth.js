import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import decode from 'jwt-decode';
import PropTypes from 'prop-types';
import api from "../service/api";


const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [token, setToken] = useState(null);
    const [name, setName] = useState(null);
    const [isAuthenticate, setIsAuthenticate] = useState(false);
    const [expiredToken, setExpiredToken] = useState(false);
    const [payload, setPayload] = useState({});
    const [refreshToken, setRefreshToken] = useState('');

    useEffect(() => {
      const storagedToken = localStorage.getItem("@App:token");
      const storagedRefreshToken = localStorage.getItem("@App:refreshToken");
      const storagedName = localStorage.getItem("@App:name");
      if(storagedToken) {
        setIsAuthenticate(true);
        setToken(storagedToken);
        setName(storagedName);
        setRefreshToken(storagedRefreshToken);
        const { exp, email, id } = decode(storagedToken);
        if (exp <= Math.floor(new Date() / 1000)) {
          setExpiredToken(true);
          setPayload({email, id, storagedName});
        }

        api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
      }
    }, []);

    async function SignupHandler(data) {
      try {
        const response = await api.post('/user/signup', data);
        api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
        localStorage.setItem('@App:token', response.data.token);
        localStorage.setItem("@App:refreshToken", response.data.refreshToken);
        localStorage.setItem('@App:name', response.data.name);
        setToken(response.data.token);
        setRefreshToken(response.data.refreshToken);
        setName(response.data.name);
        setIsAuthenticate(true);
      } catch(error) {
        if(error.response.data.error) toast.error(error.response.data.error);
        return error
      }
    }
    
    async function LoginHandler(data) {
      try {
        const response = await api.post('/user/login', data);
        api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
        localStorage.setItem('@App:token', response.data.token);
        localStorage.setItem("@App:refreshToken", response.data.refreshToken);
        localStorage.setItem('@App:name', response.data.name);
        setToken(response.data.token);
        setRefreshToken(response.data.refreshToken);
        setName(response.data.name);
        setIsAuthenticate(true);
      } catch(error) {
        if(error.response) {
          if(error.response.status === 401) {
			      toast.error('Invalid credentials');
          } else {
            toast.error(error.response.data.message);
          }
        }
        
        return error
      }
    }

    function Logout() {
      localStorage.removeItem('@App:token');
      localStorage.removeItem('@App:name');
      localStorage.removeItem('@App:refreshToken');

      setToken(null);
      setIsAuthenticate(false)
      setRefreshToken(null);
      setName('');
    }

    async function handleRefreshToken() {
      const response = await api.post('/user/refresh',{
        payload,
        refreshToken
      });

      api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
      localStorage.setItem('@App:token', response.data.token);
      localStorage.setItem('@App:name', response.data.name);
    }

    if (expiredToken) {
      handleRefreshToken();
      setExpiredToken(false);
    }

    const memory = useMemo(() => ({ isAuthenticate, name, token, SignupHandler, LoginHandler, Logout}), [isAuthenticate]);

    return (
      <AuthContext.Provider value={memory}>
        {children}
      </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
	children: PropTypes.node.isRequired
};

export default AuthProvider

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

