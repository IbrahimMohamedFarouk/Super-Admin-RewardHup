import { useNavigate } from "react-router-dom";


    const SuperAdminDashboard = () => {
        const navigate=useNavigate()
    const handleOffersDashboard=()=>{
        navigate("/offerDashBoard")
    }
    const handleMarketDashboard=()=>{
        navigate("/marketDashboard")
    }
    const handleAddAdmin=()=>{
        navigate("/register")
    }

    const handleAdminDashboard=()=>{
        navigate("/dashboard")
    }

    return (
        <div className="min-h-screen bg-primaryColor text-center py-2 px-4 rounded-lg">
        <div className="max-w-4xl mx-auto py-6 text-textColor flex items-center justify-center flex-col">
            <div className="w-[70%] flex items-center justify-center pr-20">
            <img
                src="/public/pixelcut-export (1).png"
                alt="logo"
                className="w-[100%]"
            />
            </div>
            <div className="w-full">
            <h1 className="text-2xl font-bold text-center mb-4 text-TextColor">Super Admin Dashboard</h1>

            {/* Action Buttons */}
        <div className="mb-6 grid  grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Group 1: Offers */}
            <button onClick={handleOffersDashboard} className="py-3 px-4 bg-btnColor rounded-lg hover:bg-btnColorHover text-white">
                Manage Offers
            </button>

            {/* Group 2: Markets */}
            <button onClick={handleMarketDashboard} className="py-3 px-4 bg-btnColor rounded-lg hover:bg-btnColorHover text-white">
                Manage Stores
            </button>

            {/* Group 3: Admins */}
            <button onClick={handleAddAdmin} className="py-3 px-4 bg-btnColor rounded-lg hover:bg-btnColorHover text-white">
                Add Admin
            </button>
            <button onClick={handleAdminDashboard} className="py-3 px-4 bg-btnColor rounded-lg hover:bg-btnColorHover text-white">
                Show Admins
            </button>
            </div>


            </div>
        </div>
        </div>
    );
};

export default SuperAdminDashboard;
