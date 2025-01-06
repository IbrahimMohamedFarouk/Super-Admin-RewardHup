import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css'
import SuperAdminDashboard from './Companents/SuperAdmin'
import { ToastContainer } from 'react-toastify';
import Register from "./Companents/Register"
import 'react-toastify/dist/ReactToastify.css';
import Login from "./Companents/Login";
import ProtectedRoute from "./Companents/ProtectedRoute";
import Dashboard from "./Companents/Dashboard";
import OffersDashboard from "./Companents/OffersDashboard";
import MarketDashboard from "./Companents/MarketDashBoard";

function App() {

  return (
      <>
      <div className="flex bg-white py-4 items-center justify-center font-[Roboto, sans-serif]">
      <ToastContainer></ToastContainer>
        <BrowserRouter>
          <Routes>
            <Route path="/dashboard" element={ <ProtectedRoute>
                                                  <Dashboard />
                                              </ProtectedRoute>} />
            <Route path="/offerDashBoard" element={<ProtectedRoute>
                                                    <OffersDashboard />
                                                    </ProtectedRoute>} />
            <Route path="/marketDashBoard" element={<ProtectedRoute><MarketDashboard /></ProtectedRoute>} />
            <Route path="/register" element={<ProtectedRoute><Register /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><SuperAdminDashboard /></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
