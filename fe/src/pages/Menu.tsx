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

const Menu: React.FC = () => {
  const [menuData, setMenuData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return <div className="text-white text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-white text-center">Error: {error}</div>;
  }

  return (
    <div>
      {/* Header */}
      <div className="p-6 sm:p-14">
        <div className="flex gap-5 items-center">
          <div>
            <img src="/vite.svg" alt="Vite" className="w-12 h-12" />
          </div>
          <div className="text-2xl text-white">ROUSE's</div>
        </div>
        <div className="text-4xl sm:text-7xl text-secondaryColor font-bold">
          Menu
        </div>
      </div>

      {/* Menu Categories */}
      <div>
        {menuData.map((category, index) => (
          <div key={index} className="h-auto w-full px-6 sm:px-14 mb-10">
            {/* Category Header */}
            <div className="flex items-center gap-2">
              {/* Uncomment if icon images are available */}
              {/* <div className="w-8 h-8">
                <img
                  src={category.icon}
                  alt={category.category}
                  className="w-full h-full"
                />
              </div> */}
              <div className="text-secondaryColor text-2xl sm:text-4xl font-categoryFont font-extrabold">
                {category.category.toUpperCase()}
              </div>
            </div>
            {/* Category Items */}
            <div className="pl-0 sm:pl-10 pr-0 sm:pr-5 flex flex-wrap justify-start sm:justify-between w-full h-auto border-t-2 border-secondaryColor mt-2 pt-2">
              {category.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex text-lg sm:text-2xl text-white w-full sm:w-2/5 justify-between mb-4"
                >
                  <div>{item.name}</div>
                  <div className="w-20 text-right">${item.price}</div>{" "}
                  {/* Ensure $ is directly before the price */}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
