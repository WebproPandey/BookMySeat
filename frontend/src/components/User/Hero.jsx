import bgimg from "../../assets/backgroundimage.jpg";
import bus from "../../assets/bus2.png";
import bus3 from "../../assets/bus3.png";
import city from "../../assets/indian.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchBusUser } from "../../redux/actions/user/userActions";
import {
  BusFront,
  Armchair,
  CreditCard,
  Ticket,
  RotateCcw,
  Headphones,
  ShieldCheck,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function Hero() {
  const dispatch = useDispatch();
  const { buses, loading, error } = useSelector((state) => state.userBus);
  const calculatePrice = (bus) => {
    const { distance, busType, pricePerKm } = bus;
    let price = 0;

    if (busType === "AC") price = distance * pricePerKm.ac;
    else if (busType === "Non-AC") price = distance * pricePerKm.nonAc;
    else if (busType === "Deluxe") price = distance * pricePerKm.deluxe;
    else if (busType === "Non-Deluxe") price = distance * pricePerKm.nonDeluxe;

    return price.toFixed();
  };
  useEffect(() => {
    dispatch(fetchBusUser());
  }, [dispatch]);

  console.log("buses:", buses);

  return (
    <div className="w-full">
      <div
        className="user-dashboard flex justify-center  px-6 items-end w-full h-screen relative bg-cover bg-center rounded-b-2xl"
        style={{ backgroundImage: `url(${bgimg})` }}
      >
        <div className="leftside w-[40%] h-[70%]  flex flex-col items-start justify-start gap-5">
          <h1 className="text-[4vw] font-bold  capitalize leading-none  tracking-tight">
            Youe Journey of Exploration begins here!{" "}
          </h1>
          <p className="text-[1.5vw] font-normal leading-none  tracking-tight">
            Skip the lines and book your bus tickets online from anywhere,
            anytime. Discover top-rated buses, exclusive offers, and seamless
            booking in seconds. Reliable, affordable, and designed for every
            traveler.
          </p>
          <button className="bg-[#FFEFC1] rounded-md px-8 py-3 text-black text-[1vw] font-medium">
            Explore Now
          </button>
        </div>
        <div className="rightside w-[60%] h-[80%] flex items-end">
          <img src={bus} className="h-full w-full object-bottom" alt="" />
        </div>
      </div>

      <div className="w-full  flex justify-center items-center">
        <div className="h-[40vh] w-1/2 flex flex-col items-center  gap-4 justify-center ">
          <div className="text-[2.6vw] font-bold  capitalize leading-none  tracking-tight">
            Popular Routes
          </div>
          <p className="text-[1.5vw] text-center font-normal leading-none  tracking-tight">
            Explore our most popular bus routes, chosen by thousands of
            travelers across the country. From daily commutes to weekend
            getaways, these top routes offer the perfect blend of comfort,
            affordability, and convenience
          </p>

          <button className="bg-gradient-to-r from-[#11C9A7] to-[#13C881] px-6 py-2 rounded-md text-[1.6vw] text-black">
            Satation & Stop
          </button>
        </div>
      </div>

      <div className="showbus w-full min-h-[50vh] flex  gap-5 px-6">
        {buses.map((bus) => (
          <div
            key={bus._id}
            className=" bg-gray-200 rounded-lg shadow-md p-4 w-[28vw] relative "
          >
            <h2 className="text-xl font-bold absolute top-5 z-[6] right-[5%]">
              {bus.name}
            </h2>

            <div className="w-full  h-48 overflow-hidden bg-gray-800 relative">
              <img
                src={bus.busImage}
                alt={bus.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full">
              <div className="flex justify-between w-full items-center">
                <p className="text-[1.5vw] font-medium">{bus.route.from} </p>
                <div className="h-[1px] w-[50%] bg-gray-500"></div>
                <p className="text-[1.5vw] font-medium">{bus.route.to}</p>
              </div>
              <div className="flex justify-between w-full">
                <p className="text-[1.2vw] font-medium">
                  Available Seats: {bus.availableSeats.length}
                </p>
                <p className="text-[1.2vw] font-medium">
                  Price per seat: ₹{calculatePrice(bus)}
                </p>
              </div>
            </div>
            <button className=" border-blue-500 cursor-pointer border-[1px] text-black font-medium px-4 w-full py-2 rounded mt-4">
              Book Ticket
            </button>
          </div>
        ))}
      </div>

      <div className="about w-full flex justify-center  items-center  pt-[5rem] px-6 overflow-hidden">
        <div className="leftside h-[40vh] w-[40%] flex items-start  justify-start flex-col ">
          <h1 className="text-[1.4vw] text-black font-medium">Testimonila</h1>
          <div className="text-[4vw] font-bold  capitalize leading-none  tracking-tight">
            what people say About us .
          </div>
        </div>
        <div className="rightside h-[50vh] flex items-center justify-center w-[60%] ">
          <div
            id="rightsidewraper"
            className="rightsidewraper w-[80%] h-[90%] overflow-x-hidden relative "
          >
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={false}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper max-w-full w-full"
            >
              <SwiperSlide>Slide 1</SwiperSlide>
              <SwiperSlide>Slide 2</SwiperSlide>
              <SwiperSlide>Slide 3</SwiperSlide>
              <SwiperSlide>Slide 4</SwiperSlide>
              <SwiperSlide>Slide 5</SwiperSlide>
              <SwiperSlide>Slide 6</SwiperSlide>
              <SwiperSlide>Slide 7</SwiperSlide>
              <SwiperSlide>Slide 8</SwiperSlide>
              <SwiperSlide>Slide 9</SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 flex  items-center  justify-between py-16 px-6 lg:px-18 text-gray-800 ">
        <div className="w-1/2 ">
          <h2 className="text-3xl font-bold mb-10">
            Book Your Ticket in 3 Easy Steps
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 w-[80%]">
            <div className="bg-white h-[15vh] rounded-md flex shadow-md px-6 py-3 gap-2 hover:shadow-xl transition-all">
              <div className="text-red-600 text-4xl mb-4 mx-auto w-fit ">
                <BusFront size={40} />
              </div>
              <div className="flex flex-col   ">
                <h3 className="text-xl font-semibold mb-2">1. Choose Bus</h3>
                <p className="text-gray-600 items-start  leading-none">
                  Search your route and pick the best bus based on timing, fare,
                  and comfort.
                </p>
              </div>
            </div>

            <div className="bg-white  h-[15vh]  rounded-md flex shadow-md px-6 py-3 gap-2 hover:shadow-xl transition-all">
              <div className="text-red-600 text-4xl mb-4 mx-auto w-fit">
                <Armchair size={40} />
              </div>
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold mb-2">
                  2. Select Your Seat
                </h3>
                <p className="text-gray-600 leading-none ">
                  View the interactive bus layout and easily choose your
                  preferred seat instantly.
                </p>
              </div>
            </div>
            <div className="bg-white  h-[15vh]  rounded-md flex shadow-md px-6 py-3 gap-2 hover:shadow-xl transition-all">
              <div className="text-red-600 text-4xl mb-4 mx-auto w-fit">
                <CreditCard size={40} />
              </div>
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold mb-2">
                  3. Pay & Get Ticket
                </h3>
                <p className="text-gray-600 leading-none ">
                  Complete payment securely and receive your ticket via email or
                  SMS.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2  ">
          <div className="imagesplash h-[60vh] w-full relative">
            <img
              src={bus3}
              className="image h-full  w-full object-cover"
              alt=""
            />
          </div>
        </div>
      </div>

      <div className=" px-6 lg:px-32 text-gray-800  h-[40vh]">
        <div
          className="max-w-6xl h-full text-center bg-cover bg-center "
          style={{ backgroundImage: `url(${city})` }}
        >
          <div className="flex items-center justify-center flex-col h-full bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-10 ">

  <h2 className="text-3xl font-bold mb-4 text-black">Our Services</h2>

  <div className="w-[50%]">
    <p className="text-black mb-6">
      We provide seamless online bus booking, real-time seat availability,
      and secure payment options to ensure a hassle-free travel
      experience. Whether you're commuting locally or planning a long
      journey, we make ticket booking fast and reliable.
    </p>
  </div>

  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
    Book Your Ticket
  </button>

</div>


        </div>
      </div>
    </div>
  );
}
