import {createContext, useState, useContext} from "react";
import {AuthService} from '../api/authService'
import { useRouter } from "next/router";
const authContext = createContext();

export default function useAuth() {
    return useContext(authContext)
}

export function AuthProvider(props) {

    const [user, setUser] = useState(null);
    const [error, setError] = useState('')

    const loginWithGoogle = async () => {
        const {error, user} = await AuthService.loginWithGoogle();
        setUser(user ?? null);
        setError(error ?? '');

    }
    const logout = async () => {
        const {error} = await AuthService.logout();
        setUser(null);
        setError(error ?? '');
        router.push("/login")
    }
    const value = {user,error,loginWithGoogle,logout,setUser,setError};
    return <authContext.Provider value={value} {...props}/>

}
