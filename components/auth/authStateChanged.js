import firebase from "firebase/app";
import 'firebase/auth'
import { useState, useEffect } from "react";
import useAuth from '../../backend/hook/auth'

export default function AuthStateChanged({children}) {
  
    const {setUser} = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      firebase.auth().onAuthStateChanged((user)=>{
        setUser(user);
        setLoading(false);
      });
  }, []);

  if(loading){
    return <div>Loading...</div>;
  }
  return children
} 