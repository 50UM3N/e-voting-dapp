import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Navbar from "../Components/Navbar";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
const Result = ({ voteContract, web3 }) => {
    const [data, setData] = useState(null);
    const [winner, setWinner] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        (async () => {
            let accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            try {
                let teams = await voteContract.contract.methods
                    .getTeams()
                    .call({ form: accounts[0] });
                let winner = await voteContract.contract.methods
                    .getWinner()
                    .call({ form: accounts[0] });
                setData(teams);
                setWinner(winner);
                setLoading(false);
            } catch (err) {
                setError(err.name);
                setLoading(false);
            }
        })();
    }, [voteContract]);
    console.log(winner);
    return (
        <>
            <Navbar />
            <div className="container my-5">
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {winner && (
                    <>
                        <div className="card mb-3">
                            <div className="card-body">
                                <h3>Winner 🥳</h3>
                                <hr />
                                <h5>{winner.representative}</h5>
                                <hr />
                                <h6>{winner.teamName}</h6>
                                <hr />
                                <p>{winner.description}</p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <h5>Result details</h5>
                                <hr />
                                <TeamCard data={data} />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

const TeamCard = ({ data }) => {
    return (
        <div style={{ width: "100%", height: 400 }}>
            <ResponsiveContainer>
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="representative" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="voteCount" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        voteContract: state.contractReducer,
        web3: state.web3Reducer,
    };
};
export default connect(mapStateToProps)(Result);
