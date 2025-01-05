import { useState, useEffect } from "react";
import axios from "../api/axiosInstance";

const MarketDashboard = () => {
    const [markets, setMarkets] = useState([{
        id:1,
        username: "hema",
        password: "dldmmdml",
        email: "slmsms",
        imageUrl: "lmsmls",
        phone: "lmsms",
        points: "ss,",
        industryType: ",s;s,",
    }]); // State to store markets
    const [form, setForm] = useState({
        username: "",
        password: "",
        email: "",
        imageUrl: "",
        phone: "",
        points: "",
        industryType: "",
    });

    // Fetch markets from the backend
    useEffect(() => {
        // axios
        //   .get("/api/markets")
        //   .then((response) => setMarkets(response.data))
        //   .catch((error) => console.error("Error fetching markets:", error));
    }, []);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    // Add Market
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/markets", form);
            setMarkets([...markets, response.data]);
            setForm({ username: "", password: "", email: "", imageUrl: "", phone: "", points: "", industryType: "" }); // Reset form
        } catch (error) {
            console.error("Error adding market:", error);
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
                            <label className="block text-TextColor mb-2">Image URL</label>
                            <input
                                type="text"
                                name="imageUrl"
                                value={form.imageUrl}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded text-textInput"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-TextColor mb-2">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={form.phone}
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
                                            <p>Phone: {market.phone}</p>
                                            <p>Industry: {market.industryType}</p>
                                            {market.points && <p>Points: {market.points}</p>}
                                            {market.imageUrl && (
                                                <img
                                                    src={market.imageUrl}
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
