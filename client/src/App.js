import { useEffect } from "react";
import { setWeb3 } from "./store/thunk/setWeb3";
import { connect } from "react-redux";
import eVotingArtifact from "./artifact/evoting.json";
import { SampleForm } from "./Components/Forms/SampleForm";
function App({ web3, eVotingContract, setWeb3 }) {
    useEffect(() => {
        setWeb3();
    }, [setWeb3]);
    return (
        <div className="App">
            <SampleForm />
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        web3: state.web3Reducer,
        eVotingContract: state.contractReducer,
    };
};
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
export default connect(mapStateToProps, mapDispatchToProps)(App);
