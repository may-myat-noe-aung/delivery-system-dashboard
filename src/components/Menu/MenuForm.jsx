// import { Plus } from "lucide-react";
// import React, { useState, useRef, useEffect } from "react";

// // 🔽 Reusable dropdown (for Shop / Category)
// const DropdownSelect = ({ value, onChange, placeholder, options, required }) => {
//   const [open, setOpen] = useState(false);
//   const [search, setSearch] = useState("");
//   const ref = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (ref.current && !ref.current.contains(e.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const filteredOptions = options.filter((opt) =>
//     opt.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="relative w-full" ref={ref}>
//       <input
//         tabIndex={-1}
//         style={{ opacity: 0, height: 0, position: "absolute" }}
//         value={value}
//         onChange={() => {}}
//         required={required}
//       />
//       <div
//         className="border px-2 py-1.5 rounded text-sm flex justify-between items-center cursor-pointer"
//         onClick={() => setOpen(!open)}
//       >
//         <span>{value || placeholder}</span>
//         <span className="transform">{open ? "▲" : "▼"}</span>
//       </div>

//       {open && (
//         <div className="absolute w-full bg-white border mt-1 rounded shadow z-10 max-h-40 overflow-y-auto">
//           <input
//             type="text"
//             placeholder={`Search ${placeholder.toLowerCase()}...`}
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full px-2 py-1 border-b focus:outline-none"
//           />
//           <ul>
//             {filteredOptions.length > 0 ? (
//               filteredOptions.map((opt, idx) => (
//                 <li
//                   key={idx}
//                   onClick={() => {
//                     onChange(opt);
//                     setOpen(false);
//                     setSearch("");
//                   }}
//                   className="px-2 py-1 hover:bg-purple-100 cursor-pointer"
//                 >
//                   {opt}
//                 </li>
//               ))
//             ) : (
//               <li className="px-2 py-1 text-gray-400">No results found</li>
//             )}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// const MenuForm = ({ onAdd }) => {
//   const imageInputRef = useRef(null);
//   const [error, setError] = useState(""); // 🔽 Error state

//   const [form, setForm] = useState({
//     image: null,
//     name: "",
//     shop: "",
//     category: "",
//     voice: null,
//     price: "",
//     discount: "",
//     quantity: "",
//     comboImages: [null, null, null],
//     comboCode0: "",
//     comboCode1: "",
//     comboCode2: "",
//     description: "",
//     remark: "",
//     itemCode: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setForm({ ...form, image: URL.createObjectURL(file) });
//       setError(""); // 🔽 clear error when image selected
//     }
//   };

//   const handleVoiceUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) setForm({ ...form, voice: file });
//   };

//   const handleComboUpload = (index, e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const newCombo = [...form.comboImages];
//       newCombo[index] = URL.createObjectURL(file);
//       setForm({ ...form, comboImages: newCombo });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!form.image) {
//       setError("Food image is required"); // 🔽 check image
//       return;
//     }
//     onAdd(form);
//     setForm({
//       image: null,
//       name: "",
//       itemCode: "",
//       shop: "",
//       category: "",
//       voice: null,
//       price: "",
//       discount: "",
//       quantity: "",
//       comboImages: [null, null, null],
//       comboCode0: "",
//       comboCode1: "",
//       comboCode2: "",
//       description: "",
//       remark: "",
//     });
//     if (imageInputRef.current) imageInputRef.current.value = "";
//   };

//   return (
//     <form onSubmit={handleSubmit} className="w-[450px] py-4 sticky top-0 z-20">
//       <div className="bg-white rounded-lg px-4 py-5 shadow-sm ">
//         {/* Image Upload */}
//         <label className="border-2 border-dashed rounded-md flex items-center justify-center h-24  cursor-pointer relative group mb-2">
//           {form.image ? (
//             <div className="w-full h-full relative">
//               <img
//                 src={form.image}
//                 alt="Upload"
//                 className="h-full w-full object-cover rounded"
//               />
//               <button
//                 type="button"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setForm({ ...form, image: null });
//                   if (imageInputRef.current) imageInputRef.current.value = "";
//                 }}
//                 className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity"
//               >
//                 Remove
//               </button>
//             </div>
//           ) : (
//             <span className="text-xs text-gray-400">Upload Food Image</span>
//           )}
//           <input
//             type="file"
//             accept="image/*"
//             className="hidden"
//             onChange={handleImageUpload}
//             ref={imageInputRef}
//           />
//         </label>

