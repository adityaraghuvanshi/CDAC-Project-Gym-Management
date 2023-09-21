import React, { useEffect, useState } from "react";
import axios from "axios";
import { urlGetCustomerById, urlUpdateCustomer } from "../ApiEndpoints";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import "./UpdateGymForm.css"

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

const RegistrationForm = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [age, setAge] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(false);

    const handleRegistration = () => {
        console.log("ApiEndpoints", urlUpdateCustomer);
        const updatedCustomer = {
            name,
            address,
            age,
            height,
            weight,
        };

        if (name === "") {
            alert("Name cannot be empty!");

            return;
        }
        if (address === "") {
            alert("Address cannot be empty!");

            return;
        }
        if (age > 98 && 4 < age) {
            alert("Age must be under limits");

            return;
        }
        if (mobileNumber < 10) {
            alert("Phone number must be 10 digits");
            return;
        }
        if (height > 250 && height < 50) {
            alert("Height must be withing limits");

            return;
        }
        if (weight > 250 && weight < 50) {
            alert("Weight must be withing limits");
            return;
        }
        updateCustomer();
        //window.location.assign("/billingpage");
    };

    useEffect(() => {
        getCustomerById();
    }, []);

    const updateCustomer = async () => {
        setLoading(true);
        let response;
        const adtoken = localStorage.getItem("adtoken");
        const customerId = localStorage.getItem("customerId");
        try {
            response = await axios.patch(
                urlUpdateCustomer,
                { name, address, age, mobileNumber, height, weight },
                {
                    headers: {
                        Authorization: adtoken,
                    },
                    params: {
                        id: customerId,
                    },
                }
            );
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
        alert("Customer Updated Successfully");
        navigate(-1);
    };
    const getCustomerById = async () => {
        setDataLoading(true);

        let response;
        const adtoken = localStorage.getItem("adtoken");
        const customerId = localStorage.getItem("customerId");

        try {
            response = await axios.get(urlGetCustomerById, {
                headers: {
                    Authorization: adtoken,
                },
                params: {
                    id: customerId,
                },
            });

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

        setName(response.data.data.customer.name);
        setAge(response.data.data.customer.age);
        setAddress(response.data.data.customer.address);
        setMobileNumber(response.data.data.customer.mobileNumber.slice(3, 13));
        setHeight(response.data.data.customer.height);
        setWeight(response.data.data.customer.weight);
    };
    return (
        <div className="registration-form">
            <h2>Update Customer Registration Form</h2>

            {!dataLoading && (
                <div>
                    <div className="input-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label>Address:</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label>Age:</label>
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label>Phone Number:</label>
                        <input
                            type="tel"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label>Height:</label>
                        <input
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label>Weight:</label>
                        <input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                    </div>
                    {loading && <CircularProgress />}
                    {!loading && (
                        <button onClick={handleRegistration}>Update</button>
                    )}
                </div>
            )}
            {dataLoading && <CircularProgress />}
        </div>
    );
};

export default RegistrationForm;
