import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Navbar from "../Components/Navbar";
import voting from ".././Assets/voting.png";

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
                console.log(votingContract);
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

        // return () => {};
    }, [votingContract]);
    console.log(data);
    return (
        <>
            <Navbar />
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {data && data.length === 0 && (
                <p className="m-0">There is no team to vote</p>
            )}
            <div className="container d-flex flex-wrap justify-content-start">
                {data &&
                    data.length !== 0 &&
                    data.map((item, index) => (
                        <div
                            key={index}
                            className="card mb-3 m-5"
                            style={{ width: "18rem" }}
                        >
                            <img
                                src={voting}
                                className="card-img-top"
                                alt="..."
                            />
                            <div className="card-body">
                                <h3 className="card-title text-center">
                                    {item.representative}
                                </h3>
                                <h5 className="text-center">{item.teamName}</h5>
                                <p className="card-tex text-center">
                                    {item.description}
                                </p>
                                <a
                                    href="/"
                                    className="btn btn-primary d-grid gap-2"
                                    role="button"
                                >
                                    Vote
                                </a>
                            </div>
                        </div>
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
