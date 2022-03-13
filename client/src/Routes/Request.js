import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Navbar from "../Components/Navbar";
import Moment from "react-moment";
import { ToastContainer, toast } from "react-toastify";

const Request = ({ contract, web3 }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        (async () => {
            let accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            let voters = await contract.contract.methods
                .getUnverifiedVoter()
                .call({ from: accounts[0] })
                .catch((err) => {
                    setError(err);
                });
            setData(voters);
            setLoading(false);
        })();
    }, [contract]);

    const approvedVoter = async (address) => {
        let toastOption = {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        };
        if (!web3.web3.utils.isAddress(address)) {
            console.log("invalid address");
            return;
        }
        let accounts = await window.ethereum.request({
            method: "eth_accounts",
        });
        console.log({ from: accounts[0] });
        contract.contract.methods
            .verifyVoter(address)
            .send({ from: accounts[0] })
            .then((res) => {
                // !ERROR resolve _message error
                let message = res.events.VerifyVoter.returnValue._message;
                console.log(message);
                setData((state) => state.filter((item) => item.id !== address));
                // toast.success("Success ", toastOption);
            })
            .catch((err) => {
                console.log(err.message);
                // toast.error("Error ", toastOption);
            });
    };
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
                                        {data.map((item, index) => (
                                            <tr
                                                key={item.id}
                                                className="text-nowrap"
                                            >
                                                <th scope="row">{index + 1}</th>
                                                <td>{item.uidai}</td>
                                                <td>{item.fname}</td>
                                                <td>{item.lname}</td>
                                                <td>{item.email}</td>
                                                <td>{item.mobile}</td>
                                                <td>
                                                    <Moment format="DD/MM/YYYY">
                                                        {
                                                            new Date(
                                                                Number(item.dob)
                                                            )
                                                        }
                                                    </Moment>
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-sm btn-primary"
                                                        onClick={() =>
                                                            approvedVoter(
                                                                item.id
                                                            )
                                                        }
                                                    >
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
                    {/* <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
         
                    <ToastContainer /> */}
                </div>
            )}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        contract: state.contractReducer,
        web3: state.web3Reducer,
    };
};
export default connect(mapStateToProps)(Request);
