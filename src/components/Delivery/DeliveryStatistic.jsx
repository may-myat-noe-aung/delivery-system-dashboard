import React from "react";
import {
  Search,
  Filter,
  Phone,
  Mail,
  MessageCircle,
  ChevronLeft,
  SortAsc,
  Download,
  MessageSquare,
  Star,
  Truck,
  ChevronDown,
} from "lucide-react";
import TrackDeliveryMen from "../../pages/TrackDeliveryMen";
import CircleChart from "./CircleChart";

const deliveryData = [
  {
    id: "#456377",
    driver: "Kyaw Kyaw",
    start: "1:30 mins",
    eta: "2:30 mins",
    status: "On Going",
  },
  {
    id: "#456377",
    driver: "Kyaw Kyaw",
    start: "1:30 mins",
    eta: "2:30 mins",
    status: "On Going",
  },
  {
    id: "#456377",
    driver: "Kyaw Kyaw",
    start: "1:30 mins",
    eta: "2:30 mins",
    status: "On Going",
  },
];

const TrackDeliveryMan = () => {
  return (
    <div className="space-y-6 w-full">
      {/* Top Section: Header + Map */}
      <div className="space-y-4">
        {/* Header and Search */}
        <div className="flex justify-between items-center">
          <p className="text-[#B476FF] font-bold text-lg">
            View real live location of all your delivery vehicles on map...
          </p>
          {/* Table filter + sorting */}
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              {/* Search Bar */}
              <div className="relative flex items-center w-[300px]">
                <Search className="absolute left-3 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-9 pr-3 py-2 text-sm rounded-full bg-white border border-gray-200 focus:ring-0 focus:outline-none w-full shadow-sm"
                />
              </div>

              {/* Filter Button */}
              <button className="flex items-center gap-2 px-4 py-2 text-sm bg-[#B476FF] text-white shadow-sm rounded-full hover:bg-[#9b5ce0] transition">
                <Filter className="w-4 h-4" /> Filter
              </button>
            </div>
          </div>
        </div>

        {/* Google Maps - General Area (Yangon) */}
        <div className="rounded-xl overflow-hidden border border-purple-200">
          <iframe
            title="Map - Yangon View"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d244399.5833191622!2d96.0167660708402!3d16.83907673112598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30c1949e223e196b%3A0x56fbd271f8080bb4!2sYangon!5e0!3m2!1sen!2smm!4v1754571497805!5m2!1sen!2smm"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* Main Grid */}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Delivery Cards */}
        <div className="md:col-span-2 lg:col-span-1 space-y-4">
          <div className="flex items-center justify-between gap-3">
            {/* Search Bar */}
            <div className="relative flex items-center w-full max-w-sm">
              <Search className="absolute left-3 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search"
                className="pl-9 pr-3 py-2 text-sm rounded-full bg-white border border-gray-200 focus:ring-0 focus:outline-none w-full shadow-sm"
              />
            </div>

            {/* Dropdown Button */}
            <button className="flex items-center gap-1 bg-[#B476FF] text-white px-3 py-2 rounded-full text-sm font-medium shadow-sm hover:bg-[#9b5ce0] transition">
              All
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="max-w-md  bg-white rounded-2xl shadow-md p-4 border border-gray-200">
            {/* Header */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Star
                  className="text-purple-500"
                  fill="currentColor"
                  size={20}
                />
                <span className="font-semibold text-lg text-gray-800">
                  #456377
                </span>
              </div>
              <span className="px-3 py-1 text-sm border border-green-600 text-green-600 rounded-full">
                On Going
              </span>
            </div>

            {/* Progress Section */}
            <div className="relative mt-6">
              <div className="flex justify-between items-center text-sm text-gray-500 mb-2 px-1">
                <span className="text-center">Starting point</span>
                <span className="text-center">Customer</span>
              </div>
              {/* Progress bar */}
              <div className="relative h-2 bg-purple-100 rounded-full">
                <div
                  className="absolute h-2 bg-purple-500 rounded-full"
                  style={{ width: "45%" }}
                ></div>
                <div className="absolute left-[45%] -translate-x-1/2 -top-5 w-8 h-8 bg-white border-4 border-purple-300 rounded-full flex items-center justify-center">
                  <Truck size={16} className="text-purple-600" />
                </div>
              </div>
              {/* Labels */}
              <div className="flex justify-between mt-1 px-1">
                <span className="text-sm text-gray-500">45% completely</span>
              </div>
            </div>

            {/* Time Details */}
            <div className="flex justify-between mt-4 text-sm">
              <div>
                <span className="text-gray-500">Start time : </span>
                <span className="text-purple-600 font-semibold">1:30 mins</span>
              </div>
              <div>
                <span className="text-gray-500">Estimated Arrival : </span>
                <span className="text-purple-600 font-semibold">2:30 mins</span>
              </div>
            </div>

            <hr className="my-4" />

            {/* Footer: Delivery Man Info */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="Delivery Man"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="font-semibold text-gray-800">Kyaw Kyaw</span>
              </div>
              <div className="flex space-x-2">
                <button className="bg-purple-100 p-2 rounded-lg">
                  <MessageSquare className="text-purple-600" size={18} />
                </button>
                <button className="bg-purple-100 p-2 rounded-lg">
                  <Phone className="text-purple-600" size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Route Map + Stats */}
        <div className="space-y-4 lg:col-span-2">
          {/* Route Preview Map (Driving from A to B) */}
          <div className="bg-white p-4 rounded-xl shadow overflow-hidden">
            <p className="text-sm text-gray-600 mb-2">Delivery Route</p>
            <div className="rounded-lg overflow-hidden">
              <iframe
                title="Route from Yangon Central to Sule Pagoda"
                src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d48854.90594970163!2d96.12317458284209!3d16.80817941794881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x30c1eb4cfa3cbab5%3A0x5aeb8aa2d5fe3cf4!2sYangon%20Central%20Railway%20Station%2C%20Kun%20Chan%20Rd%2C%20Yangon!3m2!1d16.7833603!2d96.15429619999999!4m5!1s0x30c1ec95af7ae1e1%3A0x772a12e33b65a350!2sSule%20Pagoda%2C%20Yangon!3m2!1d16.7744684!2d96.1582205!5e0!3m2!1sen!2smm!4v1691998511000!5m2!1sen!2smm"
                width="100%"
                height="273"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Delivery Statistics */}
        <div className="lg:col-span-1 bg-white p-4 rounded-xl shadow text-center flex items-center justify-center">
          {/* <div className="text-gray-600 mb-4 flex justify-between items-center">
            <span>Delivery Statistic</span>
            <select className="text-sm rounded-full px-6 bg-[#B476FF] text-white py-2">
              <option>This day</option>
              <option>This Weekly</option>
              <option>This Monthly</option>
              <option>This Years</option>
            </select>
          </div>
          <div className="flex justify-around">
            <div>
              <p className="text-purple-600 font-bold text-xl">14%</p>
              <p className="text-sm">On Going</p>
            </div>
            <div>
              <p className="text-purple-600 font-bold text-xl">46%</p>
              <p className="text-sm">Completed</p>
            </div>
            <div>
              <p className="text-purple-600 font-bold text-xl">74%</p>
              <p className="text-sm">Cancelled</p>
            </div>
          </div> */}
          <CircleChart />
        </div>
      </div>
    </div>
  );
};

export default TrackDeliveryMan;
