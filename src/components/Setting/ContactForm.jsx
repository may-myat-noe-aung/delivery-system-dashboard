import React, { useState } from "react";

const ContactForm = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "Myanmar",
    message: "",
    services: [],
  });

  const services = [
    "Website design",
    "UI/ UX design",
    "User research",
    "Content creation",
    "Strategy & consulting",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleServiceToggle = (service) => {
    setForm((prev) => {
      const updated = prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service];
      return { ...prev, services: updated };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", form);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex justify-center">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-5xl flex flex-col md:flex-row gap-8">
        
        {/* ================= FORM ================= */}
        <form onSubmit={handleSubmit} className="flex-1">
          <h2 className="text-lg font-semibold mb-2">Contact Our Team</h2>
          <p className="text-sm text-gray-500 mb-6">
            Contact our software team for questions, technical support, or feedback regarding your platform.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={form.firstName}
              onChange={handleChange}
              className="p-3 rounded-lg bg-purple-100 w-full outline-none"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={form.lastName}
              onChange={handleChange}
              className="p-3 rounded-lg bg-purple-100 w-full outline-none"
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="you@email.com"
            value={form.email}
            onChange={handleChange}
            className="p-3 rounded-lg bg-purple-100 w-full outline-none mb-4"
          />

          <div className="flex gap-4 mb-4">
            <select
              name="country"
              value={form.country}
              onChange={handleChange}
              className="p-3 rounded-lg bg-purple-100 outline-none"
            >
              <option>Myanmar</option>
              <option>Thailand</option>
              <option>Singapore</option>
            </select>
            <input
              type="text"
              name="phone"
              placeholder="+95 987654321"
              value={form.phone}
              onChange={handleChange}
              className="flex-1 p-3 rounded-lg bg-purple-100 outline-none"
            />
          </div>

          <textarea
            name="message"
            placeholder="Leave us a message..."
            value={form.message}
            onChange={handleChange}
            className="p-3 rounded-lg bg-purple-100 w-full outline-none mb-6 h-28"
          />

          <h3 className="text-sm font-medium mb-2">Services</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            {services.map((service) => (
              <label key={service} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.services.includes(service)}
                  onChange={() => handleServiceToggle(service)}
                  className="w-4 h-4"
                />
                <span className="text-sm">{service}</span>
              </label>
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-purple-500 text-white font-medium hover:bg-purple-600"
          >
            Send message
          </button>
        </form>

        {/* ================= CONTACT INFO ================= */}
        <div className="w-full md:w-1/3 border-t md:border-t-0 md:border-l pt-6 md:pt-0 md:pl-6 text-sm">
          <h3 className="font-semibold mb-3">Chat with us</h3>
          <ul className="space-y-2 mb-6">
            <li className="text-purple-600 cursor-pointer hover:underline">Start a live chat</li>
            <li className="text-purple-600 cursor-pointer hover:underline">Shoot us an email</li>
            <li className="text-purple-600 cursor-pointer hover:underline">Message us on FB</li>
          </ul>

          <h3 className="font-semibold mb-3">Call us</h3>
          <p className="text-gray-500 mb-2">Mon-Fri from 9am to 5pm</p>
          <p className="text-purple-600">+95 987654321</p>
          <p className="text-purple-600 mb-6">+95 987654321</p>

          <h3 className="font-semibold mb-3">Visit us</h3>
          <p className="text-gray-500">
            75 Thida Street, Mandalay blabla
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
