import React from "react";
export const Register = () => {
    return (
        <>
            <div className="register-wrapper">
                <div className="row g-0">
                    <div className="col-md-4 left-wrapper">
                        <ul className="link-container">
                            <li>About</li>
                            <li>Privacy</li>
                            <li>Terms & Use</li>
                            <li>FAQ</li>
                        </ul>
                    </div>
                    <div className="col-md-8 p-3 right-wrapper">
                        <form className="register-form">
                            <div className="mb-3">
                                <label
                                    for="exampleInputEmail1"
                                    className="form-label"
                                >
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                />
                                <div id="emailHelp" className="form-text">
                                    We'll never share your email with anyone
                                    else.
                                </div>
                            </div>
                            <div className="mb-3">
                                <label
                                    for="exampleInputPassword1"
                                    className="form-label"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                />
                            </div>
                            <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="exampleCheck1"
                                />
                                <label
                                    className="form-check-label"
                                    for="exampleCheck1"
                                >
                                    Check me out
                                </label>
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
