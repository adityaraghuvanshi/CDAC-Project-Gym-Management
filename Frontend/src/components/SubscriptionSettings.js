import React,{useEffect,useState} from "react";
import axios from 'axios';
import { urlGetGymDetailsAdmin, urlUpdateSubscriptionDetails } from "../ApiEndpoints";
import { CircularProgress } from "@mui/material";
import './SubscriptionSettings.css';

const SubscriptionSettings = () => {
  const [subscriptionData, setSubscriptionData] = useState({
    gold: { monthly: 0, yearly: 0 },
    silver: { monthly: 0, yearly: 0 },
    platinum: { monthly: 0, yearly: 0 }
  });

  const [silverMonthly, setSilverMonthly] = useState(0);
  const [silverAnnual, setSilverAnnual] = useState(0);
  const [goldMonthly, setGoldMonthly] = useState(0);
  const [goldAnnual, setGoldAnnual] = useState(0);
  const [platinumMonthly, setPlatinumMonthly] = useState(0);
  const [platinumAnnual, setPlatinumAnnual] = useState(0);
  const [dataLoading, setDataLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAmountChange = (subscriptionType, period, amount) => {
    setSubscriptionData(prevData => ({
      ...prevData,
      [subscriptionType]: {
        ...prevData[subscriptionType],
        [period]: amount
      }
    }));
  };
 
  const handleSubmit = (event) => {
    event.preventDefault();
    // You can save subscriptionData to a backend server or storage here
    updateSubscription();
  };


  useEffect(() => {
    fetchSubscriptionData();
  }, []);
  
  const fetchSubscriptionData = async () => {
    setDataLoading(true);

    let response;
    const adtoken = localStorage.getItem('adtoken');

    try {
      response = await axios.get(
        urlGetGymDetailsAdmin, 
        {
          headers:{
            "Authorization":adtoken
          }
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setDataLoading(false);

    if(!response){
      alert("Something went wrong.");
      return
    }
    if(!response.data.success){
      alert(response.data.message);
      return
    }

    setSilverMonthly(response.data.data.gym.silverMonthly);
    setSilverAnnual(response.data.data.gym.silverAnnual);
    setGoldMonthly(response.data.data.gym.goldMonthly);
    setGoldAnnual(response.data.data.gym.goldAnnual);
    setPlatinumMonthly(response.data.data.gym.platinumMonthly);
    setPlatinumAnnual(response.data.data.gym.platinumAnnual);

  };

  const updateSubscription = async () => {
    setLoading(true);

    let response;
    const adtoken = localStorage.getItem('adtoken');

    try {
      response = await axios.patch(
        urlUpdateSubscriptionDetails, 
        {
          silverMonthly,
          silverAnnual,
          goldMonthly,
          goldAnnual,
          platinumMonthly,
          platinumAnnual
        },
        {
          headers:{
            "Authorization":adtoken
          }
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);

    if(!response){
      alert("Something went wrong.");
      return
    }
    if(!response.data.success){
      alert(response.data.message);
      return
    }

    alert("Subscription details updated successfully");
  

  };
  
  
  return (
    <div className="subscription-container">
      <h1>Subscription Settings</h1>
      {!dataLoading && <form onSubmit={handleSubmit}>
        <div>
            <h2>Silver</h2>
            <div>
              <label>
                Monthly Amount:
                <input
                  type="number"
                  value={silverMonthly}
                  onChange={e => setSilverMonthly(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                Yearly Amount:
                <input
                  type="number"
                  value={silverAnnual}
                  onChange={e => setSilverAnnual(e.target.value)}
                />
              </label>
            </div>
        </div>
        <div>
            <h2>Gold</h2>
            <div>
              <label>
                Monthly Amount:
                <input
                  type="number"
                  value={goldMonthly}
                  onChange={e => setGoldMonthly(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                Yearly Amount:
                <input
                  type="number"
                  value={goldAnnual}
                  onChange={e => setGoldAnnual(e.target.value)}
                />
              </label>
            </div>
        </div>
        <div>
            <h2>Platinum</h2>
            <div>
              <label>
                Monthly Amount:
                <input
                  type="number"
                  value={platinumMonthly}
                  onChange={e => setPlatinumMonthly(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                Yearly Amount:
                <input
                  type="number"
                  value={platinumAnnual}
                  onChange={e => setPlatinumAnnual(e.target.value)}
                />
              </label>
            </div>
        </div>
        {!loading && <button type="submit">Save</button>}
        {loading && <CircularProgress/>}
      </form>}
      {dataLoading && <CircularProgress/>}
    </div>
  );
};

export default SubscriptionSettings;
