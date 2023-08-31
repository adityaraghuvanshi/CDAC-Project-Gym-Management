import React, { useEffect, useState } from "react";
import "./TrainerPage.css";
import axios from "axios";
import { urlAddTrainer, urlGetAllTrainers,urlDeleteTrainerById } from "../ApiEndpoints";
import { useNavigate } from "react-router-dom";

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

const TrainerPage = (props) => {
    const [trainers, setTrainers] = useState([]);
    const [name, setTrainerName] = useState("");
    const [mobileNumber, setTrainerPhone] = useState("");
    const [address, setTrainerAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const[dataLoading,setDataLoading]=useState(false);

    const addTrainerAdmin = () => {
        console.log("ApiEndpoints", urlAddTrainer);

        const newTrainer = {
            name,
            mobileNumber,
            address,
        };

        if (name === "") {
            alert("Trainer name cannot be empty!");
            return;
        }
        if (mobileNumber.length !== 10) {
            alert("Phone number cannot be less than 10");
            return;
        }
        if (address === "") {
            alert("Address cannot be empty!");
            return;
        }
        addTrainer();
    };

    const addTrainer = async () => {
        setLoading(true);
        let response;
        const adtoken = localStorage.getItem("adtoken");
        try {
            response = await axios.post(
                urlAddTrainer,
                {
                    name,
                    mobileNumber,
                    address,
                },
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
        alert("Trainer Added Successfully");
    };

    const fetchTrainer = async () => {
        setLoading(true);
        let response;
        const adtoken = localStorage.getItem("adtoken");
        try {
            response = await axios.get(urlGetAllTrainers, {
                headers: {
                    Authorization: adtoken,
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
        setTrainers(response.data.data.trainers);
    };
    const handleDeleteTrainer = (index) => {
        deleteTrainerById(index);
    };

    const deleteTrainerById = async (trainerId) => {
      setDataLoading(true);
      let response; 
      const adtoken = localStorage.getItem("adtoken");

      try {
          response = await axios.delete(urlDeleteTrainerById, {
              headers: {
                  Authorization: adtoken,
              },
              params: {
                  id: trainerId,
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
      alert("Trainer Deleted Successfully");
      fetchTrainer();
    };

    useEffect(() => {
        fetchTrainer();
    }, []);


    // const fetchData = async () => {
    //   try {
    //     const response = await axios.get('https://api.example.com/data');
    //     setData(response.data);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // };
    return (
        <div className="trainer-page">
            <div className="left-section">
                <h2>Add New Trainer</h2>
                <input
                    type="text"
                    placeholder="Name of Trainer"
                    value={name}
                    onChange={(e) => setTrainerName(e.target.value)}
                />
                <input
                    type="tel"
                    placeholder="Phone No. of Trainer"
                    value={mobileNumber}
                    onChange={(e) => setTrainerPhone(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Address of Trainer"
                    value={address}
                    onChange={(e) => setTrainerAddress(e.target.value)}
                />
                <button onClick={addTrainerAdmin}>Add</button>
            </div>
            <div className="right-section">
                <h2>Trainers</h2>
                {trainers.map((trainer, index) => (
                    <div key={index} className="trainer-row">
                        <h3>{trainer.name}</h3>

                        <button onClick={() => handleDeleteTrainer(trainer._id)}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrainerPage;
