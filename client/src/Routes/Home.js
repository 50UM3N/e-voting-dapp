import { Link } from "react-router-dom";
const Home = () => {
    return (
        <>
            <div className="container py-4">
                <header className="pb-3 mb-4 border-bottom">
                    <Link
                        to="/profile"
                        className="text-dark text-decoration-none fs-3"
                    >
                        Home
                    </Link>
                </header>

                <div className="p-5 mb-4 bg-light rounded-3">
                    <div className="container-fluid py-5">
                        <h1 className="display-5 fw-bold">E-Voting</h1>
                        <p className="col-md-8 fs-4 py-3">
                            This E Voting system client is made using ReactJs
                            and backend is made using Solidity having proper
                            test written. The account used to deploy the
                            contract will be the admin account.
                        </p>

                        <Link className="btn btn-primary btn-lg" to="/register">
                            Register
                        </Link>
                    </div>
                </div>

                <footer className="pt-3 mt-4 text-muted border-top">
                    © 2021
                </footer>
            </div>
        </>
    );
};

export default Home;
