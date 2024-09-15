const menuData = [
  {
    category: "coffee",
    icon: "/coffee.svg",
    items: [
      { name: "Espresso", price: "5$" },
      { name: "Cappuccino", price: "6$" },
      { name: "Latte", price: "7$" },
      { name: "Americano", price: "5.5$" },
      { name: "Mocha", price: "7.5$" },
    ],
  },
  {
    category: "tea",
    icon: "/tea.svg",
    items: [
      { name: "Green Tea", price: "3$" },
      { name: "Black Tea", price: "2.5$" },
      { name: "Chai", price: "4$" },
      { name: "Herbal Tea", price: "3.5$" },
      { name: "Oolong Tea", price: "4.5$" },
      { name: "Matcha", price: "5$" },
      { name: "White Tea", price: "4.5$" },
      { name: "Earl Grey", price: "3.8$" },
    ],
  },
  {
    category: "sandwiches",
    icon: "/sandwich.svg",
    items: [
      { name: "Turkey Sandwich", price: "8$" },
      { name: "Ham Sandwich", price: "7.5$" },
      { name: "Veggie Sandwich", price: "7$" },
      { name: "Club Sandwich", price: "8.5$" },
    ],
  },
  {
    category: "pastries",
    icon: "/pastry.svg",
    items: [
      { name: "Croissant", price: "3$" },
      { name: "Muffin", price: "3.5$" },
      { name: "Danish", price: "4$" },
    ],
  },
  {
    category: "juices",
    icon: "/juice.svg",
    items: [
      { name: "Orange Juice", price: "4$" },
      { name: "Apple Juice", price: "4.5$" },
      { name: "Grape Juice", price: "5$" },
    ],
  },
];

const Menu = () => {
  return (
    <div className="">
      {/* Header */}
      <div className="p-14 ">
        <div className="flex gap-5 items-center">
          <div>
            <img src="/vite.svg" alt="Vite" />
          </div>
          <div className="text-2xl text-white">ROUSE's</div>
        </div>
        <div className="text-7xl text-secondaryColor font-bold">Menu</div>
      </div>

      {/* Menu Categories */}
      <div>
        {menuData.map((category, index) => (
          <div key={index} className="h-auto w-full px-14 mb-10">
            {/* Category Header */}
            <div className="flex items-center gap-2">
              {/* <div className="w-8 h-8">
                <img
                  src={category.icon}
                  alt={category.category}
                  className="w-full h-full"
                />
              </div> */}
              <div className="text-secondaryColor text-4xl font-categoryFont font-extrabold">
                {category.category.toUpperCase()}
              </div>
            </div>
            {/* Category Items */}
            <div className="pl-10 pr-5 flex flex-wrap justify-between w-full h-auto border-t-2 border-secondaryColor mt-2 pt-2">
              {category.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex text-2xl text-white w-2/5 justify-between mb-4"
                >
                  <div>{item.name}</div>
                  <div>{item.price}</div>
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
