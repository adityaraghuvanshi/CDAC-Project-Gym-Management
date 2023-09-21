import React from "react";
import AdminLogin from "./AdminLogin";
import SuperAdminLogin from "./SuperAdminLogin";
import "./LandingPage.css";

function LandingPage() {
    return (
        <div className="login-container">
            <div className="subContainer left">
                <AdminLogin />
            </div>
            <div className="subContainer right">
                <SuperAdminLogin />
            </div>
        </div>
    );
}

export default LandingPage;
