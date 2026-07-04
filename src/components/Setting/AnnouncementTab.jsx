// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { ImagePlus, X, Send } from "lucide-react";
// import { useAlert } from "../../AlertContext";

// export default function AnnouncementTab() {
//   const { showAlert } = useAlert();

//   const [second, setSecond] = useState("1");

//   const [images, setImages] = useState([null, null, null, null, null]);

//   const [preview, setPreview] = useState([null, null, null, null, null]);

//   const [loading, setLoading] = useState(false);

//   // ===== ADD GET STATE =====
//   const [announcement, setAnnouncement] = useState(null);

//   // ===== ADD GET API =====
//   useEffect(() => {
//     getAnnouncement();
//   }, []);

//   const getAnnouncement = async () => {
//     try {
//       const res = await axios.get("https://api.pwezayshops.com/announcements");

//       if (res.data.success) {
//         setAnnouncement(res.data.data);
//       }
//     } catch (err) {
//       console.log("Get announcement error", err);
//     }
//   };

//   const handleImage = (index, file) => {
//     const newImages = [...images];

//     newImages[index] = file;

//     setImages(newImages);

//     const newPreview = [...preview];

//     newPreview[index] = URL.createObjectURL(file);

//     setPreview(newPreview);
//   };

//   const removeImage = (index) => {
//     const newImages = [...images];

//     newImages[index] = null;

//     setImages(newImages);

//     const newPreview = [...preview];

//     newPreview[index] = null;

//     setPreview(newPreview);
//   };

//   const submit = async () => {
//     const formData = new FormData();

//     formData.append("second", second);

//     images.forEach((img) => {
//       if (img) {
//         formData.append("images", img);
//       }
//     });

//     try {
//       setLoading(true);

//       const res = await axios.post(
//         "https://api.pwezayshops.com/announcements",

//         formData,

//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         },
//       );

//       showAlert(res.data.message || "Success", "success");

//       setImages([null, null, null, null, null]);

//       setPreview([null, null, null, null, null]);

//       setSecond("1");

//       // refresh image after create
//       getAnnouncement();
//     } catch (err) {
//       showAlert("Upload failed", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2
//         className="
// text-xl
// font-bold
// text-[#B476FF]
// mb-6
// "
//       >
//         Create Announcement
//       </h2>

//       <div>
//         <div
//           className="
// grid
// grid-cols-1
// md:grid-cols-5
// gap-4
// "
//         >
//           {images.map((img, index) => (
//             <div
//               key={index}
//               className="
// relative
// "
//             >
//               <label
//                 className="
// h-40
// border
// border-dashed
// border-neutral-700
// rounded-xl
// flex
// items-center
// justify-center
// cursor-pointer
// hover:border-[#B476FF]
// overflow-hidden
// "
//               >
//                 {preview[index] ? (
//                   <img
//                     src={preview[index]}
//                     className="
// w-full
// h-full
// object-cover
// "
//                   />
//                 ) : (
//                   <div
//                     className="
// text-center
// text-gray-400
// "
//                   >
//                     <ImagePlus
//                       className="
// mx-auto
// mb-2
// text-[#B476FF]
// "
//                     />
//                     Image {index + 1}
//                   </div>
//                 )}

//                 <input
//                   type="file"
//                   hidden
//                   accept="image/*"
//                   onChange={(e) => handleImage(index, e.target.files[0])}
//                 />
//               </label>

//               {preview[index] && (
//                 <button
//                   onClick={() => removeImage(index)}
//                   className="
// absolute
// top-2
// right-2
// bg-black/70
// rounded-full
// p-1
// "
//                 >
//                   <X size={15} />
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>

//         <div className="flex items-end justify-between">
//           <div>
//             <label
//               className="
// text-gray-400
// text-sm
// "
//             >
//               Second
//             </label>

//             <input
//               value={second}
//               onChange={(e) => setSecond(e.target.value)}
//               className="
// mt-2
// w-full
// bg-neutral-800
// border
// border-neutral-700
// rounded-xl
// px-4
// py-3
// text-white
// focus:border-[#B476FF]
// outline-none
// "
//             />
//           </div>

//           <button
//             onClick={submit}
//             disabled={loading}
//             className="
// w-[300px]
// bg-[#B476FF]
// text-black
// py-3
// rounded-xl
// font-bold
// flex
// justify-center
// gap-2
// items-center
// "
//           >
//             <Send size={18} />

//             {loading ? "Posting..." : "Create Announcement"}
//           </button>
//         </div>
//         {/* ===== ADD ANNOUNCEMENT IMAGE UI ===== */}

//         {announcement && (
//           <div>
//             <h3
//               className="
// text-lg
// font-bold
// text-white
// my-4
// "
//             >
//               Announcement Image
//             </h3>

//             <div
//               className="
// grid
// grid-cols-1
// md:grid-cols-5
// gap-4
// "
//             >
//               {announcement.images.map((img, index) => (
//                 <img
//                   key={index}
//                   src={`https://api.pwezayshops.com/announce-uploads/${img}`}
//                   className="
// h-40
// w-full
// object-cover
// rounded-xl
// border
// border-gray-700
// "
//                 />
//               ))}
//             </div>

//             <p className="text-gray-400 mt-4">Second : {announcement.second}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ImagePlus, X, Send } from "lucide-react";
import { useAlert } from "../../AlertContext";

