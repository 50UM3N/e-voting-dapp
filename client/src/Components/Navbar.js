import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";

const Navbar = ({ user }) => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        E Voting
                    </Link>

                    <div
                        className="collapse navbar-collapse justify-content-between"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <NavLink className="nav-link" to="/profile">
                                    Profile
                                </NavLink>
                            </li>
                            {user && user.role === "admin" && (
                                <>
                                    <li className="nav-item active">
                                        <NavLink
                                            className="nav-link"
                                            to="/voter-request"
                                        >
                                            Voter Request
                                        </NavLink>
                                    </li>
                                    <li className="nav-item active">
                                        <NavLink
                                            className="nav-link"
                                            to="/team"
                                        >
                                            Team
                                        </NavLink>
                                    </li>
                                </>
                            )}
                            <li className="nav-item active">
                                <NavLink className="nav-link" to="/result">
                                    Result
                                </NavLink>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="navbar-nav">
                                <Link className="nav-link" to="/vote">
                                    Vote
                                </Link>
                            </li>
                            {!user && (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">
                                        Login
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.userReducer,
    };
};

export default connect(mapStateToProps)(Navbar);
