import { Routes, Route } from "react-router-dom";
import Home from "./Routes/Home.js";
import Login from "./Routes/Auth/Login.js";
import AuthProvider from "./Redirects/AuthProvider.js";
import Profile from "./Routes/User/Profile.js";
function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route element={<AuthProvider />}>
                    <Route path="/profile" element={<Profile />} />
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes>
        </>
    );
}

export default App;
