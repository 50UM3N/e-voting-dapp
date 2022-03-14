import { useEffect, useState } from "react";
import { connect } from "react-redux";
import TeamForm from "../Components/Forms/TeamForm";
import Navbar from "../Components/Navbar";
import { Grid } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
const Team = ({ voterContract, web3 }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        (async () => {
            let accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            try {
                let teams = await voterContract.contract.methods
                    .getTeams()
                    .call({ form: accounts[0] });
                setData(teams);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        })();

        return () => {};
    }, [voterContract]);
    return (
        <>
            <Navbar />
            <div className="container my-4">
                <div className="card mb-3">
                    <div className="card-body">
                        <TeamForm
                            onSuccess={(newData) =>
                                setData((state) => [...state, newData])
                            }
                        />
                    </div>
                </div>

                <div className="card mb-3">
                    <div className="card-body">
                        {loading && <p>Loading...</p>}
                        {error && <p>{error}</p>}
                        {data && data.length === 0 && (
                            <p className="m-0">There is no teams added yet!!</p>
                        )}
                        {data && data.length !== 0 && (
                            <>
                                <Grid
                                    data={data}
                                    columns={[
                                        "Representative",
                                        "Description",
                                        "Team Name",
                                    ]}
                                    search={true}
                                    pagination={{
                                        enabled: true,
                                        limit: 5,
                                    }}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        voterContract: state.contractReducer,
        web3: state.web3Reducer,
    };
};

export default connect(mapStateToProps)(Team);
