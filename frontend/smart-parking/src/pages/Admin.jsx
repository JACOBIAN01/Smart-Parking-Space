import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");

  const fetchBookings = async () => {
    try {
      const response = await fetch("http://localhost:5000/get-all-bookings");
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      setMessage("Failed to fetch bookings. " + error.message);
    }
  };

  const resetBookings = async () => {
    try {
      const response = await fetch("http://localhost:5000/reset-bookings", {
        method: "DELETE",
      });
      const data = await response.json();
      setMessage(data.message);
      setBookings([]);
    } catch (error) {
      setMessage("Failed to reset bookings. " + error.message);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const extractUnique = (key) => [
    ...new Set(bookings.map((item) => item[key])),
  ];
  const logout = () => navigate("/");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-10 text-blue-300 drop-shadow-lg">
          🚗 Admin Dashboard – Slot Bookings
        </h2>

        {message && (
          <div className="bg-yellow-800 text-yellow-200 border-l-4 border-yellow-500 p-4 mb-6 rounded shadow-md">
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-blue-800 shadow-lg hover:shadow-blue-500 transition">
            <h3 className="text-xl font-semibold mb-3 text-blue-400">
              👤 Usernames
            </h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              {extractUnique("username").map((user, i) => (
                <li key={i}>{user}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-green-800 shadow-lg hover:shadow-green-500 transition">
            <h3 className="text-xl font-semibold mb-3 text-green-400">
              🚘 Car Numbers
            </h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              {extractUnique("carNumber").map((car, i) => (
                <li key={i}>{car}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-purple-800 shadow-lg hover:shadow-purple-500 transition">
            <h3 className="text-xl font-semibold mb-3 text-purple-400">
              🕓 Time Slots
            </h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              {extractUnique("dateTime").map((time, i) => (
                <li key={i}>{new Date(time).toLocaleString()}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-red-700 to-red-900 p-6 rounded-2xl shadow-xl text-center hover:scale-105 transition-transform">
            <h4 className="text-lg font-semibold text-white mb-3">
              ⚠️ Reset All Bookings
            </h4>
            <button
              onClick={resetBookings}
              className="bg-white text-red-800 font-bold py-2 px-6 rounded-full hover:bg-red-300 transition"
            >
              Reset Bookings
            </button>
          </div>

          <div className="bg-gradient-to-r from-gray-700 to-gray-900 p-6 rounded-2xl shadow-xl text-center hover:scale-105 transition-transform">
            <h4 className="text-lg font-semibold text-white mb-3">🚪 Logout</h4>
            <button
              onClick={logout}
              className="bg-white text-gray-900 font-bold py-2 px-6 rounded-full hover:bg-gray-300 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
