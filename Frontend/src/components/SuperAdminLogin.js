import React, { useEffect, useState } from "react";
import "./SuperAdminLogin.css";
import axios from "axios";
import { urlSuperAdminLogin } from "../ApiEndpoints";
import CircularProgress from "@mui/material/CircularProgress";

axios.interceptors.response.use(
    (response) => {
        //7-22 copy-paste import everywhere
        return response;
    },
    (error) => {
        if (!error.response) {
            alert("NETWORK ERROR");
        } else {
            const code = error.response.status;
            if (code >= 400 && code <= 500) {
                return Promise.resolve(error.response);
            }
            return Promise.reject(error);
        }
    }
);

const SuperAdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        console.log("ApiEndpoints", urlSuperAdminLogin);
        if (username.length <= 0) {
            alert("Username cannot be empty");
            return;
        }
        if (password.length <= 5) {
            alert("Password length cannot be less than 6 characters");
            return;
        }
        login();
    };

    // useEffect(() => {
    //     fetchData();
    //   }, []);

    const login = async () => {
        setLoading(true);
        let response;
        try {
            response = await axios.post(urlSuperAdminLogin, {
                username,
                password,
            }); //key-value pair
            // setData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setLoading(false);
        if (!response) {
            alert("Something went wrong");
            return;
        }
        if (!response.data.success) {
            alert(response.data.message);
            return;
        }
        localStorage.setItem("suptoken", response.data.data.token);

        window.location.assign("/superadmindashboardpage");
    };
    return (
        <div className="superAdminLogin-container">
            <div className="text-box2">
                <h2>Super Admin</h2>
                <input
                    type="text"
                    className="first-input2"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label id="first-textbox2">Username</label>
                <input
                    type="password"
                    className="second-input2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label id="second-textbox2">Password</label>
            </div>
            {loading && <CircularProgress />}
            {!loading && <button onClick={handleLogin}>Login</button>}
        </div>
    );
};

export default SuperAdminLogin;
