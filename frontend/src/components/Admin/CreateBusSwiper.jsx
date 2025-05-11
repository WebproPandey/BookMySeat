import React, { useEffect } from 'react'

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useDispatch, useSelector } from 'react-redux';
import { fetchBuses } from '../../redux/actions/busAction';


const CreateBusSwiper = () => {
    const dispatch = useDispatch()
    const { buses, loading, error } = useSelector((state) => state.bus);

      useEffect(() => {
        dispatch(fetchBuses());
      }, [dispatch]);
    
  
   

  return (
    <div className='CreateBusSwiper w-[90%] h-full relative'>
        <div className='CreateBusSwiperwraper w-full h-full  overflow-hidden'>
          <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{delay: 2500, disableOnInteraction: false,}}
              pagination={{ clickable: true,}}
              navigation={false}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper max-w-full w-full"
            >
                
            {buses?.slice(-4).map((bus) => (
            <SwiperSlide key={bus._id}>
              <div className="w-full h-[300px] relative flex justify-center items-center rounded-xl overflow-hidden shadow-lg bg-black/20 ">
                 <div className='w-[80%] h-full '>
                 <img
                    src={bus.busImage}
                    alt={bus.name}
                  className=" w-full h-full object-contain  "
                />
                 </div>
                
               

                <div className=" z-10  absolute  top-0 left-1/2 -translate-x-1/2 text-white text-center">
                  <h2 className="text-5xl font-bold">{bus.name}</h2>
                  <p className="text-2xl  font-medium">{bus.route.from.trim()} → {bus.route.to.trim()}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        
            </Swiper>
        </div>
       

    </div>
  )
}

export default CreateBusSwiper