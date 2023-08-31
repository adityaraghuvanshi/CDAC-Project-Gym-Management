import React, { useEffect, useState } from "react";
import axios from "axios";
import { urlUpdateGym, urlGetGymById } from "../ApiEndpoints";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

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

const UpdateGymForm = () => {
    const navigate = useNavigate();

    const [gymName, setGymName] = useState(""); //state of page-elements should rebuild/update
    const [address, setAddress] = useState("");
    const [adminName, setAdminName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(false);

    const handleSubmit = (e) => {
        console.log("ApiEndpoints", urlUpdateGym);

        e.preventDefault();

        const updatedGym = {
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
        updateGym();
    };
    useEffect(() => {
        getGymDataById();
    }, []);

    const updateGym = async () => {
        setLoading(true);
        let response;
        const suptoken = localStorage.getItem("suptoken");
        const gymId = localStorage.getItem("gymId");

        try {
            response = await axios.patch(
                urlUpdateGym,
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
                    params: {
                        id: gymId,
                    },
                }
            );

            //setData(response.data);

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

        alert("Gym Updated Sycessfully");

        navigate(-1);
    };
    const getGymDataById = async () => {
        setDataLoading(true);

        let response;
        const suptoken = localStorage.getItem("suptoken");
        const gymId = localStorage.getItem("gymId");

        try {
            response = await axios.get(urlGetGymById, {
                headers: {
                    Authorization: suptoken,
                },
                params: {
                    id: gymId,
                },
            });

            //setData(response.data);

            console.log(response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setDataLoading(false);
        if (!response) {
            alert("Something went wrong");
            return;
        }
        if (!response.data.success) {
            alert(response.data.message);
            return;
        }
        //console.log(response.data.data.gym.gymName);

        setGymName(response.data.data.gym.gymName);
        setAddress(response.data.data.gym.address);
        setAdminName(response.data.data.gym.adminName);
        setUserName(response.data.data.gym.username);
        setPhoneNumber(response.data.data.gym.mobileNumber.slice(3, 13));
        setPassword(response.data.data.gym.password);
    };

    return (
        <div className="gym-form">
            <h2>Update Gym</h2>

            {!dataLoading && (
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
                    {!loading && <button type="submit">Update Gym</button>}
                </form>
            )}

            {dataLoading && <CircularProgress />}
        </div>
    );
};

export default UpdateGymForm;
