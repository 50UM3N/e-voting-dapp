import { Routes, Route } from "react-router-dom";
import Home from "./Routes/Home.js";
import Login from "./Routes/Auth/Login.js";
import AuthProvider from "./Redirects/AuthProvider.js";
import Profile from "./Routes/User/Profile.js";
import Register from "./Routes/Auth/Register.js";
import RegisterProvide from "./Redirects/RegisterProvide.js";
import AdminProvider from "./Redirects/AdminProvider.js";
import Request from "./Routes/Request.js";
import "react-toastify/dist/ReactToastify.css";
import Team from "./Routes/Team.js";
import Vote from "./Routes/Vote.js";
import Result from "./Routes/Result.js";
function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route element={<AuthProvider />}>
                    <Route path="/profile" element={<Profile />} />
                    <Route element={<RegisterProvide />}>
                        <Route path="/register" element={<Register />} />
                    </Route>
                    <Route element={<AdminProvider />}>
                        <Route path="/voter-request" element={<Request />} />
                        <Route path="/team" element={<Team />} />
                    </Route>
                    <Route path="/vote" element={<Vote />} />
                    <Route path="/result" element={<Result />} />
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes>
        </>
    );
}

export default App;
