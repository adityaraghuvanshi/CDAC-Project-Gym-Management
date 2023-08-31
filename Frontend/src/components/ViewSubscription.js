import React, { useEffect, useState } from "react";
import axios from "axios";
import { urlGetCustomerById } from "../ApiEndpoints";

const ViewSubscription = () => {
    const [customer, setCustomer] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log("ApiEndpoints", urlGetCustomerById);
        getCustomerDetails();
    }, []);

    const getCustomerDetails = async () => {
        setLoading(true);
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
        console.log(response.data.data);
        setCustomer(response.data.data.customer);
    };

    return (
        <div className="gym-subscription-page">
            <h2>Customer Subscription Details</h2>
            <h3> Name: {customer.name}</h3>
            <h3> Age: {customer.age}</h3>
            <h3>Mobile Number: {customer.mobileNumber}</h3>
            <h3>Height: {customer.height}</h3>
            <h3>Weight: {customer.weight}</h3>
            <h3>Subscription on: {customer.subscribedUpto}</h3>{" "}
            {/*Change time format*/}
        </div>
    );
};

export default ViewSubscription;
