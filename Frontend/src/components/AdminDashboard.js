import React from 'react';
import { urlDeleteGymById } from '../ApiEndpoints';


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
      function AdminDashboard() {
  return (
    
    <div className="App">
     <div className="button-container">
        <button className="centered-button" onClick={handleCustomer}>Customer</button>
        <button className="centered-button" onClick={handleTrainer}>Trainer</button>
        <button className="centered-button" onClick={handleSubscriptionSetting}>Subscription Setting</button>
      </div>

      <div className="gym-details">
        
      </div>      
    </div>
  );
}

export default AdminDashboard;
