import React, { useState, useEffect } from "react";
import {
  X,
  MapPin,
  Phone,
  Mail,
  Package,
  Truck,
  CreditCard,
  Clock,
  Star,
  Share2,
  MessageCircle,
  Heart,
  Eye,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Edit,
} from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const categories = [
  {
    id: 1,
    name: "Fashion",
    icon: "fashion",
  },
  {
    id: 2,
    name: "Food & Restaurant",
    icon: "foodrestaurant",
  },
  {
    id: 3,
    name: "Electronic",
    icon: "electronic",
  },
  {
    id: 4,
    name: "Convenience Shop",
    icon: "convenience",
  },
  {
    id: 5,
    name: "Material",
    icon: "material",
  },
  {
    id: 6,
    name: "Fast Food",
    icon: "fastfood",
  },
  {
    id: 7,
    name: "Snack",
    icon: "snack",
  },
  {
    id: 8,
    name: "Breakfast",
    icon: "breakfast",
  },
  {
    id: 9,
    name: "Cake",
    icon: "cake",
  },
  {
    id: 10,
    name: "Coffee",
    icon: "coffee",
  },
  {
    id: 11,
    name: "Drink",
    icon: "drink",
  },
  {
    id: 12,
    name: "Lunch",
    icon: "lunch",
  },
  {
    id: 13,
    name: "Morning",
    icon: "morning",
  },
  {
    id: 14,
    name: "Sweets",
    icon: "sweets",
  },
  {
    id: 15,
    name: "Other",
    icon: "other",
  },
];

