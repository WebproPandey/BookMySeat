import React from 'react'
import RecentBus from './RecentBus'
import CreateBusSwiper from './CreateBusSwiper'
import RecentPromo from './RecentPromo'

const Hero = () => {
  return (
    <div className='w-full '>
        
          <div className='w-full  h-[50vh] items-center flex justify-center relative '>
            <CreateBusSwiper/>
          </div>

          <div className='recentinfo w-full flex items-center justify-center relative gap-2 h-[30vh] py-2'>
            <div className='recentBus w-[50%] h-full  relative'>
              <div className="text-[2vw] font-medium ">Popular Route</div>
               <RecentBus/>
            </div>
            <div className='recentpromo w-[40%] h-full relative'>
              <div className="text-[2vw] font-medium ">Recents Promo</div>
               <RecentPromo/>
            </div>
            </div>

    </div>
  )
}

export default Hero