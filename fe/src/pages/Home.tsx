import { Link } from "react-router-dom";
import { PrimaryButton, SecondaryButton } from "./components/button";
import ReviewCarousel from "./components/reviewsHOME";
const Home = () => {
  return (
    <div className="pt-32">
      {/* hero */}
      <div className="pb-20 min-h-[70svh] pt-20 md:pt-0">
        <div className="text-white text-center">
          <div className="text-4xl font-bold ">Wyoming's Tastiest</div>
          <div className="text-[5rem] md:text-[10rem] leading-3 pt-8 md:pt-16 pb-8 font-bold">
            BURGER
          </div>
        </div>
        <div className="flex place-content-center pb-">
          <img src="/burger.webp" alt="burger" className="w-3/4" />
        </div>
      </div>

      {/* find us */}
      <div className="md:px-20 flex-col md:flex-row  bg-white gap-4 md:gap-10 text-2xl font-bold text-background flex place-content-center items-center py-6 md:py-10">
        <div className="w-full md:w-auto  text-center">
          Find Rouse Restaurant
        </div>
        <div>
          <SecondaryButton name="Locations" link="contact" local={true} />
        </div>
      </div>

      {/* order */}
      <div className="min-h-screen  flex flex-col md:flex-row  md:gap-0">
        <div className="h-1/2 md:h-full md:w-1/2 overflow-hidden ">
          <img
            src="/showBurger.webp"
            className="w-full object-top object-cover "
            alt=""
          />
        </div>
        <div className="h-1/2 pb-4 md:h-auto md:w-1/2 flex flex-col place-content-center items-center text-white">
          <div className="pt-5 w-4/6 text-center text-5xl md:text-7xl font-bold ">
            Crafted for Cravings
          </div>
          <div className="w-4/6 text-2xl text-center pt-6 md:pt-12 pb-6">
            Juicy, flavorful, and crafted with care — our burgers are made to
            hit the spot. Whether classic or creative, each one is a feast for
            the senses
          </div>
          <PrimaryButton name="Order Now" link="menu" local={true} />
        </div>
      </div>

      {/* menu */}
      <div className="md:px-14  bg-white gap-2 md:gap-10 text-2xl font-bold text-background flex flex-col md:flex-row place-content-center items-center py-4 md:py-10">
        <div className="text-center md:text-start">Track your order</div>
        <div>
          <SecondaryButton name="Track Order" link="trackorder" local={true} />
        </div>
      </div>

      {/* reviews */}
      <div className="relative min-h-screen overflow-hidden  flex">
        <img
          src="/showBurger.webp"
          className="absolute h-full md:h-auto md:w-full object-top opacity-10"
          alt=""
        />
        <div className="flex flex-col items-center w-full text-white">
          <div className="text-5xl text-center md:text-start md:text-7xl font-bold pt-20">
            Dont take our word
          </div>
          <div className="text-2xl">See what others have to say</div>
          <div className="w-full  flex place-content-center -mt-28 h-full items-center">
            <ReviewCarousel />
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="relative md:h-[70svh] bg-[#232222] overflow-hidden pb-10 md:pb-0">
        <img
          src="/location.webp"
          className="z-0 w-full h-full absolute object-cover opacity-[0.01]"
          alt=""
        />
        <div className="relative z-10 w-full h-full flex justify-between ">
          {/* leftside */}
          <div className="flex flex-col items-center md:items-start text-center md:text-start w-full md:w-auto px-10 pt-20">
            <div className="text-4xl white flex flex-col  gap-5 text-zinc-200 font-bold">
              <Link to="menu">Menu</Link>
              <Link to="trackorder">Track Order</Link>
              <Link to="contact">Contact</Link>
              <Link to="contact">Admin Controls</Link>
            </div>
            <div className="flex gap-5 pt-5 ">
              <div className="w-16  hover:scale-110 hover:cursor-pointer active:scale-90 transition-transform rounded-2xl aspect-square bg-background  flex items-center place-content-center p-4 ">
                <img src="/fb.svg" className="w-4 " alt="" />
              </div>
              <div className="w-16 hover:scale-110 hover:cursor-pointer  active:scale-90 transition-transform rounded-2xl aspect-square bg-background  flex items-center place-content-center p-4">
                <img src="/ig.svg" className="w-10 " alt="" />
              </div>
            </div>
          </div>

          {/* rightside */}
          <div className="hidden md:flex relative items-end h-full ">
            <div className="absolute top-24 -left-14 bg-background text-white px-4 py-2 rounded-2xl rounded-br-none text-3xl items-start">
              Want a bite?
            </div>
            <img src="/holdingBurger.webp" className="md:h-5/6" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
