import React, { useEffect, useState } from "react";
import "./SuperAdminDashboardPage.css";
import axios from "axios";
import { urlGetAllGyms, urlDeleteGymById } from "../ApiEndpoints";
import { CircularProgress } from "@mui/material";

const SuperAdminDashboardPage = (props) => {
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(false);
    const [gyms, setGyms] = useState([]);

    const handleAddGym = () => {
        window.location.assign("/addgymform");
    };
    const handleUpdate = (index) => {
        console.log(gyms[index]._id);
        const gymId = localStorage.setItem("gymId", gyms[index]._id);
        window.location.assign("/updategymform");
    };

    const handleDelete = (gymId) => {
        deleteGymDataById(gymId);
    };

    const deleteGymDataById = async (gymId) => {
        setDataLoading(true);

        let response;
        const suptoken = localStorage.getItem("suptoken");

        try {
            response = await axios.delete(urlDeleteGymById, {
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
        alert("Gym Deleted Successfully");
        fetchData();
    };

    useEffect(() => {
        fetchData();
        console.log("Page loaded successfully");
        // this.props.navigation.addListener(
        //   "didFocus",
        //   payLoad => {
        //     console.log("Page has Resumed!");
        //   }
        // );
    }, []);

    const fetchData = async () => {
        setLoading(true);
        let response;
        const suptoken = localStorage.getItem("suptoken");
        try {
            response = await axios.get(urlGetAllGyms, {
                headers: {
                    Authorization: suptoken,
                },
            });

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
        setGyms(response.data.data.gyms);
    };

    return (
        <div className="super-admin-dashboard">
            <h2>Super Admin Dashboard</h2>
            <button onClick={handleAddGym}>Add Gym</button>
            {!loading && (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Owner</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gyms.map((gym, index) => (
                            <tr key={index}>
                                <td>{gym.gymName}</td>
                                <td>{gym.address}</td>
                                <td>{gym.adminName}</td>
                                <td>{gym.mobileNumber}</td>
                                <td>
                                    <button onClick={() => handleUpdate(index)}>
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(gym._id)}
                                    >
                                        Delete
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

export default SuperAdminDashboardPage;
