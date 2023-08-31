import React from 'react';
import AdminLogin from './AdminLogin';
import SuperAdminLogin from './SuperAdminLogin';
import './LandingPage.css'

function LandingPage(){    
    return (
        <>
            <AdminLogin/>
            <SuperAdminLogin/>
        </>
            
      
    );
  };
  
  export default LandingPage;
  