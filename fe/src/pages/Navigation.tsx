import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);

  return (
    <div>
      {/* Menu Icon */}
      <div
        className="absolute right-10 top-10 z-20 cursor-pointer"
        onClick={toggleNavbar}
      >
        <Menu className="text-[#FDC90A] w-10 h-10" />
      </div>

      {/* Navbar */}
      <div
        className={`z-[20] fixed top-0 left-0 w-full h-full bg-[#d4a808] transition-transform duration-300 ease-in-out z-10 ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div
          className="absolute top-10 right-10 z-20 cursor-pointer"
          onClick={toggleNavbar}
        >
          <X className="text-background w-10 h-10 " />
        </div>
        <div className="flex h-full justify-between p-10">
          <ul className="flex flex-col pt-24 text-8xl text-background font-extrabold h-full space-y-8">
            <li>
              <div className=" ">
                <img
                  src="/line.svg"
                  className=" absolute z-[-10] w-40 -mt-8"
                  alt=""
                />
              </div>
              <a
                href="#home"
                className="block bg-[#d4a808] hover:translate-x-20 transition-transform duration-300"
              >
                Home
              </a>
            </li>
            <li className="flex ">
              <div className=" ">
                <img
                  src="/line.svg"
                  className=" absolute z-[-10] w-40 -mt-8"
                  alt=""
                />
              </div>
              <a
                href="#about"
                className="block bg-[#d4a808] hover:translate-x-20 transition-transform duration-300"
              >
                About
              </a>
            </li>
            <li>
              <div className=" ">
                <img
                  src="/line.svg"
                  className=" absolute z-[-10] w-40 -mt-8"
                  alt=""
                />
              </div>
              <a
                href="#services"
                className="block bg-[#d4a808] hover:translate-x-20 transition-transform duration-300"
              >
                Services
              </a>
            </li>
            <li>
              <div className=" ">
                <img
                  src="/line.svg"
                  className=" absolute z-[-10] w-40 -mt-8"
                  alt=""
                />
              </div>
              <a
                href="#contact"
                className="block bg-[#d4a808] hover:translate-x-20 transition-transform duration-300"
              >
                Contact
              </a>
            </li>
          </ul>
          <div className="h-full flex place-content-center">
            <img src="/logo.svg" className="w-96 aspect-auto" alt="Logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