//         {/* 🔽 Error text */}
//         {error && <p className="text-red-500 text-xs mb-2">{error}</p>}

//         {/* Input Fields */}
//         <div className="space-y-2">
//           {/* Food Name */}
//           <input
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             required
//             autoFocus
//             className="w-full border px-2 py-1.5 rounded text-sm focus:ring-1 focus:ring-purple-400"
//             placeholder="Food Name"
//           />

//           {/* Shop Dropdown */}
//           <DropdownSelect
//             value={form.shop}
//             onChange={(value) => setForm({ ...form, shop: value })}
//             placeholder="Select Shop"
//             options={["Shop 1", "Shop 2", "Shop 3", "Shop 4", "Shop 5"]}
//             required
//           />

//           {/* Category Dropdown */}
//           <DropdownSelect
//             value={form.category}
//             onChange={(value) => setForm({ ...form, category: value })}
//             placeholder="Food Category"
//             options={["Pizza", "Burger", "Drinks", "Dessert", "Salad"]}
//             required
//           />

//           {/* Voice Input */}
//           {/* <input
//             type="file"
//             accept="audio/*"
//             onChange={handleVoiceUpload}
//             className="w-full border px-2 py-1.5 rounded text-sm focus:ring-1 focus:ring-purple-400"
//           /> */}
//           {/* Voice Input */}
// <label className="w-full border px-2 py-1.5 rounded text-sm cursor-pointer flex items-center justify-between focus:ring-1 focus:ring-purple-400">
//   <span className="text-gray-500 text-sm">
//     {form.voice ? form.voice.name : "Upload Voice File"}
//   </span>
//   <input
//     type="file"
//     accept="audio/*"
//     onChange={handleVoiceUpload}
//     className="hidden"
//   />
// </label>

//           {/* Price / Discount / Quantity */}
//           <div className="flex gap-1">
//             <input
//               name="price"
//               value={form.price}
//               onChange={handleChange}
//               required
//               className="w-1/3 border px-2 py-1.5 rounded text-sm focus:ring-1 focus:ring-purple-400"
//               placeholder="Price"
//             />
//             <input
//               name="discount"
//               value={form.discount}
//               onChange={handleChange}
//               className="w-1/3 border px-2 py-1.5 rounded text-sm focus:ring-1 focus:ring-purple-400"
//               placeholder="Discount"
//             />
//             <input
//               name="quantity"
//               value={form.quantity}
//               onChange={handleChange}
//               className="w-1/3 border px-2 py-1.5 rounded text-sm focus:ring-1 focus:ring-purple-400"
//               placeholder="Qty"
//             />
//           </div>

//           {/* Combo Images */}
//           <div className="flex gap-1 shadow-md px-2 py-4 rounded mb-2">
//             {form.comboImages.map((img, i) => (
//               <div key={i} className="w-1/3 flex flex-col items-center">
//                 <label className="w-full border rounded h-16 flex items-center justify-center cursor-pointer mb-2">
//                   {img ? (
//                     <img src={img} alt={`combo-${i}`} className="w-10 h-10" />
//                   ) : (
//                     <Plus className="text-gray-400" />
//                   )}
//                   <input
//                     type="file"
//                     accept="image/*"
//                     className="hidden"
//                     onChange={(e) => handleComboUpload(i, e)}
//                   />
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Combo code"
//                   value={form[`comboCode${i}`] || ""}
//                   onChange={(e) =>
//                     setForm({ ...form, [`comboCode${i}`]: e.target.value })
//                   }
//                   className="mt-1 w-full border px-1 py-1 rounded text-xs focus:ring-1 focus:ring-purple-400"
//                 />
//               </div>
//             ))}
//           </div>

//           {/* Description & Remark */}
//           <textarea
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//             className="w-full border px-2 py-1.5 rounded text-sm focus:ring-1 focus:ring-purple-400"
//             placeholder="Description"
//             rows="2"
//           />
//           <textarea
//             name="remark"
//             value={form.remark}
//             onChange={handleChange}
//             className="w-full border px-2 py-1.5 rounded text-sm focus:ring-1 focus:ring-purple-400"
//             placeholder="Remark"
//             rows="2"
//           />

