import { withProtected } from "backend/hook/routeProtector";
import React from "react";

export function Logout({auth}) {

    const {logout} = auth;
    return ()
}
export default withProtected(Logout);