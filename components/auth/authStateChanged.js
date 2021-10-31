import firebase from "firebase/app";
import 'firebase/auth'
import { useState, useEffect } from "react";
import useAuth from '../../backend/hook/auth'
import PageChange from "components/PageChange/PageChange";

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
    return <PageChange />;
  }
  return children
} 