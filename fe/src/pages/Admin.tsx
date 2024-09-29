import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <div>
      <div className="p-6 sm:p-14">
        <div className="flex gap-5 items-center">
          <div>
            <img src="/vite.svg" alt="Vite" className="w-12 h-12" />
          </div>
          <div className="text-2xl text-white">ROUSE's</div>
        </div>
        <div className="text-4xl sm:text-7xl text-secondaryColor font-bold">
          Amin Controls
        </div>
      </div>

      <div className="w-full px-14 text-4xl flex flex-col ">
        <Link
          to={"menu"}
          className="w-1/2 h-1/3 pb-2 hover:text-secondaryColor"
        >
          Update Menu
        </Link>
        <Link to={"orders"} className="w-1/2 h-1/3 hover:text-secondaryColor">
          See Orders
        </Link>
      </div>
    </div>
  );
};

export default Admin;
