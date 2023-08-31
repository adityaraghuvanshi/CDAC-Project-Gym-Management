import React,{useEffect,useState} from "react";
import axios from 'axios';

const handleCustomerRegistration =() => {  
    window.location.assign("/registrationform");
  };
  const handleCustomerHistory =() => {  
    window.location.assign("/customerhistory");
  };


const CustomerDashboard = () => {
  // const [data, setData] = useState(null);
  // useEffect(() => {
  //   fetchData();
  // }, []);
  
  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get('https://api.example.com/data');
  //     setData(response.data);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };
  return (
    <div className="CustomerDashboard">
      <h2>Welcome to the Customer Dashboard</h2>
        <button onClick={handleCustomerRegistration}>Customer Registration</button>
        <button onClick={handleCustomerHistory}>Customer History</button>
    </div>
  );
};

export default CustomerDashboard;
