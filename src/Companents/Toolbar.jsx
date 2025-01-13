import { useNavigate } from "react-router-dom";
import { confirmDialog } from 'primereact/confirmdialog';
import axios from "../api/axiosInstance";
const Toolbar = () => {
  const navigate = useNavigate();

  const handleOffersDashboard = () => {
    navigate("/offerDashBoard");
  };

  const handleMarketDashboard = () => {
    navigate("/marketDashBoard");
  };

  const handleAddAdmin = () => {
    navigate("/register");
  };

  const handleAdminDashboard = () => {
    navigate("/dashboard");
  };
  const handleLogout = async () => {
    try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
            console.error('No refresh token found');
            return;
        }
        console.log("Refresh token:", refreshToken);
        const response = await axios.delete('/admin/logout', {
            data: { token: refreshToken },
        });

        if (response.status === 200) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            window.location.href = '/';
        }
    } catch (error) {
        console.error('Logout failed:', error);
    }
};
  const confirmLogout = () => {
    confirmDialog({
        message: 'Are you sure you want to log out?',
        header: 'Logout Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: handleLogout, // Call handleLogout on confirmation
        reject: () => console.log('Logout cancelled'), // Optional: handle rejection
    });
};
  return (
<div className="fixed top-0 left-0 w-full bg-[#F0F0F0] text-[#16b91a] py-2 px-4 z-50">
    <div className="flex justify-between items-center">
        {/* Centered Navigation Buttons */}
        <div className="flex space-x-6 mx-auto">
            <button onClick={handleOffersDashboard} className="hover:text-[#006400]">
                Manage Offers
            </button>
            <button onClick={handleMarketDashboard} className="hover:text-[#006400]">
                Manage Vendors
            </button>
            <button onClick={handleAddAdmin} className="hover:text-[#006400]">
                Add Admin
            </button>
            <button onClick={handleAdminDashboard} className="hover:text-[#006400]">
                Show Admins
            </button>
        </div>

        {/* Logout Button (Right side) */}
        <div className="flex justify-end">
            <button
                onClick={confirmLogout}
                className="hover:text-[#006400] text-lg"
            >
                Logout <i className="pi pi-sign-out"></i>
            </button>
        </div>
    </div>
</div>
  );
};

export default Toolbar;