import React,{useEffect,useState} from "react";
import './BillingPage.css';
import axios from 'axios';

import { urlGetGymDetailsAdmin } from "../ApiEndpoints";

const BillingPage = () => {
  const [selectedMembership, setSelectedMembership] = useState('');
  const [selectedSubscription, setSelectedSubscription] = useState('monthly');
  const [months, setMonths] = useState(1);
  const [dataLoading , setDataLoading] = useState(false);

  const [membershipData, setMembershipData] = useState({
    gold: { monthly: 0, yearly: 0 },
    silver: { monthly: 0, yearly: 0 },
    platinum: { monthly: 0, yearly: 0 }
  });

  const [calculatedTotal, setCalculatedTotal] = useState(0); 

  const handleMembershipChange = (event) => {
    setSelectedMembership(event.target.value);
  };

  

  const handleSubscriptionChange = (event) => {
    setSelectedSubscription(event.target.value);
  };

  const handleMonthsChange = (event) => {
    setMonths(event.target.value);
  };

  const calculateTotal = () => {
    if (selectedMembership && selectedSubscription) {
      const membershipPrice = membershipData[selectedMembership][selectedSubscription];
      const subscriptionTotal = selectedSubscription === 'monthly' ? membershipPrice * months : membershipPrice;
      setCalculatedTotal(subscriptionTotal); // Update the calculated total
      return subscriptionTotal;
    }
    setCalculatedTotal(0); // Reset the calculated total
    return 0;
  };
  
  useEffect(() => {
    fetchGymDetails();
  }, []);
  
  const fetchGymDetails = async () => {
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

    setMembershipData(
      {
        gold: { monthly: response.data.data.gym.goldMonthly, yearly: response.data.data.gym.goldAnnual },
        silver: { monthly: response.data.data.gym.silverMonthly, yearly: response.data.data.gym.silverAnnual },
        platinum: { monthly: response.data.data.gym.platinumMonthly, yearly: response.data.data.gym.platinumAnnual }
      }    
    );

    // setSilverMonthly(response.data.data.gym.silverMonthly);
    // setSilverAnnual(response.data.data.gym.silverAnnual);
    // setGoldMonthly(response.data.data.gym.goldMonthly);
    // setGoldAnnual(response.data.data.gym.goldAnnual);
    // setPlatinumMonthly(response.data.data.gym.platinumMonthly);
    // setPlatinumAnnual(response.data.data.gym.platinumAnnual);

  };
  
  return (
    <div>
      <h1>Billing Page</h1>
      <div>
        <label>
          Your Selected Membership is:
          <select value={selectedMembership} onChange={handleMembershipChange}>
            <option value="">Select</option>
            <option value="gold">Gold</option>
            <option value="silver">Silver</option>
            <option value="platinum">Platinum</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Select Subscription:
          <select value={selectedSubscription} onChange={handleSubscriptionChange}>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </label>
      </div>
      {selectedSubscription === 'monthly' && (
        <div>
          <label>
            Number of Months:
            <input type="number" value={months} onChange={handleMonthsChange} />
          </label>
        </div>
      )}
      {/* {selectedSubscription === 'monthly' && (
        <div>
          <label>
            Number of Months:
            <input type="number" value={months} onChange={handleMonthsChange} />
          </label>
        </div>
      )} */}
      <div>
      <div>
        <button onClick={calculateTotal}>Calculate</button>
      </div>
      {calculatedTotal > 0 && (
        <div>
          <p>Calculated Total: Rs. {calculatedTotal} ₹/-</p>
        </div>
      )}
      
    </div>
    </div>
  );
};

export default BillingPage;
