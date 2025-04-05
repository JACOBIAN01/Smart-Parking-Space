import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-gradient-to-r from-blue-900 to-black p-4 shadow-md">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-white text-2xl font-bold tracking-wide">
        Smart Parking Space
      </h1>
      <div className="mr-10 text-xl space-x-10 text-white">
        <a
          href="/"
          className="relative inline-block after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-blue-400 after:via-purple-500 after:to-pink-500 after:transition-all after:duration-300 hover:after:w-full"
        >
          Home
        </a>
        <a
          href="/admin"
          className="relative inline-block after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-blue-400 after:via-purple-500 after:to-pink-500 after:transition-all after:duration-300 hover:after:w-full"
        >
          Admin
        </a>
      </div>
    </div>
  </nav>
);



const SlotBook = () => {
  const [formData, setFormData] = useState({
    username: "",
    carNumber: "",
    dateTime: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/book-slot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Slot booked. Redirecting to Payment...");
        setTimeout(() => {
          navigate("/payment", { state: { userData: formData } });
        }, 1500);
      } else {
        setMessage(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      setMessage("⚠️ Something went wrong. Try again later."+error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-black to-gray-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-800 via-purple-900 to-black opacity-50 animate-pulse"></div>

        <div className="relative z-10 w-full max-w-lg px-8 py-10 bg-black bg-opacity-70 rounded-3xl shadow-2xl text-white backdrop-blur-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-400 animate-fade-in">
            Book Your Parking Slot
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="username"
              placeholder="👤 Username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="carNumber"
              placeholder="🚘 Car Number"
              value={formData.carNumber}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="datetime-local"
              name="dateTime"
              value={formData.dateTime}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full mt-4 py-3 font-semibold bg-blue-600 hover:bg-blue-700 rounded-lg transition-transform transform hover:scale-105 shadow-md"
            >
              💳 Make Payment
            </button>
          </form>
          {message && (
            <p className="text-green-400 text-sm mt-4 text-center">{message}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SlotBook;
