import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import "./App.css";
import LandingPage from "./components/LandingPage";
import SuperAdminDashboardPage from "./components/SuperAdminDashboardPage";
import BillingPage from "./components/BillingPage";
import BMICalculator from "./components/BMICalculator";
import SubscriptionSettings from "./components/SubscriptionSettings";
import CustomerHistory from "./components/CustomerHistory";
import AddGymForm from "./components/AddGymForm";
import CustomerDashboard from "./components/CustomerDashboard";
import UpdateGymForm from "./components/UpdateGymForm";
import ViewSubscription from "./components/ViewSubscription";
import AboutUs from "./components/AboutUs";
import TrainerPage from "./components/TrainerPage";
import AdminDashboard from "./components/AdminDashboard";
import UpdateCustomerForm from "./components/UpdateCustomerForm";
import Navbar from "./components/Navbar";

function App() {
    return (
        <div className="App">
            <Navbar />

            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route
                    path="/superadmindashboardpage"
                    element={<SuperAdminDashboardPage />}
                />
                <Route path="/addgymform" element={<AddGymForm />} />
                <Route path="/updategymform" element={<UpdateGymForm />} />
                <Route path="/admindashboard" element={<AdminDashboard />} />
                <Route
                    path="/customerdashboard"
                    element={<CustomerDashboard />}
                />
                <Route
                    path="/registrationform"
                    element={<RegistrationForm />}
                />
                <Route path="/billingpage" element={<BillingPage />} />
                <Route path="/customerhistory" element={<CustomerHistory />} />
                <Route path="viewsubscription" element={<ViewSubscription />} />
                <Route
                    path="/updatecustomerform"
                    element={<UpdateCustomerForm />}
                />
                <Route path="/trainerpage" element={<TrainerPage />} />
                <Route
                    path="/subscriptionsettings"
                    element={<SubscriptionSettings />}
                />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/" element={<LandingPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
