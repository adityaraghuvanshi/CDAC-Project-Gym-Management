import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    urlGetAllCustomersAdmin,
    urlDeleteCustomerById,
} from "../ApiEndpoints";
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

const CustomerHistoryTable = (props) => {
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(false);
    const [customers, setCustomers] = useState([]);

    const handleViewSubscription = (customerId) => {
        localStorage.setItem("customerId", customerId);
        window.location.assign("/viewsubscription");
    };

    const handleUpdateCustomerForm = (index) => {
        console.log(customers[index]._id);
        const customerId = localStorage.setItem(
            "customerId",
            customers[index]._id
        );
        window.location.assign("/updatecustomerform");
    };

    const handleAddCustomer = () => {
        window.location.assign("/registrationform");
    };
    const handleDeleteCustomer = (customerId) => {
        deleteCustomerById(customerId);
    };

    const deleteCustomerById = async (customerId) => {
        setDataLoading(true);
        let response;
        const adtoken = localStorage.getItem("adtoken");

        try {
            response = await axios.delete(urlDeleteCustomerById, {
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
        alert("Customer Deleted Successfully");
        getAllCustomers();
    };

    const getAllCustomers = async () => {
        setLoading(true);
        let response;
        const adtoken = localStorage.getItem("adtoken");
        try {
            response = await axios.get(urlGetAllCustomersAdmin, {
                headers: {
                    Authorization: adtoken,
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
        setCustomers(response.data.data.customers);
    };

    useEffect(() => {
        getAllCustomers();
        console.log("Page loaded successfully");
    }, []);

    return (
        <div>
            <h1>Customer History Table</h1>
            <button onClick={handleAddCustomer}>Add</button>
            {!loading && (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Mobile Number</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer, index) => (
                            <tr key={index}>
                                <td>{customer.name}</td>
                                <td>{customer.mobileNumber}</td>
                                <td>
                                    <button
                                        onClick={() =>
                                            handleViewSubscription(customer._id)
                                        }
                                    >
                                        View Subscription
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDeleteCustomer(customer._id)
                                        }
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleUpdateCustomerForm(index)
                                        }
                                    >
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {loading && <CircularProgress />}
        </div>
    );
};

export default CustomerHistoryTable;
