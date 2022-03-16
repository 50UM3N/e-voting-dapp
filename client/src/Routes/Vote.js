import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Navbar from "../Components/Navbar";

const Vote = ({ votingContract, web3 }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        (async () => {
            let accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            try {
                let teams = await votingContract.contract.methods
                    .getTeams()
                    .call({ from: accounts[0] });
                setData(teams);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        })();
    }, [votingContract]);
    const giveVote = (index) => {
        console.log(index);
    };
    return (
        <>
            <Navbar />{" "}
            <div className="container my-5">
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {data &&
                    (data.length === 0 ? (
                        <p className="m-0">There is no team to vote</p>
                    ) : (
                        <>
                            <h5>Ballot</h5>
                            <hr />
                            <div className="row g-3">
                                {data.map((item, index) => (
                                    <div className="col-md-4" key={index}>
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="card-title">
                                                    {item.representative}
                                                </h5>
                                                <hr />
                                                <h6>{item.teamName}</h6>
                                                <hr />
                                                <p className="card-tex ">
                                                    {item.description}
                                                </p>
                                                <button
                                                    className="btn btn-primary btn-sm w-100"
                                                    onClick={() =>
                                                        giveVote(index)
                                                    }
                                                >
                                                    Vote
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ))}
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        votingContract: state.contractReducer,
        web3: state.web3Reducer,
    };
};

export default connect(mapStateToProps)(Vote);
