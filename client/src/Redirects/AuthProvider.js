import { Navigate, useLocation, Outlet } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";

function AuthProvider({ web3 }) {
    let location = useLocation();
    if (!web3.web3) return <Navigate to="/login" state={{ from: location }} />;
    return <Outlet />;
}
const mapStateToProps = (state) => {
    return {
        web3: state.web3Reducer,
    };
};
export default connect(mapStateToProps)(AuthProvider);
