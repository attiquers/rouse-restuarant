import { PrimaryButton, SecondaryButton } from "./components/button";
import ReviewCarousel from "./components/reviewsHOME";
const Home = () => {
  return (
    <div className="pt-32">
      {/* hero */}
      <div>
        <div className="text-white text-center">
          <div className="text-4xl font-bold ">Wyoming's Tastiest</div>
          <div className="text-[10rem] leading-3 pt-16 pb-8 font-bold">
            BURGER
          </div>
        </div>
        <div className="flex place-content-center pb-">
          <img src="/burger.png" alt="burger" className="w-3/4" />
        </div>
      </div>

      {/* find us */}
      <div className="bg-white gap-10 text-2xl font-bold text-background flex place-content-center items-center py-10">
        <div>Find Rouse Restaurant</div>
        <div>
          <SecondaryButton name="Locations" link="https://example.com" />
        </div>
      </div>

      {/* order */}
      <div className="h-screen  flex">
        <div className="w-1/2 overflow-hidden">
          <img src="/showBurger.png" className="w-full object-top" alt="" />
        </div>
        <div className="w-1/2 flex flex-col place-content-center items-center text-white">
          <div className=" w-4/6 text-center text-7xl font-bold ">
            Crafted for Cravings
          </div>
          <div className="w-4/6 text-2xl text-center pt-12 pb-6">
            Juicy, flavorful, and crafted with care — our burgers are made to
            hit the spot. Whether classic or creative, each one is a feast for
            the senses
          </div>
          <PrimaryButton name="Order Now" link="https://example.com" />
        </div>
      </div>

      {/* menu */}
      <div className="bg-white gap-10 text-2xl font-bold text-background flex place-content-center items-center py-10">
        <div>See our delicious menu</div>
        <div>
          <SecondaryButton name="Open Menu" link="https://example.com" />
        </div>
      </div>

      {/* revies */}
      <div className="relative h-screen overflow-hidden  flex">
        <img
          src="/showBurger.png"
          className="absolute w-full object-top opacity-10"
          alt=""
        />
        <div className="flex flex-col items-center w-full text-white">
          <div className="text-7xl font-bold pt-20">Dont take our word</div>
          <div className="text-2xl">See what others have to say</div>
          <div className="w-full flex place-content-center -mt-28 h-full items-center">
            <ReviewCarousel />
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="relative h-[70svh] bg-[#232222] overflow-hidden ">
        <img
          src="/location.png"
          className="z-0 w-full h-full absolute object-cover opacity-[0.01]"
          alt=""
        />
        <div className="relative z-10 w-full h-full flex justify-between ">
          {/* leftside */}
          <div className=" px-10 pt-20">
            <div className="text-4xl white flex flex-col  gap-5 text-zinc-200 font-bold">
              <div className="">Menu</div>
              <div>Order</div>
              <div>Contact</div>
              <div>Locations</div>
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
          <div className="relative flex items-end h-full ">
            <div className="absolute top-24 -left-14 bg-background text-white px-4 py-2 rounded-2xl rounded-br-none text-3xl items-start">
              Want a bite?
            </div>
            <img src="/holdingBurger.png" className="h-5/6" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
