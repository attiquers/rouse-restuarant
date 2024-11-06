import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

// Modal Component for showing ordered items and the note
const OrderItemsModal = ({ show, handleClose, orderItems, note }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Ordered Items</h2>

        {/* Display the note if available */}
        {note && (
          <div className="mb-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-gray-800">
            <p>
              <strong>Note:</strong> {note}
            </p>
          </div>
        )}

        <ul className="space-y-2">
          {orderItems.map((item, index) => (
            <li key={index} className="flex justify-between">
              <span>{item.itemName}</span>
              <span>
                {item.quantity} x ${item.price.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
        <button
          onClick={handleClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

// Modal Component for editing order status
const EditOrderModal = ({ show, handleClose, order, handleUpdate }) => {
  const [status, setStatus] = useState("");
  const [statusInfo, setStatusInfo] = useState("");

  const statusOptions = {
    "Awaiting confirmation": "We will call you for order confirmation shortly.",
    "Order Cooking": "We are cooking your order now.",
    "Order On Delivery": "Our rider is on route to deliver your order.",
    Delivered: "Order delivered to you successfully.",
    "Not Delivered": "Order was not delivered.",
  };

  useEffect(() => {
    if (order) {
      setStatus(order.status);
      setStatusInfo(order.statusInfo);
    }
  }, [order]);

  const handleStatusChange = (e) => {
    const selectedStatus = e.target.value;
    setStatus(selectedStatus);
    setStatusInfo(statusOptions[selectedStatus] || ""); // Set status info based on selected status
  };

  const handleSubmit = () => {
    handleUpdate(order._id, { status, statusInfo });
    handleClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Edit Order Status</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            value={status}
            onChange={handleStatusChange}
            className="border bg-white border-gray-300 rounded w-full p-2"
          >
            <option value="">Select Status</option>
            {Object.keys(statusOptions).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Status Info</label>
          <input
            type="text"
            value={statusInfo}
            onChange={(e) => setStatusInfo(e.target.value)} // Allow custom input
            className="border bg-white border-gray-300 rounded w-full p-2"
            placeholder="Enter custom status info..."
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
          >
            Update
          </button>
          <button
            onClick={handleClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Orders Component
const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // const BACKEND_URI = "http://localhost:5000/api";
  const BACKEND_URI = "https://rouse-be.vercel.app/api";

  // Fetch all orders when the component loads
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${BACKEND_URI}/orders`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch orders");
        }

        // Sort orders by date and time, latest first
        const sortedOrders = data.sort((a, b) => {
          const dateA = new Date(a.orderDate).getTime();
          const dateB = new Date(b.orderDate).getTime();
          return dateB - dateA; // Sort in descending order
        });

        setOrders(sortedOrders); // Set the fetched and sorted orders to state
        setLoading(false);
      } catch (err) {
        setError(err.message); // Set error message in case of failure
      }
    };

    fetchOrders();
  }, []);

  // Function to open modal and show ordered items and note
  const handleShowItems = (items, note) => {
    setSelectedItems(items);
    setSelectedOrder({ ...selectedOrder, note });
    setShowModal(true);
  };

  // Function to close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItems([]);
  };

  // Function to open edit modal
  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setShowEditModal(true);
  };

  // Function to close edit modal
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedOrder(null);
  };

  // Function to update order status and info
  const handleUpdateOrder = async (orderId, updatedData) => {
    try {
      const response = await fetch(`${BACKEND_URI}/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to update order");
      }

      // Refresh the orders list
      const updatedOrder = await response.json();
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? updatedOrder : order
        )
      );
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="bg-gray-200 p-6">
      <h1 className="text-4xl text-center font-bold mb-6">All Orders</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center h-screen w-screen">
          <Loader2 className="animate-spin text-secondaryColor w-20 h-20" />
        </div>
      ) : (
        ""
      )}
      <div className="overflow-x-auto overflow-y-auto h-screen">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Order Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Order Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                View Items
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {orders.map((order) => (
              <tr key={order._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-800">{order.name}</td>
                <td className="px-6 py-4 text-gray-800">{order.email}</td>
                <td className="px-6 py-4 text-gray-800">{order.orderTime}</td>
                <td className="px-6 py-4 text-gray-800">{order.orderDate}</td>
                <td className="px-6 py-4 text-gray-800">{order.status}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() =>
                      handleShowItems(order.orderItems, order.note)
                    }
                    className="text-blue-600 hover:underline"
                  >
                    View Items
                  </button>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleEditOrder(order)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Show Order Items Modal */}
      <OrderItemsModal
        show={showModal}
        handleClose={handleCloseModal}
        orderItems={selectedItems}
        note={selectedOrder?.note}
      />

      {/* Edit Order Status Modal */}
      <EditOrderModal
        show={showEditModal}
        handleClose={handleCloseEditModal}
        order={selectedOrder}
        handleUpdate={handleUpdateOrder}
      />
    </div>
  );
};

export default AdminOrders;
