import React, { useEffect } from 'react'

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useDispatch, useSelector } from 'react-redux';
import { fetchPromos } from '../../redux/actions/promoActions';
import moment from 'moment';


const RecentPromo = () => {
      const dispatch = useDispatch();

    const { promos, loading } = useSelector((state) => state.promo);
  // console.log("promos:", promos);
    useEffect(() => {
      dispatch(fetchPromos());
    }, [dispatch]);

  return (
      <div className='RecentPromoSwiper w-full h-full relative'>
        <div className='RecentPromoSwiperwraper w-full h-full   overflow-hidden'>
          <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{delay: 2500, disableOnInteraction: false,}}
              pagination={{ clickable: true,}}
              navigation={false}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper max-w-full w-full"
            >
                
           {promos?.length > 0 && promos.slice(-4).map((promo) => (
            <SwiperSlide key={promo._id}>
              <div className="flex justify-center items-center w-full h-full">
                <div className="bg-gradient-to-r from-cyan-500 to-cyan-200 rounded-2xl text-white  flex flex-col items-start  justify-between  shadow-xl  h-full w-full px-6 py-3">
                    <div className='text-white text-[2vw] font-medium  '>CouponCode</div>
                  <div className="flex flex-col  justify-between items-start h-[50%] mb-2">
                    <span className="text-white  py-1  text-5xl font-semibold">
                      {promo.discountPercent}% OFF
                    </span>
                    <h2 className="text-2xl font-bold tracking-wider uppercase text-white">{promo.code}</h2>
                    <div>

                    </div>
                   
                  </div>
                   <p className=" mb-2 text-red-500 font-semibold text-base ">
                    <span className="font-semibold text-black">Expiry:</span>
                     {moment(promo.expiryDate).format("DD MMM YYYY")}
                  </p>

                  {/* 

                  <p className="text-sm">
                    <span className="font-semibold">Used:</span> {promo.usedCount}/{promo.usageLimit}
                  </p> */}
                </div>
              </div>
            </SwiperSlide>
          ))}

          {!loading && promos?.length === 0 && (
            <SwiperSlide>
              <div className="text-white text-center p-10 bg-gray-800 rounded-xl shadow">
                No Promos Available
              </div>
            </SwiperSlide>
          )}
        
            </Swiper>
        </div>
       

    </div>
  )
}

export default RecentPromo