//           {/* Actions */}
//           <div className="flex justify-end gap-2 pt-2">
//             <button
//               type="button"
//               className="px-3 py-1.5 border rounded text-sm hover:bg-gray-100"
//             >
//               Discard
//             </button>
//             <button
//               type="submit"
//               className="px-3 py-1.5 bg-[#B476FF] text-white rounded text-sm hover:bg-[#9d5fff]"
//             >
//               Add Item
//             </button>
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default MenuForm;

import { Plus } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

// 🔽 Reusable dropdown (for Shop / Category)
const DropdownSelect = React.forwardRef(
  (
    { value, onChange, placeholder, options, required, searchable = true },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const containerRef = useRef(null);
    const searchInputRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (e) => {
        if (containerRef.current && !containerRef.current.contains(e.target)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredOptions = searchable
      ? options.filter((opt) =>
          opt.toLowerCase().includes(search.toLowerCase())
        )
      : options;

    React.useImperativeHandle(ref, () => ({
      focusSearch: () => {
        if (searchable) {
          setOpen(true);
          setTimeout(() => searchInputRef.current?.focus(), 0);
        } else {
          setOpen(true);
        }
      },
    }));

    return (
      <div className="relative w-full" ref={containerRef}>
        <input
          tabIndex={-1}
          style={{ opacity: 0, height: 0, position: "absolute" }}
          value={value}
          onChange={() => {}}
          required={required}
        />
        <div
          className="border px-2 py-1.5 rounded text-sm flex justify-between items-center cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <span>{value || placeholder}</span>
          <span className="transform">{open ? "▲" : "▼"}</span>
        </div>

        {open && (
          <div className="absolute w-full bg-white border mt-1 rounded shadow z-10 max-h-40 overflow-y-auto">
            {searchable && (
              <input
                type="text"
                ref={searchInputRef}
                placeholder={`Search ${placeholder.toLowerCase()}...`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-2 py-1 border-b focus:outline-none"
              />
            )}
            <ul>
              {filteredOptions.length > 0 ? (
                filteredOptions.map((opt, idx) => (
                  <li
                    key={idx}
                    onClick={() => {
                      onChange(opt);
                      setOpen(false);
                      setSearch("");
                    }}
                    className="px-2 py-1 hover:bg-purple-100 cursor-pointer"
                  >
                    {opt}
                  </li>
                ))
              ) : (
                <li className="px-2 py-1 text-gray-400">No results found</li>
              )}
            </ul>
          </div>
        )}
      </div>
    );
  }
);

const MenuForm = ({ onAdd }) => {
  const imageInputRef = useRef(null);
  const shopDropdownRef = useRef(null); // 🔽 ref for Shop dropdown
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    image: null,
    name: "",
    shop: "",
    category: "",
    voice: null,
    price: "",
    discount: "",
    quantity: "",
    comboImages: [null, null, null],
    comboCode0: "",
    comboCode1: "",
    comboCode2: "",
    description: "",
    remark: "",
    itemCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: URL.createObjectURL(file) });
      setError("");
    }
  };

  const handleVoiceUpload = (e) => {
    const file = e.target.files[0];
    if (file) setForm({ ...form, voice: file });
  };

  const handleComboUpload = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const newCombo = [...form.comboImages];
      newCombo[index] = URL.createObjectURL(file);
      setForm({ ...form, comboImages: newCombo });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.image) {
      setError("Food image is required");
      return;
    }
    onAdd(form);
    setForm({
      image: null,
      name: "",
      itemCode: "",
      shop: "",
      category: "",
      voice: null,
      price: "",
      discount: "",
      quantity: "",
      comboImages: [null, null, null],
      comboCode0: "",
      comboCode1: "",
      comboCode2: "",
      description: "",
      remark: "",
    });
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  return (
    <form onSubmit={handleSubmit} className="w-[450px] py-4 sticky top-0 z-20">
      <div className="bg-white rounded-lg px-4 py-5 shadow-sm ">
        {/* Image Upload */}
        <label className="border-2 border-dashed rounded-md flex items-center justify-center h-24  cursor-pointer relative group mb-2">
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
                  if (imageInputRef.current) imageInputRef.current.value = "";
                }}
                className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Remove
              </button>
            </div>
          ) : (
            <span className="text-xs text-gray-400">Upload Food Image</span>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
            ref={imageInputRef}
          />
        </label>

        {/* 🔽 Error text */}
        {error && <p className="text-red-500 text-xs mb-2">{error}</p>}

        <div className="space-y-2">
          {/* Food Name */}
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Tab" && !e.shiftKey) {
                e.preventDefault();
                shopDropdownRef.current?.focusSearch(); // 🔽 focus Shop search
              }
            }}
            className="w-full border px-2 py-1.5 rounded text-sm focus:ring-1 focus:ring-purple-400"
            placeholder="Food Name"
          />

          {/* Shop Dropdown (with search) */}
          <DropdownSelect
            ref={shopDropdownRef}
            value={form.shop}
            onChange={(value) => setForm({ ...form, shop: value })}
            placeholder="Select Shop"
            options={["Shop 1", "Shop 2", "Shop 3", "Shop 4", "Shop 5"]}
            required
            searchable={true}
          />

          {/* Category Dropdown (NO search) */}
          <DropdownSelect
            value={form.category}
            onChange={(value) => setForm({ ...form, category: value })}
            placeholder="Food Category"
            options={["Pizza", "Burger", "Drinks", "Dessert", "Salad"]}
            required
            searchable={false}
          />

          {/* Voice Input */}
          <label className="w-full border px-2 py-1.5 rounded text-sm cursor-pointer flex items-center justify-between focus:ring-1 focus:ring-purple-400">
            <span className="text-gray-500 text-sm">
              {form.voice ? form.voice.name : "Upload Voice File"}
            </span>
            <input
              type="file"
              accept="audio/*"
              onChange={handleVoiceUpload}
              className="hidden"
            />
          </label>

          {/* Price / Discount / Quantity */}
          <div className="flex gap-1">
            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              className="w-1/3 border px-2 py-1.5 rounded text-sm focus:ring-1 focus:ring-purple-400"
              placeholder="Price"
            />
            <input
              name="discount"
              value={form.discount}
              onChange={handleChange}
              className="w-1/3 border px-2 py-1.5 rounded text-sm focus:ring-1 focus:ring-purple-400"
              placeholder="Discount"
            />
            <input
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              className="w-1/3 border px-2 py-1.5 rounded text-sm focus:ring-1 focus:ring-purple-400"
              placeholder="Qty"
            />
          </div>

          {/* Combo Images */}
          <div className="flex gap-1 shadow-md px-2 py-4 rounded mb-2">
            {form.comboImages.map((img, i) => (
              <div key={i} className="w-1/3 flex flex-col items-center">
                <label className="w-full border rounded h-16 flex items-center justify-center cursor-pointer mb-2">
                  {img ? (
                    <img src={img} alt={`combo-${i}`} className="w-10 h-10" />
                  ) : (
                    <Plus className="text-gray-400" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleComboUpload(i, e)}
                  />
                </label>
                <input
                  type="text"
                  placeholder="Combo code"
                  value={form[`comboCode${i}`] || ""}
                  onChange={(e) =>
                    setForm({ ...form, [`comboCode${i}`]: e.target.value })
                  }
                  className="mt-1 w-full border px-1 py-1 rounded text-xs focus:ring-1 focus:ring-purple-400"
                />
              </div>
            ))}
          </div>

          {/* Description & Remark */}
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border px-2 py-1.5 rounded text-sm focus:ring-1 focus:ring-purple-400"
            placeholder="Description"
            rows="2"
          />
          <textarea
            name="remark"
            value={form.remark}
            onChange={handleChange}
            className="w-full border px-2 py-1.5 rounded text-sm focus:ring-1 focus:ring-purple-400"
            placeholder="Remark"
            rows="2"
          />

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              className="px-3 py-1.5 border rounded text-sm hover:bg-gray-100"
            >
              Discard
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 bg-[#B476FF] text-white rounded text-sm hover:bg-[#9d5fff]"
            >
              Add Item
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default MenuForm;
