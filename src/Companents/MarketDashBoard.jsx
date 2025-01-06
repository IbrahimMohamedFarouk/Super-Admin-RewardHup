import { useState, useEffect } from "react";
import axios from "../api/axiosInstance";
import { useNavigate } from 'react-router-dom';

const MarketDashboard = () => {
    const navigate = useNavigate();
    const [markets, setMarkets] = useState([]);
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState({}); // State to store markets
    const [form, setForm] = useState({
        username: "",
        password: "",
        email: "",
        image: null,
        phonenumber: "",
        points: "",
        industryType: "",
    });

    // Fetch markets from the backend
    useEffect(() => {
        axios
          .get("/superadmin/thirdparties")
          .then((response) => setMarkets(response.data))
          .catch((error) => console.error("Error fetching markets:", error));
    }, []);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
        setForm({ ...form, image: file });
        }
    };

    // Handle image drag and drop
    const handleImageDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
        setForm({ ...form, image: file });
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = async (e) => {
        e.preventDefault(); // Prevent form reload
        try {
            const response = await axios.get(`/superadmin/thirdparty/search?q=${query}`);
            setMarkets(response.data); // Update products with fetched data
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    // Add Market
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("username", form.username);
            formData.append("password", form.password);
            formData.append("email", form.email);
            formData.append("image", form.image); // Append the image file
            formData.append("phonenumber", form.phonenumber);
            formData.append("points", form.points);
            formData.append("industrytype", form.industryType);

            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }
            const response = await axios.post("/superadmin/thirdparty", formData, {
                headers: {
                "Content-Type": "multipart/form-data",
                },
            });
            setMarkets([...markets, response.data]);
            setForm({ username: "", password: "", email: "", image: null, phonenumber: "", points: "", industryType: "" }); // Reset form
        } catch (error) {
            setResponse({
                success : false,
                message : error.response?.data?.message || "An error occurred while adding the market."
            })
        }
    };

    // Handle market deletion
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/markets/${id}`);
            setMarkets(markets.filter((market) => market._id !== id));
        } catch (error) {
            console.error("Error deleting market:", error);
        }
    };

    return (
        <div className="min-h-screen bg-primaryColor py-2 px-4 rounded-lg">
            <div className="max-w-4xl mx-auto py-6 text-textColor flex items-center justify-center flex-col">
                <div className="w-[70%] flex items-center justify-center pr-20">
                    <img
                        src="/rewardhup-high-resolution-logo-transparent.png"
                        alt="logo"
                        className="w-[100%]"
                    />
                </div>
                <div className="w-full">
                    <h1 className="text-2xl font-bold text-center mb-4 text-TextColor">Market Dashboard</h1>
                    <div className="justify-between items-center mb-6">
                        <button
                            onClick={() => navigate("/")}
                            className="bg-btnColor hover:bg-btnColorHover text-white py-2 px-4 rounded duration-75"
                        >
                            Go to Home
                        </button>
                        </div>
                    <form onSubmit={handleSubmit} className="mb-6">
                        <div className="mb-4">
                            <label className="block text-TextColor mb-2">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded text-textInput"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-TextColor mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded text-textInput"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-TextColor mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded text-textInput"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-TextColor mb-2">Image</label>
                            <div
                                className="w-full px-3 py-2 border rounded bg-gray-50 text-center cursor-pointer"
                                onDrop={handleImageDrop}
                                onDragOver={handleDragOver}
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    id="imageInput"
                                />
                                <label htmlFor="imageInput" className="cursor-pointer text-textInput">
                                    {form.image ? form.image.name : "Click to upload or drag and drop an image here"}
                                </label>
                            </div>
                        </div>
                    
                        <div className="mb-4">
                            <label className="block text-TextColor mb-2">Phone number</label>
                            <input
                                type="text"
                                name="phonenumber"
                                value={form.phonenumber}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded text-textInput"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-TextColor mb-2">Points (Optional)</label>
                            <input
                                type="number"
                                name="points"
                                value={form.points}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded text-textInput"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-TextColor mb-2">Industry Type</label>
                            <input
                                type="text"
                                name="industryType"
                                value={form.industryType}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded text-textInput"
                                required
                            />
                        </div>
                        {response.message && (
                            <div
                                className={`p-4 mb-4 rounded ${
                                    response.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                }`}
                            >
                                {response.message}
                            </div>
                        )}
                        <button
                            type="submit"
                            className="w-full bg-btnColor hover:bg-btnColorHover text-white py-2 px-4 rounded duration-75"
                        >
                            Add Market
                        </button>
                    </form>

                    {/* Markets List */}
                    <div>
                        <h2 className="text-xl font-bold mb-4 text-TextColor">Markets</h2>
                        <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
                            <input
                                type="text"
                                value={query}
                                onChange={handleInputChange}
                                placeholder="Search for markets..."
                                style={{
                                    padding: '8px',
                                    width: '300px',
                                    marginRight: '10px',
                                    border: '1px solid #ccc',
                                    borderRadius: '8px',
                                    height: '39px',
                                }}
                            />
                            <button
                                className="btn btn-success mb-3"
                            >
                                Search
                            </button>
                        </form>
                        {markets.length === 0 ? (
                            <p className="text-TextColor">No markets available.</p>
                        ) : (
                            <ul className="space-y-4">
                                {markets.map((market) => (
                                    <li
                                        key={market.id}
                                        className="p-4 border rounded shadow flex justify-between items-center text-TextColor"
                                    >
                                        <div>
                                            <h3 className="text-lg font-bold">{market.username}</h3>
                                            <p>Email: {market.email}</p>
                                            <p>Phone number: {market.phonenumber}</p>
                                            <p>Industry: {market.industryType}</p>
                                            {market.points && <p>Points: {market.points}</p>}
                                            {market.imageUrl && (
                                                <img
                                                    src={`http://localhost:3000${market.imageUrl}`}
                                                    alt="Market"
                                                    className="w-16 h-16 mt-2 rounded"
                                                />
                                            )}
                                        </div>
                                        <button
                                            onClick={() => handleDelete(market._id)}
                                            className="py-3 px-4 bg-deleteColor rounded-lg duration-75 hover:bg-deleteColorHover"
                                        >
                                            Delete
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketDashboard;
