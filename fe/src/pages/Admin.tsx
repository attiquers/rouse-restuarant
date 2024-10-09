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

      <div className="w-96  px-14 text-4xl flex flex-col gap-4 ">
        <Link
          to={"orders"}
          className="w-full px-4 py-2  rounded-lg border-2 border-secondaryColor text-secondaryColor active:bg-secondaryColor active:text-primary transition-all"
        >
          See Orders
        </Link>
        <Link
          to={"menu"}
          className="w-full px-4 py-2  rounded-lg border-2 border-secondaryColor text-secondaryColor active:bg-secondaryColor active:text-primary transition-all"
        >
          Update Menu
        </Link>
      </div>
    </div>
  );
};

export default Admin;
