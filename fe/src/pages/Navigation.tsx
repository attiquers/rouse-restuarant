import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

// interface OrderItem {
//   itemName: string;
//   quantity: number;
//   price: number;
// }

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const [selectedItems, setSelectedItems] = useState<OrderItem[]>([]);

  // useEffect(() => {
  //   const savedItems = localStorage.getItem("selectedItems");
  //   if (savedItems) {
  //     setSelectedItems(JSON.parse(savedItems));
  //   }
  //   console.log(selectedItems);
  // }, []);

  const toggleNavbar = () => setIsOpen(!isOpen);

  const closeNavbar = () => setIsOpen(false);

  return (
    <div>
      {/* {selectedItems.length ? <div>meow</div> : <div></div>} */}

      {/* Menu Icon */}
      <div
        className="absolute right-10 top-10 z-20 cursor-pointer"
        onClick={toggleNavbar}
      >
        <Menu className="text-[#FDC90A] w-10 h-10" />
      </div>

      {/* Navbar */}
      <div
        className={`z-[20] fixed top-0 left-0 w-full h-full bg-[#d4a808] transition-transform duration-1000 ease-in-out ${
          isOpen ? "translate-y-0" : "-translate-y-[120%]"
        }`}
      >
        <div
          className="absolute top-10 right-10 z-20 cursor-pointer"
          onClick={toggleNavbar}
        >
          <X className="text-background w-10 h-10 " />
        </div>
        <div className="flex h-full justify-between p-10">
          <ul className="flex flex-col pt-24 text-5xl md:text-7xl text-background font-extrabold h-full space-y-8">
            <li>
              <div className="relative">
                <img
                  src="/line.svg"
                  className="absolute z-[-10] w-40 -mt-12 md:-mt-10"
                  alt=""
                />
              </div>
              <Link
                to="/"
                className="block bg-[#d4a808] hover:translate-x-20 transition-transform duration-300"
                onClick={closeNavbar}
              >
                Home
              </Link>
            </li>

            <li>
              <div className="relative">
                <img
                  src="/line.svg"
                  className="absolute z-[-10] w-40 -mt-12 md:-mt-10"
                  alt=""
                />
              </div>
              <Link
                to="Menu"
                className="block bg-[#d4a808] hover:translate-x-20 transition-transform duration-300"
                onClick={closeNavbar}
              >
                Menu
              </Link>
            </li>
            <li>
              <div className="relative">
                <img
                  src="/line.svg"
                  className="absolute z-[-10] w-40 -mt-12 md:-mt-10"
                  alt=""
                />
              </div>
              <Link
                to="trackorder"
                className="block bg-[#d4a808] hover:translate-x-20 transition-transform duration-300"
                onClick={closeNavbar}
              >
                Track Order
              </Link>
            </li>
            <li>
              <div className="relative">
                <img
                  src="/line.svg"
                  className="absolute z-[-10] w-40 -mt-12 md:-mt-10"
                  alt=""
                />
              </div>
              <Link
                to="contact"
                className="block bg-[#d4a808] hover:translate-x-20 transition-transform duration-300"
                onClick={closeNavbar}
              >
                Contact
              </Link>
            </li>
            <li>
              <div className="relative">
                <img
                  src="/line.svg"
                  className="absolute z-[-10] w-40 -mt-12 md:-mt-10"
                  alt=""
                />
              </div>
              <Link
                to="admin"
                className="block bg-[#d4a808] hover:translate-x-20 transition-transform duration-300"
                onClick={closeNavbar}
              >
                Admin Controls
              </Link>
            </li>
          </ul>
          <div className="h-full place-content-center hidden md:flex">
            <img src="/vite.svg" className="w-96 aspect-auto" alt="Logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
