import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Success = () => {
  const [customerName, setCustomerName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("customerName");
    if (name) {
      setCustomerName(name);
    }
  }, []);

  return (
    <div className="flex w-screen h-screen place-content-center place-items-center">
      <div className="px-4 w-2/3 h-2/3 bg-[#9088d4] flex flex-col place-content-center place-items-center">
        <div className=" h-1/5 w-full flex place-content-center place-items-center ">
          <Check className="w-fit h-full p-6 border-secondaryColor border-4  text-secondaryColor rounded-full" />
        </div>
        <div className="mt-6 mb-4 text-xl">Hey {customerName}, </div>
        <div>
          <div className="text-3xl font-bold text-center">
            Your Order is placed{" "}
          </div>
          <div className="mt-2 text-center">
            We will call you shortly, to confirm your order.
          </div>
        </div>
        <div className="mt-8">
          <Link
            to="/trackorder"
            className="text-xl px-4 py-2 bg-secondaryColor active:opacity-80 rounded-lg"
          >
            Track Order
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
