import React, { useState, useEffect } from "react";

interface Item {
  name: string;
  price: string;
}

interface Category {
  category: string;
  icon: string;
  items: Item[];
}

interface SelectedItem {
  name: string;
  quantity: number;
}

const Order: React.FC = () => {
  const [menuData, setMenuData] = useState<Category[]>([]);
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [extraNote, setExtraNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  // const BACKEND_URI = "http://localhost:5000/api/menu";
  const BACKEND_URI = "https://rouse-be.vercel.app/api/menu";

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch(BACKEND_URI);
        if (!response.ok) {
          throw new Error("Failed to fetch menu data");
        }
        const data: Category[] = await response.json();
        setMenuData(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  const handleItemChange = (itemName: string, checked: boolean) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [itemName]: checked,
    }));

    if (checked) {
      setSelectedItems((prevSelectedItems) => {
        const existingItem = prevSelectedItems.find(
          (item) => item.name === itemName
        );
        if (!existingItem) {
          return [...prevSelectedItems, { name: itemName, quantity: 1 }];
        }
        return prevSelectedItems;
      });
    } else {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((item) => item.name !== itemName)
      );
    }
  };

  const handleQuantityChange = (itemName: string, quantity: number) => {
    if (checkedItems[itemName]) {
      setSelectedItems((prevSelectedItems) => {
        const updatedItems = prevSelectedItems.map((item) =>
          item.name === itemName ? { ...item, quantity } : item
        );
        return updatedItems;
      });
    }
  };

  if (loading) {
    return <div className="text-white text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-white text-center">Error: {error}</div>;
  }

  return (
    <div>
      {/* Header */}
      <div className="pb-0 p-6 sm:p-14 ">
        <div className="flex gap-5 items-center">
          <div>
            <img src="/vite.svg" alt="Vite" className="w-12 h-12" />
          </div>
          <div className="text-2xl text-white">ROUSE's</div>
        </div>
        <div className="text-4xl sm:text-7xl text-secondaryColor font-bold">
          Order
        </div>
      </div>
      {/* Extra Notes */}
      <div className="p-4 sm:p-14 sm:pt-0">
        <label className="block sm:text-2xl text-xl font-bold text-secondaryColor">
          Extra Note:
        </label>
        <textarea
          className="w-full h-24 text-black p-2 bg-[#a09add] placeholder-black"
          value={extraNote}
          onChange={(e) => setExtraNote(e.target.value)}
          placeholder="Any additional requests?"
        />
      </div>

      {/* Menu Categories */}
      <div>
        {menuData.map((category, index) => (
          <div key={index} className="h-auto w-full px-6 sm:px-14 mb-10">
            {/* Category Header */}
            <div className="flex items-center gap-2">
              <div className="text-secondaryColor text-2xl sm:text-4xl font-categoryFont font-extrabold">
                {category.category.toUpperCase()}
              </div>
            </div>
            {/* Category Items */}
            <div className="pl-0 sm:pl-10 pr-0 sm:pr-5 flex flex-wrap justify-start sm:justify-between w-full h-auto border-t-2 border-secondaryColor mt-2 pt-2">
              {category.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center text-lg sm:text-2xl text-white w-full sm:w-2/5 justify-between mb-4"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="w-8 aspect-square"
                      checked={!!checkedItems[item.name]}
                      onChange={(e) =>
                        handleItemChange(item.name, e.target.checked)
                      }
                    />
                    <div
                      onClick={() =>
                        handleItemChange(item.name, !checkedItems[item.name])
                      }
                      className="cursor-pointer"
                    >
                      {item.name}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      className="w-20 text-black p-2 bg-[#a09add] "
                      min="1"
                      defaultValue="1"
                      onChange={(e) =>
                        handleQuantityChange(
                          item.name,
                          parseInt(e.target.value)
                        )
                      }
                      disabled={!checkedItems[item.name]}
                    />
                    <div className="w-20 text-left">${item.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="sticky bottom-0 left-0 w-full bg-[#d4a808] p-4">
        <h3 className="text-primary text-xl font-bold">Order Summary</h3>
        {selectedItems.length > 0 ? (
          <div className="text-primary">
            {selectedItems.map((item, idx) => (
              <div key={idx}>
                {item.quantity}x {item.name}
              </div>
            ))}
            {extraNote && <div className="mt-2">Note: {extraNote}</div>}
            <div className="mt-4">
              <button className="bg-blue-500 text-white py-2 px-4 rounded">
                Place Order
              </button>
            </div>
          </div>
        ) : (
          <div className="text-white">No items selected</div>
        )}
      </div>
    </div>
  );
};

export default Order;
