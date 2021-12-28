import { Routes, Route } from "react-router-dom";
import Home from "./Routes/Home.js";
import Login from "./Routes/Auth/Login.js";

function App() {
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

export default App;
