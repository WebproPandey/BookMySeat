import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useDispatch, useSelector } from 'react-redux';
import { fetchBuses } from '../../redux/actions/busAction';

const RecentBus = () => {

    const dispatch = useDispatch()
      const { buses, loading, error } = useSelector((state) => state.bus);
  
        useEffect(() => {
          dispatch(fetchBuses());
        }, [dispatch]);
      

  return (
    <div className='RecentBusSwiper w-full h-full '>
      <div className='RecentBusSwiperwraper w-full h-full overflow-hidden rounded-xl'>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={false}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper max-w-full w-full "
        >
                   {buses?.slice(-3).map((bus) => (
                   <SwiperSlide key={bus._id}>
                     <div className="w-full h-full relative flex justify-center items-center rounded-md md:rounded-xl overflow-hidden shadow-lg bg-gradient-to-r from-amber-300 to-amber-200">
                        <div className='w-full md:w-[80%] h-full '>
                        <img
                           src={bus.busImage}
                           alt={bus.name}
                         className=" w-full h-full object-contain  "
                       />
                        </div>
                       
                      
       
                       <div className=" z-10  absolute  w-full top-0 left-1/2 -translate-x-1/2  text-center">
                         <h2 className="text-2xl md:text-5xl font-bold text-black">{bus.name}</h2>
                         <p className="text-md md:text-2xl  font-medium text-white">{bus.route.from.trim()} → {bus.route.to.trim()}</p>
                       </div>
                     </div>
                   </SwiperSlide>
                 ))}
        </Swiper>
      </div>
    </div>
  );
};

export default RecentBus;
