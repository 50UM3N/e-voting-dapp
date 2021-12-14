import { useEffect } from "react";
import { web3Success, web3Loading, web3Error } from "./store/actions";
import { connect } from "react-redux";
function App({ web3, loading, success, error }) {
    console.log(web3);
    useEffect(() => {
        loading();
        fetch("https://jsonplaceholder.typicasdasdode.com/todasdos/1")
            .then((response) => response.json())
            .then((json) => success(json))
            .catch((e) => error(e.message));
    }, []);
    return <div className="App"></div>;
}
const mapStateToProps = (state) => {
    return {
        web3: state.web3Reducer,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        loading: () => {
            dispatch(web3Loading());
        },
        success: (web3) => {
            dispatch(web3Success(web3));
        },
        error: (err) => {
            dispatch(web3Error(err));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
