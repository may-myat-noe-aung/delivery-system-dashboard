import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Filter,
  SortAsc,
  UserPlus,
  Download,
  Edit,
  Trash2,
  Camera,
  Mail,
} from "lucide-react";
import ChatModal from "./ChatModal";

const AddDeliveryMan = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState({}); // stores all delivery man messages

  const handleSendMessage = (text) => {
    if (!activeChat) return;
    setMessages((prev) => ({
      ...prev,
      [activeChat.id]: [
        ...(prev[activeChat.id] || []),
        { sender: "admin", text },
      ],
    }));
  };

  const [showForm, setShowForm] = useState(false);
  const [deliveryMen, setDeliveryMen] = useState([
    {
      id: "344334",
      name: "May ",
      email: "stanley.ish@hotmail.com",
      phone: "097242647234",
      location: "Mandalay, Myanmar",
      status: "Full time",
      totalOrder: 320,
      assignOrder: 10,
      rating: 4.9,
      profile:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwQaacW4KivNMftwdTLQxRj8Cb78TYNNg8bZ4EfEfJGgHFr-oQloK89V7c5QX769u3xYI&usqp=CAU",
    },
    {
      id: "344334",
      name: "Su Su Khin",
      email: "stanley.ish@hotmail.com",
      phone: "097242647234",
      location: "Mandalay, Myanmar",
      status: "Full time",
      totalOrder: 320,
      assignOrder: 10,
      rating: 4.9,
      profile:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwQaacW4KivNMftwdTLQxRj8Cb78TYNNg8bZ4EfEfJGgHFr-oQloK89V7c5QX769u3xYI&usqp=CAU",
    },
    {
      id: "344334",
      name: " Khin",
      email: "stanley.ish@hotmail.com",
      phone: "097242647234",
      location: "Mandalay, Myanmar",
      status: "Full time",
      totalOrder: 320,
      assignOrder: 10,
      rating: 4.9,
      profile:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwQaacW4KivNMftwdTLQxRj8Cb78TYNNg8bZ4EfEfJGgHFr-oQloK89V7c5QX769u3xYI&usqp=CAU",
    },
  ]);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    location: "",
    status: "Full time",
    totalOrder: "",
    assignOrder: "",
    profile:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwQaacW4KivNMftwdTLQxRj8Cb78TYNNg8bZ4EfEfJGgHFr-oQloK89V7c5QX769u3xYI&usqp=CAU",
    rating: 0,
    password: "",
    confirmPassword: "",
  });

  const [searchTerm, setSearchTerm] = useState(""); // ⬅️ Search term
  const nameInputRef = useRef(null);

  useEffect(() => {
    if (showForm && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [showForm]);

  // Sorting state
  const [sortBy, setSortBy] = useState({ key: "id", dir: "asc" });

  const toggleSort = (key) => {
    setSortBy((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" }
    );
  };

  // Filter delivery men based on search term
  const filteredDeliveryMen = deliveryMen.filter((man) => {
    const term = searchTerm.toLowerCase();
    return (
      man.name.toLowerCase().includes(term) ||
      man.id.toLowerCase().includes(term) ||
      man.email.toLowerCase().includes(term) ||
      man.phone.toLowerCase().includes(term) ||
      man.location.toLowerCase().includes(term)
    );
  });

  const sortedDeliveryMen = [...filteredDeliveryMen].sort((a, b) => {
    const ka = a[sortBy.key];
    const kb = b[sortBy.key];

    // Numeric sorting for totalOrder and assignOrder
    if (sortBy.key === "totalOrder" || sortBy.key === "assignOrder") {
      return sortBy.dir === "asc" ? ka - kb : kb - ka;
    }

    // Default string sorting
    if (ka < kb) return sortBy.dir === "asc" ? -1 : 1;
    if (ka > kb) return sortBy.dir === "asc" ? 1 : -1;
    return 0;
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profile: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setDeliveryMen([...deliveryMen, formData]);

    setFormData({
      id: "",
      name: "",
      email: "",
      phone: "",
      location: "",
      status: "Full time",
      totalOrder: "",
      assignOrder: "",
      profile:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwQaacW4KivNMftwdTLQxRj8Cb78TYNNg8bZ4EfEfJGgHFr-oQloK89V7c5QX769u3xYI&usqp=CAU",
      rating: 0,
      password: "",
      confirmPassword: "",
    });

    setShowForm(false);
  };

  return (
    <div className="flex flex-col bg-gray-100">
      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-[450px] p-6 relative">
            <h2 className="text-lg font-semibold mb-4 text-[#B476FF]">
              Add Delivery Man
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex flex-col items-center ">
                <div className="relative">
                  <img
                    src={formData.profile}
                    alt="Profile Preview"
                    className="size-28 rounded-full object-cover border mb-3 shadow-md"
                  />
                  <label className="cursor-pointer flex items-center justify-center bg-[#B476FF] text-white size-8 rounded-full hover:bg-[#9b5de5] absolute bottom-3 right-0 ">
                    <Camera className="size-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full border px-3 py-2 rounded-lg text-sm"
                required
                ref={nameInputRef}
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border px-3 py-2 rounded-lg text-sm"
                required
              />

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full border px-3 py-2 rounded-lg text-sm"
                required
              />

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full border px-3 py-2 rounded-lg text-sm"
                required
              />

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full border px-3 py-2 rounded-lg text-sm"
                required
              />

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
                className="w-full border px-3 py-2 rounded-lg text-sm"
                required
              />

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg text-sm"
              >
                <option>Full time</option>
                <option>Part time</option>
              </select>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded-lg border text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#B476FF] text-white text-sm"
                >
                  Save
                </button>
              </div>
            </form>

            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Delivery man stats */}
      <div className="flex items-center justify-center">
        <div className="flex gap-16 mb-6">
          {[
            { label: "Total delivery man", value: 320 },
            { label: "Fulltime delivery man", value: 50 },
            { label: "Active delivery man", value: 120 },
            { label: "Part time delivery man", value: 220 },
          ].map((stat, index) => (
            <div
              key={index}
              className="w-[300px] bg-[#B476FF] px-4 py-6 rounded-lg shadow-md flex items-center gap-4"
            >
              <div className="bg-white p-3 rounded-full">
                <img
                  src="https://img.icons8.com/color/48/delivery.png"
                  className="size-10"
                  alt="icon"
                />
              </div>
              <div>
                <div className="text-base mb-2 text-white">{stat.label}</div>
                <div className="text-xl font-bold text-white">{stat.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        {/* Search Input */}
        <div className="flex items-center gap-2 pb-3">
          <div className="relative w-[300px] flex items-center justify-center">
            <Search className="absolute left-3 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="All Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-2 rounded-full bg-white border-none focus:ring-0 focus:outline-none w-full shadow-sm text-sm"
            />
          </div>
        </div>
        {/* Add Button */}
        <div className="flex items-center gap-2 pb-3">
          <button
            onClick={() => setShowForm(true)}
            className="ml-auto bg-[#B476FF] text-white px-8 py-3 rounded-full text-sm flex items-center gap-2"
          >
            <UserPlus className="size-4" /> Add delivery man
          </button>
        </div>
      </div>

      {/* Delivery Man Table */}
      <div className="rounded-t-xl shadow-sm overflow-x-auto bg-white h-[450px]">
        <table className="min-w-full rounded-t-xl text-sm">
          <thead className="border rounded-t-xl text-left bg-[#B476FF] text-white sticky top-0 z-10">
            <tr>
              <th
                className="p-3 cursor-pointer"
                onClick={() => toggleSort("id")}
              >
                No{" "}
                {sortBy.key === "id" ? (sortBy.dir === "asc" ? "▲" : "▼") : ""}
              </th>
              <th
                className="p-3 cursor-pointer"
                onClick={() => toggleSort("name")}
              >
                Name{" "}
                {sortBy.key === "name"
                  ? sortBy.dir === "asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </th>
              <th
                className="p-3 cursor-pointer"
                onClick={() => toggleSort("id")}
              >
                ID{" "}
                {sortBy.key === "id" ? (sortBy.dir === "asc" ? "▲" : "▼") : ""}
              </th>
              <th
                className="p-3 cursor-pointer"
                onClick={() => toggleSort("email")}
              >
                Contact{" "}
                {sortBy.key === "email"
                  ? sortBy.dir === "asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </th>
              <th
                className="p-3 cursor-pointer"
                onClick={() => toggleSort("location")}
              >
                Location{" "}
                {sortBy.key === "location"
                  ? sortBy.dir === "asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </th>
              <th
                className="p-3 cursor-pointer"
                onClick={() => toggleSort("status")}
              >
                Status{" "}
                {sortBy.key === "status"
                  ? sortBy.dir === "asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </th>
              <th
                className="p-3 cursor-pointer"
                onClick={() => toggleSort("totalOrder")}
              >
                Total Order{" "}
                {sortBy.key === "totalOrder"
                  ? sortBy.dir === "asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </th>
              <th
                className="p-3 cursor-pointer"
                onClick={() => toggleSort("assignOrder")}
              >
                Assign Order{" "}
                {sortBy.key === "assignOrder"
                  ? sortBy.dir === "asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedDeliveryMen.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center p-6 text-gray-500">
                  No delivery men found.
                </td>
              </tr>
            ) : (
              sortedDeliveryMen.map((man, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3 flex items-center gap-2">
                    <img
                      src={man.profile}
                      alt=""
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <div className="font-semibold">{man.name}</div>
                      <div className="text-yellow-500 text-xs">
                        ⭐ {man.rating}
                      </div>
                    </div>
                  </td>
                  <td className="p-3">{man.id}</td>
                  <td className="p-3">
                    {man.email}
                    <br />
                    {man.phone}
                  </td>
                  <td className="p-3">{man.location}</td>
                  <td className="p-3 text-green-600 font-semibold">
                    {man.status}
                  </td>
                  <td className="p-3 text-sm">
                    <b className="text-[#B476FF]">{man.totalOrder}</b>
                  </td>
                  <td className="p-3 text-sm">
                    <b className="text-[#B476FF]">{man.assignOrder}</b>
                  </td>
                  <td className="p-3 flex items-center gap-2">
                    <button>
                      <Edit className="size-5 text-[#B476FF] cursor-pointer" />
                    </button>
                    <p className="w-[1.5px] h-6 bg-[#B476FF]"></p>
                <button
  onClick={() => {
    setActiveChat(man);
    setChatOpen(true);
    if (!messages[man.id]) setMessages((prev) => ({ ...prev, [man.id]: [] }));
  }}
>
  <Mail className="size-5 text-[#B476FF] cursor-pointer" />
</button>

                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
<ChatModal
  open={chatOpen}
  onClose={() => setChatOpen(false)}
  user={activeChat}       
  messages={messages}      
  onSend={handleSendMessage}
/>

    </div>
  );
};

export default AddDeliveryMan;
