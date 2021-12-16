import { useEffect } from "react";
import { setWeb3 } from "./store/thunk/setWeb3";
import { connect } from "react-redux";
function App({ web3, eVotingContract, setWeb3 }) {
    console.log(web3);
    useEffect(() => {
        setWeb3();
    }, [setWeb3]);
    return <div className="App"></div>;
}
const mapStateToProps = (state) => {
    return {
        web3: state.web3Reducer,
        eVotingContract: state.contractReducer,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setWeb3: () => dispatch(setWeb3(154)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
