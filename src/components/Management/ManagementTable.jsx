import {
  ChevronLeft,
  Download,
  Edit,
  Mail,
  Search,
  SortAsc,
  Trash2,
} from "lucide-react";
import React, { useState, useEffect } from "react";

const userData = [
  {
    originalIndex: 1,
    id: "344334",
    name: "Su Su Khin",
    shopName: "SuperMart",
    email: "stanley.j@hotmail.com",
    phone: "09724624734",
    zone: "blahblah, Mandalay, Myanmar",
    rating: 4.9,
    status: "Active",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    originalIndex: 2,
    id: "344335",
    name: "Aye Aye Win",
    shopName: "MegaShop",
    email: "ayeaye@hotmail.com",
    phone: "0971111111",
    zone: "Yangon, Myanmar",
    rating: 4.7,
    status: "Warning",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    originalIndex: 3,
    id: "SK123",
    name: "Ko Ko",
    shopName: "KoKoStore",
    email: "koko@shop.com",
    phone: "0988888888",
    zone: "Nay Pyi Taw",
    rating: 4.5,
    status: "Active",
    img: "https://randomuser.me/api/portraits/men/40.jpg",
  },
];

const shopkeeperData = [...userData, ...userData]; 
const deliveryData = [...userData, ...userData,...userData]; 

export default function ManagementTable() {
  const [selectedTab, setSelectedTab] = useState("User");
  const [users, setUsers] = useState(userData);
  const [hoveredUser, setHoveredUser] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  // Sorting state
  const [sortBy, setSortBy] = useState({ key: "id", dir: "asc" });

  // Search state
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (selectedTab === "User") setUsers(userData);
    else if (selectedTab === "Shopkeeper") setUsers(shopkeeperData);
    else if (selectedTab === "Delivery") setUsers(deliveryData);
  }, [selectedTab]);



  const handleMouseLeave = () => {
    setHoveredUser(null);
  };

  const toggleStatus = (index, type) => {
    setUsers((prevUsers) =>
      prevUsers.map((user, i) =>
        i === index
          ? {
              ...user,
              status: user.status === type ? "" : type,
            }
          : user
      )
    );
  };

  const toggleSort = (key) => {
    setSortBy((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" }
    );
  };

  // Filtered users based on search term
  const filteredUsers = users.filter((user) => {
    const term = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(term) ||
      user.id.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.phone.toLowerCase().includes(term) ||
      (user.shopName && user.shopName.toLowerCase().includes(term)) ||
      user.zone.toLowerCase().includes(term)
    );
  });



  // Sorted users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const ka = a[sortBy.key];
    const kb = b[sortBy.key];

    if (!isNaN(ka) && !isNaN(kb)) {
      return sortBy.dir === "asc" ? ka - kb : kb - ka;
    }

    if (ka < kb) return sortBy.dir === "asc" ? -1 : 1;
    if (ka > kb) return sortBy.dir === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="">
      {/* Tabs */}
      <div className="flex gap-6 mb-6">
        {["User", "Shopkeeper", "Delivery"].map((tab) => (
          <button
            key={tab}
            className={`py-2 px-6 rounded-full ${
              selectedTab === tab
                ? "bg-[#B476FF] text-white"
                : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search + export */}
      <div className="flex items-center justify-between mb-4">
        <div className="relative flex items-center w-[300px]">
          <Search className="absolute left-3 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="All Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-3 py-2 rounded-full bg-white border-none focus:ring-0 focus:outline-none w-full shadow-sm text-sm"
          />
        </div>

        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 px-3 py-2 text-xs bg-white shadow-sm rounded-full">
            <Download className="h-4 w-4" /> Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div>
        <div className="rounded-xl shadow-sm overflow-x-auto bg-white h-[580px]">
          <table className="min-w-full rounded-t-xl text-sm">
            <thead className="border rounded-t-xl text-left bg-[#B476FF] text-white sticky top-0 z-10">
              <tr className="text-left">
                {[
                  { label: "No", key: "id" },
                  { label: "Profile", key: "name" },
                  { label: "ID", key: "id" },
                  { label: "Contact", key: "email" },
                  { label: "Shop Name", key: "shopName" },
                  { label: "Zone", key: "zone" },
                  { label: "Status", key: "status" },
                  { label: "Action", key: "" },
                ].map((col) => (
                  <th
                    key={col.label}
                    className={`p-3 cursor-pointer ${
                      col.key ? "hover:underline" : ""
                    }`}
                    onClick={() => col.key && toggleSort(col.key)}
                  >
                    {col.label}{" "}
                    {sortBy.key === col.key
                      ? sortBy.dir === "asc"
                        ? "▲"
                        : "▼"
                      : ""}
                  </th>
                ))}
              </tr>
            </thead>
<tbody className="h-full overflow-scroll">
  {sortedUsers.length > 0 ? (
    sortedUsers.map((user, i) => (
      <tr
        key={i}
        className={`border-t ${
          user.status === "Active"
            ? "bg-green-100"
            : user.status === "Warning"
            ? "bg-red-100"
            : "bg-white"
        }`}
      >
        <td className="p-3">{user.originalIndex}</td>
        <td className="p-3 flex items-center gap-2">
          <img
            src={user.img}
            alt={user.name}
            className="w-10 h-10 rounded-full "
        
          />
          <div>
            <div className="font-semibold">{user.name}</div>
            <div className="text-yellow-500 text-xs">⭐ {user.rating}</div>
          </div>
        </td>
        <td className="p-3">{user.id}</td>
        <td className="p-3">
          {user.email}
          <br />
          {user.phone}
        </td>
        <td className="p-3">{user.shopName}</td>
        <td className="p-3">{user.zone}</td>
        <td className="px-4 py-2 space-x-1">
          <button
            onClick={() => toggleStatus(i, "Active")}
            className={`px-2 py-1 text-xs rounded ${
              user.status === "Active"
                ? "bg-green-500 text-white"
                : "bg-green-100 text-green-800"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => toggleStatus(i, "Warning")}
            className={`px-2 py-1 text-xs rounded ${
              user.status === "Warning"
                ? "bg-red-500 text-white"
                : "bg-red-100 text-red-800"
            }`}
          >
            Warning
          </button>
        </td>
        <td className="p-3 flex items-center gap-2">
          <button>
            <Edit className="size-5 text-[#B476FF] cursor-pointer" />
          </button>
          <p className="w-[1.5px] h-6 bg-[#B476FF]"></p>
          <button>
            <Mail className="size-5 text-[#B476FF] cursor-pointer" />
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={8} className="text-center p-6 text-gray-500">
        No results found.
      </td>
    </tr>
  )}
</tbody>

          </table>
        </div>

      </div>
    </div>
  );
}