const ViewShopDetail = ({ shop, onClose }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    setLikeCount(Math.floor(Math.random() * 500) + 50);
  }, []);

  if (!shop) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-800 p-8 rounded-lg text-white">Loading...</div>
      </div>
    );
  }

  const coverPhoto = `https://api.pwezayshops.com/shop-uploads/${shop.photo}`;
  const logoPhoto = `https://api.pwezayshops.com/shop-uploads/${shop.logo}`;

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-500/20 text-green-400 border border-green-500/30";

      case "warning":
        return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30";

      default:
        return "bg-gray-500/20 text-gray-400 border border-gray-500/30";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return <CheckCircle size={16} />;

      case "warning":
        return <AlertCircle size={16} />;

      default:
        return null;
    }
  };
  const markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });
  const locationMatch = shop.location?.match(
    /Lag:?\s*([-\d.]+)\s*,\s*Log:?\s*([-\d.]+)/i,
  );

  const latitude = locationMatch ? parseFloat(locationMatch[1]) : null;

  const longitude = locationMatch ? parseFloat(locationMatch[2]) : null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-gray-900 rounded-2xl w-full max-w-4xl  shadow-2xl my-8 ">
        {/* HEADER WITH CLOSE BUTTON */}
        <div className="sticky top-0 bg-gray-900 border-b border-gray-700 px-6 py-4 flex justify-between items-center rounded-t-2xl z-10">
          <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
            Shop Details
            <p className="text-purple-400"> ({shop.id}) </p>
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-400 hover:text-white" />
          </button>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="overflow-y-auto max-h-[calc(100vh-120px)]">
          {/* COVER IMAGE SECTION */}
          <div className="relative bg-gray-800 h-72 overflow-hidden">
            {shop?.photo ? (
              <img
                src={`https://api.pwezayshops.com/shop-uploads/${shop.photo}`}
                alt={shop.shop_name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/1200x400?text=Shop+Cover";
                }}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-r from-gray-800 to-gray-700 text-gray-400">
                <Package size={60} className="mb-3 opacity-50" />
                <p className="text-lg font-semibold">No Cover Photo</p>
                <p className="text-sm text-gray-500">
                  This shop hasn't uploaded a cover image yet.
                </p>
              </div>
            )}

            {/* GRADIENT OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
          </div>

          {/* PROFILE SECTION */}
          <div className="px-6 pt-0">
            {/* LOGO AND SHOP NAME */}
            <div className="flex items-end gap-4 -mt-16 mb-6 relative z-20">
              <div className="size-28 rounded-2xl overflow-hidden border-4 border-gray-900 bg-gray-800 shadow-lg flex-shrink-0">
                {/* <img
                  src={logoPhoto}
                  alt={shop.shop_name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/200x200?text=Logo";
                  }}
                /> */}
                {shop?.logo ? (
                  <img
                    src={`https://api.pwezayshops.com/shop-uploads/${shop.logo}`}
                    alt={shop.shop_name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/200x200?text=Logo";
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800 text-gray-400">
                    <Package size={32} className="mb-2 opacity-50" />
                    <span className="text-xs text-center">No Logo</span>
                  </div>
                )}
              </div>

              <div className="pb-2 flex-1">
                <h1 className="text-2xl font-bold text-white mb-1">
                  {shop.shop_name}
                </h1>
                <p className="text-gray-400 text-sm">
                  Owned by {shop.shopkeeper_name}
                </p>
              </div>
            </div>

            {/* STATUS & SHOP INFO */}
            <div className="flex flex-wrap gap-3 mb-8">
              {/* STATUS */}
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                  shop.status,
                )}`}
              >
                {getStatusIcon(shop.status)}
                Status:{" "}
                {shop.status.charAt(0).toUpperCase() + shop.status.slice(1)}
              </div>

              {/* SHOP OPEN */}
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                  shop.open_shop
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "bg-red-500/20 text-red-400 border border-red-500/30"
                }`}
              >
                {shop.open_shop ? (
                  <CheckCircle size={16} />
                ) : (
                  <AlertCircle size={16} />
                )}
                Shop: {shop.open_shop ? "Open" : "Closed"}
              </div>

              {/* DELIVERY OPEN */}
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                  shop.open_shop_deli
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "bg-red-500/20 text-red-400 border border-red-500/30"
                }`}
              >
                {shop.open_shop_deli ? (
                  <CheckCircle size={16} />
                ) : (
                  <AlertCircle size={16} />
                )}
                Delivery: {shop.open_shop_deli ? "Open" : "Closed"}
              </div>
              {/* ITEMS */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-purple-500/20 text-purple-400 border border-purple-500/30">
                <Package size={16} />
                Items: {shop.items}
              </div>
            </div>

            {/* MAIN INFO GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {/* CONTACT INFORMATION */}
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Mail size={20} className="text-purple-400" />
                  Contact Information
                </h3>

                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Email</p>
                    <p className="text-white font-medium break-all">
                      {shop.email}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm mb-1">Phone</p>
                    <a
                      href={`tel:${shop.phone}`}
                      className="text-purple-400 font-medium hover:text-purple-300 transition-colors flex items-center gap-2"
                    >
                      {/* <Phone size={16} /> */}
                      {shop.phone}
                    </a>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm mb-1">Shopkeeper</p>
                    <p className="text-white font-medium">
                      {shop.shopkeeper_name}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm mb-1">Address</p>
                    <p className="text-white font-medium">{shop.address}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Create Date</p>
                    <p className="text-white font-medium">{shop.created_at}</p>
                  </div>
                </div>
              </div>

              {/* LOCATION & OPERATION */}
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 ">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <MapPin size={20} className="text-purple-400" />
                  Shop Location
                </h3>

                {latitude && longitude ? (
                  <div className="rounded-xl overflow-hidden">
                    <MapContainer
                      center={[latitude, longitude]}
                      zoom={16}
                      scrollWheelZoom={false}
                      style={{ height: "300px", width: "100%" }}
                    >
                      <TileLayer
                        attribution="&copy; OpenStreetMap contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />

                      <Marker
                        position={[latitude, longitude]}
                        icon={markerIcon}
                      >
                        <Popup>
                          <strong>{shop.shop_name}</strong>
                          <br />
                          {shop.address}
                        </Popup>
                      </Marker>
                    </MapContainer>
                  </div>
                ) : (
                  <p className="text-red-400">Location not available.</p>
                )}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <p className="text-lg font-bold text-white mb-4 flex items-center gap-2">Categories</p>

                  {shop.categories?.length ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {shop.categories.map((id) => {
                        const category = categories.find((c) => c.id === id);

                        if (!category) return null;

                        return (
                          <div
                            key={id}
                            className="bg-gray-900 border border-purple-500/30 rounded-xl p-3 flex flex-col items-center hover:border-purple-500 transition"
                          >
                            <img
                              src={`/categoriesIcon/${category.icon}.png`}
                              alt={category.name}
                              className="w-12 h-12 object-contain"
                            />

                            <p className="text-xs text-gray-300 mt-2 text-center leading-tight">
                              {category.name}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-6 rounded-xl border border-dashed border-gray-600 text-gray-400">
                      No Categories
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewShopDetail;
