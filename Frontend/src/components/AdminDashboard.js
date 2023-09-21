import React, { useState, useEffect } from "react";
import { urlDeleteGymById, urlGetGymDetailsAdmin } from "../ApiEndpoints";
import "./AdminDashboard.css";
import axios from "axios";

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

function AdminDashboard() {
    const [gymName, setGymName] = useState(""); //state of page-elements should rebuild/update
    const [address, setAddress] = useState("");
    const [adminName, setAdminName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(false);

    const getGymDataById = async () => {
        setDataLoading(true);

        let response;
        const adtoken = localStorage.getItem("adtoken");
        const gymId = localStorage.getItem("gymId");

        try {
            response = await axios.get(urlGetGymDetailsAdmin, {
                headers: {
                    Authorization: adtoken,
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

    useEffect(() => {
        getGymDataById();
    }, []);

    const handleCustomer = () => {
        console.log("CustomerPage");
        window.location.assign("/customerdashboard");
    };

    const handleTrainer = () => {
        console.log("Trainer Page");
        window.location.assign("/trainerpage");
    };

    const handleSubscriptionSetting = () => {
        console.log("Subscription Settings");
        window.location.assign("/subscriptionsettings");
    };

    return (
        <div className="adminDashboard">
            <div className="button-container">
                <button className="centered-button" onClick={handleCustomer}>
                    Customer
                </button>
                <button className="centered-button" onClick={handleTrainer}>
                    Trainer
                </button>
                <button
                    className="centered-button"
                    onClick={handleSubscriptionSetting}
                >
                    Subscription Setting
                </button>
            </div>

            {/* <div className="gym-details">
                <span>
                    <h6>Gym Name:{gymName}</h6>
                    <h6>Admin Name: {adminName}</h6>
                    <h6>UserName: {userName}</h6>
                    <h6>Phone Number: {phoneNumber}</h6>
                    <h6>Address: {address}</h6>
                </span>
            </div> */}
        </div>
    );
}

export default AdminDashboard;
