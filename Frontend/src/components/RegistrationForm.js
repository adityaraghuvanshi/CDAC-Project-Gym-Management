import React, { useEffect, useState } from "react";
import axios from "axios";
import { urlAddCustomerAdmin } from "../ApiEndpoints";
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

const RegistrationForm = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [age, setAge] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegistration = () => {
        console.log("APiEndpoints", urlAddCustomerAdmin);

        const newCustomer = {
            name,
            address,
            age,
            mobileNumber,
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
        addCustomer();
        
    };

    const addCustomer = async () => {
        setLoading(true);
        let response;
        const adtoken = localStorage.getItem("adtoken");
        try {
            response = await axios.post(
                urlAddCustomerAdmin,
                { name, address, age, mobileNumber, height, weight },
                {
                    headers: {
                        Authorization: adtoken,
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
        alert("Customer Added Successfully");
        console.log(response.data.data);
        localStorage.setItem('customerId', response.data.data.customer._id);
        window.location.assign("/billingpage");
    };

    return (
        <div className="registration-form">
            <h2>Registration Form</h2>
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

            {/* <div className="input-group">
        <label>Membership:</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="Silver"
              checked={membership === 'Silver'}
              onChange={() => setMembership('Silver')}
            />
            Silver
          </label>
          <label>
            <input
              type="radio"
              value="Gold"
              checked={membership === 'Gold'}
              onChange={() => setMembership('Gold')}
            />
            Gold
          </label>
          <label>
            <input
              type="radio"
              value="Platinum"
              checked={membership === 'Platinum'}
              onChange={() => setMembership('Platinum')}
            />
            Platinum
          </label>          
        </div>         
      </div>*/}
            {loading && <CircularProgress />}
            {!loading && <button onClick={handleRegistration}>Register</button>}
        </div>
    );
};

export default RegistrationForm;
