import React from "react";
import { connect } from "react-redux";
import { setWeb3 } from "../../store/thunk/setWeb3";
import metamasklogo from "../../Assets/MetaMask.png";
import eVotingArtifact from "../../artifact/evoting.json";
function Login({ setWeb3 }) {
    return (
        <div className="container login-container py-5">
            <div className="card-wrapper">
                <h4 className="text-center m-5">
                    Connect your Ethereum wallet to <b>Balance Manager</b>
                </h4>
                <div className="metamask-wrapper m-5">
                    <div className="left-image-wrapper">
                        <img src={metamasklogo} alt="meta mask" />
                    </div>
                    <div className="right-buttons-wrapper">
                        <button className="btn btn-mm " onClick={setWeb3}>
                            Connect to MetaMask
                        </button>
                        <p className="text-muted">Chrome, FireFox, Brave</p>
                    </div>
                </div>
                <p className="text-muted m-5">
                    Confused by these options? <a href="#">Learn more</a>
                </p>
            </div>
        </div>
    );
}

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
export default connect(null, mapDispatchToProps)(Login);