export default function AnnouncementTab() {
  const { showAlert } = useAlert();

  const [second, setSecond] = useState("1");

  const [images, setImages] = useState([null, null, null, null, null]);
  const [preview, setPreview] = useState([null, null, null, null, null]);

  const [loading, setLoading] = useState(false);

  const [announcement, setAnnouncement] = useState(null);

  // ================= PASSCODE =================
  const [passcodeModal, setPasscodeModal] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [pendingSubmit, setPendingSubmit] = useState(false);
  const passcodeInputRef = useRef(null);

  useEffect(() => {
    getAnnouncement();
  }, []);

  const getAnnouncement = async () => {
    try {
      const res = await axios.get(
        "https://api.pwezayshops.com/announcements"
      );

      if (res.data.success) {
        setAnnouncement(res.data.data);
      }
    } catch (err) {
      console.log("Get announcement error", err);
    }
  };
useEffect(() => {
  if (passcodeModal && passcodeInputRef.current) {
    passcodeInputRef.current.focus();
  }
}, [passcodeModal]);
  const handleImage = (index, file) => {
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);

    const newPreview = [...preview];
    newPreview[index] = URL.createObjectURL(file);
    setPreview(newPreview);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);

    const newPreview = [...preview];
    newPreview[index] = null;
    setPreview(newPreview);
  };

  // ================= OPEN PASSCODE =================
  const openSubmit = () => {
    setPasscode("");
    setPasscodeModal(true);
  };

  // ================= REAL SUBMIT =================
  const submit = async () => {
    const formData = new FormData();

    formData.append("second", second);

    images.forEach((img) => {
      if (img) {
        formData.append("images", img);
      }
    });

    try {
      setLoading(true);

      const res = await axios.post(
        "https://api.pwezayshops.com/announcements",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      showAlert(res.data.message || "Success", "success");

      setImages([null, null, null, null, null]);
      setPreview([null, null, null, null, null]);
      setSecond("1");

      getAnnouncement();
    } catch (err) {
      showAlert("Upload failed", "error");
    } finally {
      setLoading(false);
    }
  };

  // ================= VERIFY + SUBMIT =================
  const doSubmit = async () => {
    if (!passcode) {
      showAlert("Enter passcode", "error");
      return;
    }

    setPendingSubmit(true);

    try {
      // 1. VERIFY PASSCODE
      const verifyRes = await axios.post(
        "https://api.pwezayshops.com/admin/verify-delimanager-passcode",
        { passcode }
      );

      if (!verifyRes.data.success) {
        showAlert("Wrong passcode", "error");
        setPendingSubmit(false);
        return;
      }

      // 2. CREATE ANNOUNCEMENT
      await submit();

      setPasscodeModal(false);
      setPasscode("");
    } catch (err) {
      showAlert(
        err.response?.data?.message || "Failed",
        "error"
      );
    } finally {
      setPendingSubmit(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-[#B476FF] mb-6">
        Create Announcement
      </h2>

      {/* IMAGE UPLOAD */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {images.map((img, index) => (
          <div key={index} className="relative">
            <label className="h-40 border border-dashed border-neutral-700 rounded-xl flex items-center justify-center cursor-pointer overflow-hidden">
              {preview[index] ? (
                <img
                  src={preview[index]}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center text-gray-400">
                  <ImagePlus className="mx-auto mb-2 text-[#B476FF]" />
                  Image {index + 1}
                </div>
              )}

              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => handleImage(index, e.target.files[0])}
              />
            </label>

            {preview[index] && (
              <button
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-black/70 rounded-full p-1"
              >
                <X size={15} />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* INPUT + BUTTON */}
      <div className="flex items-end justify-between mt-4">
        <div>
          <label className="text-gray-400 text-sm">Second</label>
          <input
            value={second}
            onChange={(e) => setSecond(e.target.value)}
            className="mt-2 w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white"
          />
        </div>

        <button
          onClick={openSubmit}
          disabled={loading}
          className="w-[300px] bg-[#B476FF] text-black py-3 rounded-xl font-bold flex justify-center gap-2 items-center"
        >
          <Send size={18} />
          {loading ? "Posting..." : "Create Announcement"}
        </button>
      </div>

      {/* ================= PASSCODE MODAL ================= */}
      {passcodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setPasscodeModal(false)}
          />

          <div className="relative bg-[#1e2235] rounded-xl p-6 w-[90%] max-w-[330px] border border-[#2c2f44]">
            <h3 className="text-lg font-bold text-center text-purple-400 mb-4">
              Enter Passcode
            </h3>

            <input
            ref={passcodeInputRef}
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full px-3 py-2 mb-4 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
              placeholder="Passcode"
            />

            <div className="flex gap-2">
              <button
                onClick={() => setPasscodeModal(false)}
                className="flex-1 px-3 py-2 border border-neutral-700 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={doSubmit}
                disabled={pendingSubmit}
                className="flex-1 px-3 py-2 bg-purple-600 rounded-lg"
              >
                {pendingSubmit ? "..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= VIEW ================= */}
      {announcement && (
        <div className="mt-6">
          <h3 className="text-white font-bold mb-4">
            Announcement Image
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {announcement.images.map((img, index) => (
              <img
                key={index}
                src={`https://api.pwezayshops.com/announce-uploads/${img}`}
                className="h-40 w-full object-cover rounded-xl border border-gray-700"
              />
            ))}
          </div>

          <p className="text-gray-400 mt-4">
            Second : {announcement.second}
          </p>
        </div>
      )}
    </div>
  );
}