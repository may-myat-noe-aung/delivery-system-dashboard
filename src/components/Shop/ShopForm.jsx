import React, { useState, useRef, useEffect } from "react";

const ShopForm = ({ onAdd }) => {
  const imageInputRef = useRef(null);
  const firstInputRef = useRef(null);
  const addButtonRef = useRef(null);

  

  const initialForm = {
    image: null,
    name: "",
    email: "",
    shopCode: "",
    shopName: "",
    itemNumber: "",
    contact: "",
    shopType: "",
    address: "",
    mapLocation: "",
  };

  const [form, setForm] = useState(initialForm);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: URL.createObjectURL(file) });
      setImageError(false);
    }
  };

  const handleDiscard = () => {
    setForm(initialForm);
    if (imageInputRef.current) imageInputRef.current.value = "";
    if (firstInputRef.current) firstInputRef.current.focus();
    setImageError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.image) {
      setImageError(true);
      return;
    }

    onAdd(form);
    handleDiscard();
  };

  const handleKeyDown = (e, isLast = false) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (isLast) {
        addButtonRef.current.click();
      } else {
        const formElements = Array.from(
          e.target.form.querySelectorAll("input, textarea")
        );
        const index = formElements.indexOf(e.target);
        if (index > -1 && index < formElements.length - 1) {
          formElements[index + 1].focus();
        }
      }
    }
  };

  return (
    <section className="w-[450px] py-6 sticky top-0 z-20">
      <div className="bg-white rounded-lg px-4 py-5 shadow-md">
        <form className="space-y-2.5" onSubmit={handleSubmit}>
          {/* Image Upload */}
          <label
            className={`border-2 border-dashed rounded-md flex items-center justify-center h-28 mb-1 cursor-pointer relative group ${
              imageError ? "border-red-500" : "border-gray-300"
            }`}
          >
            {form.image ? (
              <div className="w-full h-full relative">
                <img
                  src={form.image}
                  alt="Upload"
                  className="h-full w-full object-cover rounded"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setForm({ ...form, image: null });
                    if (imageInputRef.current) {
                      imageInputRef.current.value = "";
                    }
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Remove
                </button>
              </div>
            ) : (
              <span className="text-xs text-gray-400">Upload image</span>
            )}
            <input
              type="file"
              className="hidden"
              onChange={handleImageUpload}
              ref={imageInputRef}
            />
          </label>
          {imageError && (
            <p className="text-xs text-red-500 mb-2">Image is required.</p>
          )}

          {/* Form Fields */}
          <input
            ref={firstInputRef}
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            required
            className="w-full border px-3 py-1.5 rounded text-sm focus:outline-none focus:ring-1 focus:ring-purple-400"
            placeholder="Shopkeeper Name"
          />

          <input
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            required
            className="w-full border px-3 py-1.5 rounded text-sm focus:outline-none focus:ring-1 focus:ring-purple-400"
            placeholder="Shopkeeper Email"
          />

          <input
            type="text"
            name="shopName"
            value={form.shopName}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            required
            className="w-full border px-3 py-1.5 rounded text-sm focus:outline-none focus:ring-1 focus:ring-purple-400"
            placeholder="Shop Name"
          />

          <input
            type="tel"
            name="contact"
            value={form.contact}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            required
            className="w-full border px-3 py-1.5 rounded text-sm focus:outline-none focus:ring-1 focus:ring-purple-400"
            placeholder="e.g. 09 123 456789"
          />

          <input
            type="text"
            name="shopType"
            value={form.shopType}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            required
            className="w-full border px-3 py-1.5 rounded text-sm focus:outline-none focus:ring-1 focus:ring-purple-400"
            placeholder="Shop Type"
          />

          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            required
            className="w-full border px-3 py-1.5 rounded text-sm focus:outline-none focus:ring-1 focus:ring-purple-400"
            placeholder="Address"
            rows="2"
          />

          {/* Google Map */}
          <div className="w-full h-32 border rounded overflow-hidden mb-2">
            <iframe
              title="Google Map"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                form.mapLocation || "Myanmar"
              )}&z=15&output=embed`}
              className="w-full h-full"
              allowFullScreen
              loading="lazy"
            />
          </div>

          {/* Map input */}
          <input
            type="text"
            name="mapLocation"
            value={form.mapLocation}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, true)}
            required
            className="w-full border px-3 py-1.5 rounded text-sm focus:outline-none focus:ring-1 focus:ring-purple-400"
            placeholder="Enter location or coordinates"
          />

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={handleDiscard}
              className="px-3 py-1.5 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-400"
            >
              Discard
            </button>
            <button
              ref={addButtonRef}
              type="submit"
              className="px-3 py-1.5 bg-[#B476FF] text-white rounded-md text-sm hover:bg-[#9b5ce0]"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ShopForm;



