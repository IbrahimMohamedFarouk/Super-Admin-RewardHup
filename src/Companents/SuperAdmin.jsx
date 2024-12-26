    // Import necessary dependencies
    import { useState, useEffect } from "react";
    import axios from "axios";


    const SuperAdminDashboard = () => {
    const [offers, setOffers] = useState([]); // State to store offers
    const [form, setForm] = useState({
        title: "",
        description: "",
        image: null, // Store image file instead of URL
        points: "",
        expiryDate: "",
    });

    // Fetch offers from the backend
    useEffect(() => {
        axios
        .get("http://localhost:3000/api/offers")
        .then((response) => {
            const transformedOffers = response.data.map((offer) => ({
                ...offer,
                image: `http://localhost:3000${offer.imageUrl}`, // Prefix with your backend's base URL
            }));
            setOffers(transformedOffers);
        })
        .catch((error) => console.error("Error fetching offers:", error));
    }, []);
    
    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    // Handle image upload
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

    // Add Offer
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("description", form.description);
        formData.append("points", form.points);
        formData.append("expiryDate", form.expiryDate);
        if (form.image) {
        formData.append("image", form.image);
        }

        try {
        const response = await axios.post("http://localhost:3000/api/offers", formData, {
            headers: {
            "Content-Type": "multipart/form-data",
            },
        });
        setOffers([...offers, response.data]);
        setForm({ title: "", description: "", image: null, points: "" });
        } catch (error) {
        console.error("Error adding offer:", error);
        }
    };

    return (
        <div className="min-h-screen bg-primary p-4 rounded-lg ">
            <div className="max-w-4xl mx-auto py-6 text-textColor flex items-center justify-center flex-col">
                <div className="w-[70%] flex items-center justify-center pr-20">
                    <img src="/rewardhup-high-resolution-logo-transparent.png" alt="logo" className=" w-[100%] " />
                </div>
                <div  className="w-full ">
                    <h1 className="text-2xl font-bold text-center mb-4">Super Admin Dashboard</h1>

                    {/* Form Section */}
                    <form onSubmit={handleSubmit} className="mb-6">
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Title</label>
                        <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded text-textInput"
                        required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Description</label>
                        <textarea
                        type="text"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded text-textInput"
                        required
                        ></textarea>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Image</label>
                        <div
                        className="w-full px-3 py-2 border rounded bg-gray-50 text-center cursor-pointer"
                        onDrop={handleImageDrop}
                        onDragOver={handleDragOver}
                        >
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden text-textInput"
                            id="imageInput"
                        />
                        <label htmlFor="imageInput" className="cursor-pointer text-textInput">
                            {form.image ? form.image.name : "Click to upload or drag and drop an image here"}
                        </label>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Point (Optional)</label>
                        <input
                        type="number"
                        name="points"
                        value={form.points}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded text-textInput"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block  mb-2">Expiry Date (Optional)</label>
                        <input
                        type="date"
                        name="expiryDate"
                        value={form.expiryDate}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded text-textInput "
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-btnColor hover:bg-btnColorHover text-white py-2 px-4 rounded hover:bg-blue-600 duration-75"
                    >
                        Add Offer
                    </button>
                    </form>

                    {/* Offers List */}
                    <div>
                    <h2 className="text-xl font-bold mb-4">Offers</h2>
                    {offers.length === 0 ? (
                        <p className="text-gray-500">No offers available.</p>
                    ) : (
                        <ul className="space-y-4">
                        {offers.map((offer) => (
                            <li
                            key={offer.id}
                            className="p-4 border rounded shadow flex justify-center items-center"
                            >
                            <div className="flex justify-center items-center flex-col">
                                <h3 className="text-lg font-bold">{offer.title}</h3>
                                <p>{offer.description}</p>
                                {offer.image && <img src={`http://localhost:3000${offer.imageUrl}`} alt="Offer" className="w-16 h-16 mt-2 rounded" />}
                                {offer.points && <p className="text-gray-600">Points: {offer.points}</p>}
                                {offer.expiryDate && <p className="text-gray-600">Expiry Date: {offer.expiryDate}</p>}
                            </div>
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

    export default SuperAdminDashboard;
