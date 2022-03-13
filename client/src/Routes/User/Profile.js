import React from "react";
import { connect } from "react-redux";
import Navbar from "../../Components/Navbar";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
function Profile({ user }) {
    return (
        <>
            <Navbar />
            <div className="container my-5">
                {/* TODO: Later here display metamask details */}
                <Card className="mb-3">
                    <Card.Body>
                        <p className="text-center text-muted">
                            You are login with metamask
                        </p>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        {user ? (
                            <>
                                <div>
                                    <span
                                        className="material-icons-two-tone"
                                        style={{ fontSize: "4rem" }}
                                    >
                                        account_circle
                                    </span>
                                </div>
                                <h5 className="card-title">
                                    {user.fname} {user.lname}{" "}
                                    {user.role === "admin" && "(Admin)"}
                                    {user.role !== "admin" && (
                                        <>
                                            {" "}
                                            {user.verified
                                                ? "(Verified)"
                                                : "(Not Verified)"}
                                        </>
                                    )}
                                </h5>
                                <hr />
                                <p className=" mb-0 text-muted">Email</p>
                                <p>{user.email}</p>
                                <p className=" mb-0 text-muted">
                                    Mobile Number
                                </p>
                                <p>{user.mobile}</p>
                                <p className=" mb-0 text-muted">Aadhar ID</p>
                                <p>{user.uidai}</p>
                            </>
                        ) : (
                            <p>
                                Please register first then you will use out
                                dapp. <Link to="/register">Register</Link>
                            </p>
                        )}
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}

const mapsStateToProps = (state) => {
    return {
        user: state.userReducer,
    };
};

export default connect(mapsStateToProps)(Profile);
