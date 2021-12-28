import { useEffect } from "react";
import { setWeb3 } from "./store/thunk/setWeb3";
import { connect } from "react-redux";
import eVotingArtifact from "./artifact/evoting.json";
import { SampleForm } from "./Components/Forms/SampleForm";
import { Routes, Route } from "react-router-dom";
import Home from "./Routes/Home.js";
import Login from "./Routes/Login.js";
import Navbar from "./Components/Navbar.js";

//<></> is called fragment

function App({ setWeb3 }) {
    useEffect(() => {
        setWeb3();
    }, [setWeb3]);
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </>
    );
}

// const mapStateToProps = (state) => {
//     return {
//         web3: state.web3Reducer,
//         eVotingContract: state.contractReducer,
//     };
// };

const mapDispatchToProps = (dispatch) => {
    return {
        setWeb3: () =>
            dispatch(
                setWeb3(
                    eVotingArtifact.abi,
                    eVotingArtifact.networks[5777].address
                )
            ),
    };
};
export default connect(null, mapDispatchToProps)(App);
