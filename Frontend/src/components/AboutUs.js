import React,{useEffect,useState} from "react";
import './AboutUs.css';
import axios from "axios";

const AboutUs = () => {
//   const [data, setData] = useState(null);
//   useEffect(() => {
//     fetchData();
//   }, []);
  
//   const fetchData = async () => {
//     try {
//       const response = await axios.get('https://api.example.com/data');
//       setData(response.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };
  return (
    <div className="about-us">
      <h1>C-DAC: Centre for Development of Advanced Computing, India</h1>
      <h2>Gym Management Project</h2>
      <p>
        Welcome to our Gym Management Project! This project aims to provide an
        efficient solution for managing gym operations, member details,
        trainers, and more. Our team has put in a lot of effort to design and
        develop this application.
      </p>
      <h3>Project Group Members:</h3>
      <ul>
        <li>Aditya Vinod Raghuvanshi (Team Leader)</li>
        <li>Suyog Vinod Chitte (Team Member)</li>
        <li>Pratik Londhe (Team Member)</li>
        <li>Aarti Kapadne (Team Member)</li>
      </ul>
      <div className="social-links">
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
        </a>
        <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
        </a>
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
        </a>
      </div>
    </div>
  );
  };
export default AboutUs;
