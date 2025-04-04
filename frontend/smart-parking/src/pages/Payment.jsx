import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const UPIPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state?.userData;

  useEffect(() => {
    if (!userData) {
      navigate("/"); // Redirect to home if data missing
    }
  }, [userData, navigate]);

  const handleFakePayment = () => {
    setTimeout(() => {
      alert("Payment Successful ✅");
      navigate("/");
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white shadow-lg p-6 rounded-xl text-center">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">UPI Payment</h2>
      <p className="text-gray-600 mb-4">Pay ₹50 to confirm your slot.</p>
      <div className="bg-gray-100 p-4 mb-4 rounded">
        <p className="text-sm font-semibold">UPI ID:</p>
        <p className="text-lg font-mono text-gray-800">bookings@upi</p>
      </div>
      <button
        onClick={handleFakePayment}
        className="bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700 transition"
      >
        Pay Now
      </button>
    </div>
  );
};

export default UPIPayment;
