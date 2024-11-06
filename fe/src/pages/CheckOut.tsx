import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import axios from "axios"; // Import axios

// interface Item {
//   name: string;
//   price: number; // Adjusting price to be a number for calculations
// }

// interface Category {
//   category: string;
//   icon: string;
//   items: Item[];
// }

interface OrderItem {
  itemName: string;
  quantity: number;
  price: number;
}

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  note?: string; // Note can be optional
}

const CheckOut: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(false);
  const BACKEND_URI = "https://rouse-be.vercel.app/api"; // API for menu items

  useEffect(() => {
    const savedItems = localStorage.getItem("selectedItems");
    if (savedItems) {
      setSelectedItems(JSON.parse(savedItems));
    }
  }, []);

  // Calculate the total price
  const totalPrice = selectedItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleSubmitOrder = async (customerInfo: CustomerInfo) => {
    const orderItems = selectedItems.map((item) => ({
      itemName: item.itemName,
      quantity: item.quantity,
      price: item.price,
    }));

    const order = {
      customerName: customerInfo.name,
      customerEmail: customerInfo.email,
      orderItems,
      totalAmount: totalPrice,
      status: "Awaiting Confirmation",
      statusInfo: "We will call you for order confirmation shortly.",
    };

    try {
      const response = await axios.post(`${BACKEND_URI}/orders`, order);

      setLoading(false);
      console.log(`Order submitted successfully: ${response.data.orderId}`);
      localStorage.setItem("selectedItems", "");
      localStorage.setItem("customerName", customerInfo.name); // Save customer name in local storage
      window.location.href = "/success";
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Error submitting order. Please try again.";
      alert(errorMessage);
      console.error(error);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    setLoading(true);
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const customerInfo: CustomerInfo = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      note: (formData.get("note") as string) || undefined, // Ensure note can be optional
    };

    // Basic validation
    if (!customerInfo.name || !customerInfo.email) {
      alert("Name and email are required.");
      setLoading(false); // Stop loading if validation fails
      return;
    }

    // Check if there are selected items before submitting the order
    if (selectedItems.length === 0) {
      alert(
        "No items selected. Please add items to your order before proceeding."
      );
      setLoading(false); // Stop loading if there are no items
      return;
    }

    // Call the order submission function
    await handleSubmitOrder(customerInfo);
  };

  return (
    <div className="min-h-screen pb-6">
      {/* Header */}
      <div className="p-6 pb-6 sm:p-14 text-white">
        <div className="flex gap-5 items-center">
          <img src="/vite.svg" alt="Vite" className="w-12 h-12" />
          <h1 className="text-2xl">ROUSE's</h1>
        </div>
        <h2 className="text-4xl sm:text-7xl text-secondaryColor font-bold">
          Check Out
        </h2>
      </div>

      {/* Main Content */}
      <div className="flex flex-col-reverse sm:flex-row justify-between gap-6 px-6 sm:px-14">
        {/* Customer Information Section */}
        <div className="w-full sm:w-2/3 mr-4 bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Customer Information</h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="border border-gray-300 p-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-secondaryColor transition"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border border-gray-300 p-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-secondaryColor transition"
              required
            />
            <input
              type="number"
              name="phone"
              placeholder="Phone"
              className="border border-gray-300 p-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-secondaryColor transition"
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              className="border border-gray-300 p-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-secondaryColor transition"
              required
            />
            <textarea
              name="note"
              placeholder="Extra Note"
              className="border border-gray-300 p-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-secondaryColor transition"
              rows={3}
            />
            {/* Submit Button */}
            <button
              type="submit"
              className="mt-4 bg-secondaryColor text-primary py-2 rounded hover:bg-opacity-80 transition"
            >
              {loading ? (
                <div className="w-full h-fit flex  place-content-center">
                  <Loader2 className="animate-spin text-white  " />
                </div>
              ) : (
                "Submit Order"
              )}
            </button>
          </form>
        </div>

        {/* Order Summary Section */}
        <div className="w-full sm:w-1/3 min-w-[300px] bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Order Summary</h1>
          {selectedItems.length === 0 ? (
            <div>No items in your order.</div>
          ) : (
            <div>
              <ul className="mb-4">
                {selectedItems.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between mb-2 border-b py-2"
                  >
                    <span>{item.itemName}</span>
                    <span>{`$${item.price.toFixed(2)} (x${item.quantity}) = $${(
                      item.price * item.quantity
                    ).toFixed(2)}`}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 text-xl font-semibold">
                Total Price:{" "}
                <span className="text-green-600">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
