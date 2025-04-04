import { useState } from "react";

const SlotBook = () => {
  const [formData, setFormData] = useState({
    username: "",
    carNumber: "",
    dateTime: "", // Fixed key name (matches backend)
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/book-slot", {
        // Fixed URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Slot booked successfully!");
        setFormData({ username: "", carNumber: "", dateTime: "" });
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setMessage("Something went wrong. Try again later.");
    }
  };

  return (
    <div>
      <div className="p-4 max-w-lg mx-auto mt-10 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-center">Car Slot Booking</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Enter User Name"
            value={formData.username}
            className="w-full p-2 border rounded mb-2"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="carNumber"
            placeholder="Enter Car Number"
            value={formData.carNumber}
            className="w-full p-2 border rounded mb-2"
            onChange={handleChange}
            required
          />
          <input
            type="datetime-local"
            name="dateTime" // Fixed key name
            value={formData.dateTime}
            className="w-full p-2 border rounded mb-2"
            onChange={handleChange}
            required
          />
          <button
            className="font-bold bg-blue-500 border-3 border-white text-white p-2 rounded-2xl w-full hover:bg-white hover:text-blue-500 hover:border-3 hover:border-blue-500"
            type="submit"
          >
            Book Slot
          </button>
        </form>
        {message && <p className="text-green-500 mt-2">{message}</p>}
      </div>
    </div>
  );
};

export default SlotBook;
