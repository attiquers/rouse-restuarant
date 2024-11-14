import { Loader2 } from "lucide-react";
import React, { useState } from "react";

const TrackOrder = () => {
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState([]); // State to hold fetched orders
  const [customText, setCustomText] = useState(""); // State for custom text input
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const [loading, setLoading] = useState(false);

  // const BACKEND_URI = "http://localhost:5000/api";
  const BACKEND_URI = "https://rouse-be.vercel.app/api";

  document.title = "Track Order";

  const handleTrackOrder = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${BACKEND_URI}/ordersByEmail?email=${encodeURIComponent(
          email
        )}&customText=${encodeURIComponent(customText)}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      let ordersData = await response.json();

      // Sort orders by orderDate in descending order (most recent date and time first)
      ordersData = ordersData.sort(
        (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
      );

      setOrders(ordersData); // Set the sorted orders to state
      setErrorMessage(""); // Clear any previous error messages
      setLoading(false); // Stop loading if there are no items
    } catch (error) {
      setLoading(false); // Stop loading if there are no items

      setErrorMessage(error.message);
      console.log(error);
      setOrders([]); // Clear orders in case of an error
    }
  };

  const formatOrderItems = (items) => {
    return items
      .map((item) => `${item.quantity}x ${item.itemName}`)
      .join(", ")
      .replace(/,(?=[^,]*$)/, " and"); // Replace the last comma with " and"
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return date.toLocaleDateString("en-CA", options).replace(/-/g, "/"); // YYYY/MM/DD format
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }); // HH:MM AM/PM format
  };

  return (
    <div>
      <div className="pb-0 p-6 sm:p-14 ">
        <div className="flex gap-5 items-center">
          <div>
            <img src="/vite.svg" alt="Vite" className="w-12 h-12" />
          </div>
          <div className="text-2xl text-white">ROUSE's</div>
        </div>
        <div className="text-4xl sm:text-7xl text-secondaryColor font-bold">
          Track Order
        </div>
      </div>
      <div className="flex flex-col place-content-center sm:flex-row gap-5 p-6">
        <div className="w-full sm:w-1/2">
          <label htmlFor="email" className="block text-white mb-2 text-3xl">
            Enter email to view your order(s) status:
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 p-2 border border-gray-300 rounded text-white"
            placeholder="Enter your email"
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={handleTrackOrder}
              className="bg-secondaryColor text-background min-w-32 py-2 px-4 rounded hover:bg-secondaryHover"
            >
              {loading ? (
                <div className="w-full h-fit flex  place-content-center">
                  <Loader2 className="animate-spin text-white  " />
                </div>
              ) : (
                "Track Order"
              )}
            </button>
          </div>
          {errorMessage && (
            <div className="text-red-500 mt-2">{errorMessage}</div>
          )}
        </div>
      </div>
      {orders.length > 0 && (
        <div className="mt-6 mb-4 px-20">
          <h3 className="text-3xl text-white mb-4">Your Orders:</h3>
          <table className="min-w-full bg-white text-gray-800 border border-gray-300">
            <thead>
              <tr className="bg-secondaryColor text-white">
                <th className="py-2 px-4 border border-gray-300">Name</th>
                <th className="py-2 px-4 border border-gray-300">
                  Order Items
                </th>
                <th className="py-2 px-4 border border-gray-300">Order Date</th>
                <th className="py-2 px-4 border border-gray-300">Order Time</th>
                <th className="py-2 px-4 border border-gray-300">Status</th>
                <th className="py-2 px-4 border border-gray-300">
                  Status Info
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border border-gray-300">
                    {order.customerName || "N/A"}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {formatOrderItems(order.orderItems)}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {formatDate(order.orderDate)}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {formatTime(order.orderDate)}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {order.status || "N/A"}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {order.statusInfo || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;
