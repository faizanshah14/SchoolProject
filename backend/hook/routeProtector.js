import React from "react";
import { useRouter } from "next/router";
import useAuth from "./auth";

export function withPublic(Component){
    return function withPublic(props){
        const auth = useAuth()
        const router = useRouter()
        if(auth.user && auth.user.emailVerified){
            router.push("/landing")
            return <div>You are already logged in</div>//loagin
        }
        return <Component auth={auth} {...props} />
    }
}
export function withProtected(Component){
    return function withProtected(props){
        const auth = useAuth()
        const router = useRouter()
        if(!auth.user || !auth.user.emailVerified){
            router.push("/auth/login")
            return <div>You are not logged in</div>
        }
        return <Component auth={auth} {...props} />
    }
}
