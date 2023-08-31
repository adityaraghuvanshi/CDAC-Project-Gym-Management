import React, { useEffect, useState } from "react";
import axios from "axios";
import { urlAddGym } from "../ApiEndpoints";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

axios.interceptors.response.use(
    (response) => {
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

const GymForm = () => {
    const navigate = useNavigate();

    const [gymName, setGymName] = useState("");
    const [address, setAddress] = useState("");
    const [adminName, setAdminName] = useState("");
    const [userName, setUserName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(""); //change
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        console.log("ApiEndPoints", urlAddGym);

        e.preventDefault();
        const newGym = {
            gymName,
            address,
            adminName,
            phoneNumber,
            userName,
            password,
        };

        if (gymName === false) {
            alert("Gym Name cannot be empty");
            return;
        }
        if (adminName === false) {
            alert("Admin Name cannot be empty");
            return;
        }
        if (address === false) {
            alert("address cannot be empty");
            return;
        }
        if (userName === false) {
            alert("Username cannot be empty");
            return;
        }
        if (phoneNumber.length !== 10) {
            alert("Phone number must be 10 digits");
            return;
        }
        if (password.length <= 5) {
            alert("Password length cannot be less than 6 characters");
            return;
        }
        addGym();
    };

    const addGym = async () => {
        setLoading(true);
        let response;
        const suptoken = localStorage.getItem("suptoken");
        try {
            response = await axios.post(
                urlAddGym,
                {
                    gymName,
                    address,
                    adminName,
                    username: userName,
                    mobileNumber: "+91" + phoneNumber,
                    password,
                },
                {
                    headers: {
                        Authorization: suptoken,
                    },
                }
            );
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
        alert("Gym Added Successfully");

        navigate(-1);
    };
    return (
        <div className="gym-form">
            <h2>Add a Gym</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Gym Name:</label>
                    <input
                        type="text"
                        value={gymName}
                        onChange={(e) => setGymName(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Address:</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Admin Name:</label>
                    <input
                        type="text"
                        value={adminName}
                        onChange={(e) => setAdminName(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Phone Number:</label>
                    <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {loading && <CircularProgress />}
                {!loading && <button type="submit">Add Gym</button>}
            </form>
        </div>
    );
};

export default GymForm;
