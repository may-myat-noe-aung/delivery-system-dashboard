import { IoMdCart } from "react-icons/io"
import { LiaCertificateSolid } from "react-icons/lia"
import { RiErrorWarningFill } from "react-icons/ri"
import { SiCashapp } from "react-icons/si"

const CardSection = () => {
  return (
    <section className="mb-8  grid grid-cols-4 gap-5 ">
      <div className="col-span-1 ">
        <div className="bg-white p-4 rounded-2xl shadow-[4px_6px_4px_0px_rgba(128,128,128,0.5)] flex  justify-between items-center h-[150px]">
          <div className="flex flex-col items-start justify-between h-full ">
            <div className="flex flex-col justify-start items-start">
            <p className="text-base mb-1">Total Order</p>
            <span className="text-xl font-semibold ">279</span>
            </div>
            <p className="text-base">Today</p>
            </div>
            <IoMdCart size={50}/>
            </div>
      </div>

      <div className="col-span-1 ">
        <div className="bg-white p-4 rounded-2xl shadow-[4px_6px_4px_0px_rgba(128,128,128,0.5)] flex  justify-between items-center h-[150px]">
          <div className="flex flex-col items-start justify-between h-full ">
            <div className="flex flex-col justify-start items-start" >
                <p className="text-base ">Top Selling Item</p>
                <p className="text-[22px] font-semibold mt-1">Coconut Juice</p>
                <span className="text-[12px] ">212 sold</span>
            </div>
            <p className="text-base">Today</p>
        </div>
            
            <LiaCertificateSolid size={50} />
        </div>
      </div>

      <div className="col-span-1 ">
        <div className="bg-white p-4 rounded-2xl shadow-[4px_6px_4px_0px_rgba(128,128,128,0.5)] flex  justify-between items-center h-[150px]">
          <div className="flex flex-col items-start justify-between h-full ">
            <div className="flex flex-col justify-start items-start" >
                <p className="text-base ">Least-Ordered Item</p>
                <p className="text-[22px] font-semibold mt-1">Faluda</p>
                <span className="text-[12px] ">56 sold</span>
            </div>
            <p className="text-base">Today</p>
        </div>
            <RiErrorWarningFill className=" size-[50px]" />
        </div>
      </div>

      <div className="col-span-1 ">
        <div className="bg-white p-4 rounded-2xl shadow-[4px_6px_4px_0px_rgba(128,128,128,0.5)] flex  justify-between items-center h-[150px]">
          <div className="flex flex-col items-start justify-between h-full ">
            <div className="flex flex-col justify-start items-start" >
                <p className="text-base ">Total Revenue</p>
                <p className="text-[22px] font-semibold mt-1"> <span>7,650,500</span> MMK</p>
            </div>
            <p className="text-base">Today</p>
        </div>
            <SiCashapp className=" size-[40px]" />

        </div>
      </div>
    </section>
  )
}

export default CardSection
