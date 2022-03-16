import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Navbar from "../Components/Navbar";
import Moment from "react-moment";
import { Grid, _ } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import { h } from "gridjs";
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
            autoClose: 3000,
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
                console.log(res);
                // !ERROR resolve _message error
                // ERROR resolved returnValue -> returnValues
                let message = res.events.VerifyVoter.returnValues._message;
                console.log(message);
                setData((state) => state.filter((item) => item.id !== address));
                toast.success(message, toastOption);
            })
            .catch((err) => {
                console.log(err.message);
                toast.error("Error ", toastOption);
            });
    };
    return (
        <>
            <Navbar />

            <div className="container my-5">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">New Voter Request</h5>
                        <hr />
                        {loading && <p>Loading...</p>}
                        {error && <p>{error}</p>}
                        {data && data.length !== 0 ? (
                            <Grid
                                data={data}
                                columns={[
                                    {
                                        data: (row) => row.uidai,
                                        name: "Aadhar Id",
                                    },
                                    {
                                        data: (row) => row.fname,
                                        name: "First Name",
                                    },
                                    {
                                        data: (row) => row.lname,
                                        name: "Last Name",
                                    },
                                    {
                                        data: (row) => row.email,
                                        name: "Email Address",
                                    },
                                    {
                                        data: (row) => row.mobile,
                                        name: "Mobile Number",
                                    },
                                    {
                                        data: (row) => row.dob,
                                        formatter: (data) =>
                                            _(
                                                <Moment format="DD/MM/YYYY">
                                                    {new Date(Number(data))}
                                                </Moment>
                                            ),
                                        name: "DOB",
                                    },
                                    {
                                        data: (row) => row.id,
                                        name: "Actions",
                                        formatter: (data) => {
                                            return h(
                                                "button",
                                                {
                                                    className:
                                                        "border rounded-md text-white btn btn-primary",
                                                    onClick: () =>
                                                        approvedVoter(data),
                                                },
                                                "Approve"
                                            );
                                        },
                                    },
                                ]}
                                search={false}
                                pagination={{
                                    enabled: true,
                                    limit: 5,
                                }}
                            />
                        ) : (
                            <p className="text-center">
                                There is no unverified voter
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <ToastContainer />
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
