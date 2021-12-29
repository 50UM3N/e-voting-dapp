import { Navigate, useLocation, Outlet } from "react-router-dom";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
    web3Loading,
    web3Success,
    web3Error,
    contractSuccess,
} from "../store/actions";
import eVotingArtifact from "../artifact/evoting.json";
import Web3 from "web3";

function AuthProvider({
    web3,
    contractSuccess,
    web3Success,
    web3Error,
    web3Loading,
}) {
    let location = useLocation();
    useEffect(() => {
        (async function () {
            web3Loading();
            const { abi, address } = eVotingArtifact;
            let web3 = null;
            if (window.ethereum) {
                if (!window.ethereum.selectedAddress) {
                    web3Success(null);
                    return;
                }
                try {
                    await window.ethereum.request({
                        method: "eth_requestAccounts",
                    });
                    web3 = new Web3(window.ethereum);
                } catch (e) {
                    web3Error(e.message);
                    return;
                }
            } else if (window.web3) {
                web3 = new Web3(window.web3.currentProvider);
            } else web3 = new Web3("http://127.0.0.1:9545/");
            let contract = new web3.eth.Contract(abi, address);
            contractSuccess(contract);
            web3Success(web3);
        })();
    }, [web3]);
    return (
        <>
            {web3.loading && <p>Loading...</p>}
            {web3.error && <p>Error...</p>}
            {web3.web3 ? (
                <Outlet />
            ) : (
                <Navigate to="/login" state={{ from: location }} />
            )}
        </>
    );
}
const mapStateToProps = (state) => {
    return {
        web3: state.web3Reducer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        web3Loading: () => {
            dispatch(web3Loading());
        },
        web3Error: (e) => {
            dispatch(web3Error(e));
        },
        web3Success: (web3) => {
            dispatch(web3Success(web3));
        },
        contractSuccess: (contract) => {
            dispatch(contractSuccess(contract));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AuthProvider);
