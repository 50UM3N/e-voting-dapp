import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Navbar from "../Components/Navbar";
import Moment from "react-moment";
const Request = ({ contract }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        (async () => {
            let accounts = window.ethereum.request({
                method: "eth_accounts",
            });
            let voters = await contract.contract.methods
                .getUnverifiedVoter()
                .call({ from: accounts[5] })
                .catch((err) => {
                    setError(err);
                });
            setData(voters);
            setLoading(false);
        })();
        return () => {};
    }, [contract]);
    console.log(data);
    return (
        <>
            <Navbar />
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {data && (
                <div className="container my-5">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">New Voter Request</h5>
                            <hr />
                            <div className="table-responsive">
                                <table className="table table-bordered mb-0">
                                    <thead>
                                        <tr className="text-capitalize text-nowrap">
                                            <th scope="col">#</th>
                                            <th scope="col">Aadhar Id</th>
                                            <th scope="col">First Name</th>
                                            <th scope="col">Last Name</th>
                                            <th scope="col">Email Address</th>
                                            <th scope="col">Mobile Number</th>
                                            <th scope="col">DOB</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((item) => (
                                            <tr
                                                key={item.id}
                                                className="text-nowrap"
                                            >
                                                <th scope="row">{item.id}</th>
                                                <td>{item.uidai}</td>
                                                <td>{item.fname}</td>
                                                <td>{item.lname}</td>
                                                <td>{item.email}</td>
                                                <td>{item.mobile}</td>
                                                <td>
                                                    <Moment format="YYYY/MM/DD">
                                                        {
                                                            new Date(
                                                                Number(item.dob)
                                                            )
                                                        }
                                                    </Moment>
                                                </td>
                                                <td>
                                                    <button className="btn btn-sm btn-primary">
                                                        Approved
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        contract: state.contractReducer,
    };
};
export default connect(mapStateToProps)(Request);
