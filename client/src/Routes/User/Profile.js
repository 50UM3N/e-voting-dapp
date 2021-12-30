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
                            <p>
                                {/* TODO: Later here display user details */}
                                You are register your account in our application
                            </p>
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
