import React, { useState,useEffect} from 'react';
import axios from 'axios';
import { urlAdminLogin } from '../ApiEndpoints';
import { CircularProgress } from '@mui/material';

axios.interceptors.response.use((response) => { //7-22 copy-paste import everywhere
  return response;
}, (error) => {
  if (!error.response) {
      alert('NETWORK ERROR')
  } else {
    const code = error.response.status
    if (code >= 400 && code <= 500){
    return Promise.resolve(error.response);        
    }      
return Promise.reject(error)
  }
});

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const[loading,setLoading]=useState(false);

  const handleLogin = () => {
    console.log('ApiEndpoints:',urlAdminLogin);
    if(username.length<=0){
      alert("Username cannot be empty");
      return 
    }
    if(password.length<=5){
      alert("Password length cannot be less than 6 characters");
      return 
    }
    adminLogin();
    

  };
  // const [data, setData] = useState(null);
  // useEffect(() => {
  //   fetchData();
  // }, []);
  
  const adminLogin = async () => {
    setLoading(true);
    let response;
    try {
      response = await axios.post(urlAdminLogin,{username,password});

      console.log (response.data);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
    if(!response){
      alert("Something went wrong");
      return
    }
    if(!response.data.success){
      alert(response.data.message);
      return
    }
    localStorage.setItem("adtoken",response.data.data.token);
    window.location.assign("/admindashboard");

  };
  return (
    <div className="login-container">
      <h2>Admin</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {loading && <CircularProgress/>}
      {!loading && <button onClick={handleLogin}>Login</button>}
    </div>
  );
};

export default AdminLogin;
