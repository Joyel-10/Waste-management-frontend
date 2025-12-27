
import React, { useState, useEffect } from "react";
import AppSidebar from "../Components/AppSideBar";
import { schedulePickupAPI, reschedulePickupAPI, getPickupAPI, } from "../../Service/allAPI";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';

const Schedule = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const pickupFromState = location.state?.pickup || null;

  const wastePrices = {
    "Organic Waste": 150,
    "Plastic": 250,
    "Electronic Waste": 200,
  };

  const [date, setDate] = useState(pickupFromState?.date?.split("T")[0] || "");
  const [time, setTime] = useState(pickupFromState?.time || "");
  const [wasteType, setWasteType] = useState(
    pickupFromState?.wasteType || "Organic Waste"
  );
  const [price, setPrice] = useState(
    wastePrices[pickupFromState?.wasteType] || 150
  );

  const [paymentMethod, setPaymentMethod] = useState("Cash on Pickup");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const [loading, setLoading] = useState(true);
  const [scheduledPickup, setScheduledPickup] = useState(null);

  const stored =
    sessionStorage.getItem("existingUser") ||
    sessionStorage.getItem("user");
  const parsedUser = stored ? JSON.parse(stored) : null;
  const userId =
    parsedUser?._id || parsedUser?.id || sessionStorage.getItem("userId");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  useEffect(() => {
    setPrice(wastePrices[wasteType]);
  }, [wasteType]);

  const fetchScheduledPickup = async () => {
    try {
      const result = await getPickupAPI(userId);

      if (result.data.pickup) {
        setScheduledPickup(result.data.pickup);
      } else {
        setScheduledPickup(null);
      }
    } catch {
      setScheduledPickup(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScheduledPickup();
  }, [userId]);

  const handleSchedule = async (e) => {
    e.preventDefault();

    if (paymentMethod === "UPI" && !upiId) return alert("Enter UPI ID");
    if (
      paymentMethod === "Card" &&
      (!cardNumber || !expiry || !cvv)
    )
      return alert("Enter card details");

    const paymentStatus =
      paymentMethod === "Cash on Pickup" ? "Pending" : "Settled";

    const transactionId =
      paymentMethod === "Cash on Pickup"
        ? null
        : "DUMMY-" + Math.floor(100000 + Math.random() * 900000);

    const reqBody = {
      userId,
      date,
      time,
      wasteType,
      price,
      paymentMethod,
      paymentStatus,
      transactionId,
      paymentDetails: {
        upiId: paymentMethod === "UPI" ? upiId : null,
        cardLast4: paymentMethod === "Card" ? cardNumber.slice(-4) : null,
      },
    };

    try {
      let result;

      if (pickupFromState || scheduledPickup) {
        result = await reschedulePickupAPI(reqBody);
        alert(
          paymentMethod === "Cash on Pickup"
            ? "Pickup rescheduled (payment pending)"
            : "Pickup rescheduled and payment marked settled"
        );
      } else {
        result = await schedulePickupAPI(reqBody);
        alert(
          paymentMethod === "Cash on Pickup"
            ? "Pickup scheduled (payment pending)"
            : "Pickup scheduled and payment marked settled"
        );
      }

      navigate("/pickup-history");
    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Error scheduling/rescheduling pickup"
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pb-20">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-semibold text-gray-700">
            Loading...
          </p>
        </div>

        <AppSidebar />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pb-20">
      {/* Center Content */}
      <div className="flex justify-center items-start p-4 md:p-10">
        <div className="w-full max-w-2xl bg-white shadow-2xl rounded-3xl p-8 sm:p-12 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">

            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              {pickupFromState || scheduledPickup
                ? "Reschedule Pickup"
                : "Schedule Pickup"}
            </h1>
            <p className="text-gray-600">
              Plan your waste collection with ease
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSchedule} className="space-y-6">
            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-semibold text-gray-700 flex items-center gap-2">
                  <span className="text-xl"></span> Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all bg-gray-50 hover:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700 flex items-center gap-2">
                  <span className="text-xl"></span> Time
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all bg-gray-50 hover:bg-white"
                  required
                />
              </div>
            </div>

            {/* Waste Type */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700 flex items-center gap-2">
                <span className="text-xl"></span> Waste Type
              </label>
              <select
                value={wasteType}
                onChange={(e) => setWasteType(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 bg-gray-50 hover:bg-white cursor-pointer"
                required
              >
                <option>Organic Waste</option>
                <option>Plastic</option>
                <option>Electronic Waste</option>
              </select>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700 text-lg">
                  Pickup Charge:
                </span>
                <span className="text-3xl font-bold text-green-600">
                  ₹{price}
                </span>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block mb-3 font-semibold text-gray-700 flex items-center gap-2">
                Payment Method
              </label>

              <div className="space-y-3">
                {/* UPI */}
                <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="UPI"
                    checked={paymentMethod === "UPI"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5"
                  />
                  <span className="text-2xl"></span>
                  <span className="font-medium text-gray-800">
                    UPI Payment
                  </span>
                </label>

                {/* Card */}
                <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="Card"
                    checked={paymentMethod === "Card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5"
                  />
                  <span className="text-2xl"></span>
                  <span className="font-medium text-gray-800">
                    Credit/Debit Card
                  </span>
                </label>

                {/* Cash */}
                <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="Cash on Pickup"
                    checked={paymentMethod === "Cash on Pickup"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5"
                  />
                  <span className="text-2xl"></span>
                  <span className="font-medium text-gray-800">
                    Cash on Pickup
                  </span>
                </label>
              </div>
            </div>

            {/* UPI Input */}
            {paymentMethod === "UPI" && (
              <div className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-200 animate-fadeIn">
                <label className="block mb-2 font-semibold text-gray-700">
                  UPI ID
                </label>
                <input
                  type="text"
                  placeholder="example@upi"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full border-2 border-blue-300 rounded-xl p-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  required
                />
              </div>
            )}

            {/* Card Input */}
            {paymentMethod === "Card" && (
              <div className="bg-indigo-50 p-6 rounded-2xl border-2 border-indigo-200 space-y-4 animate-fadeIn">
                <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full border-2 border-indigo-300 rounded-xl p-3"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="w-full border-2 border-indigo-300 rounded-xl p-3"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      className="w-full border-2 border-indigo-300 rounded-xl p-3"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full ${pickupFromState || scheduledPickup
                ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                : "bg-gradient-to-r from-blue-600 to-indigo-600"
                } text-white py-4 rounded-xl font-bold text-lg shadow-lg transition-all`}
            >
              {pickupFromState || scheduledPickup
                ? " Reschedule Pickup"
                : "✓ Schedule Pickup"}
            </button>
          </form>
        </div>
      </div>

      <AppSidebar />
    </div>
  );
};

export default Schedule;
