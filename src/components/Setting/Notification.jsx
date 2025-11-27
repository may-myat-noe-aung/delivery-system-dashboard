// import React, { useState } from "react";

// const Notification = () => {
//   const [settings, setSettings] = useState({
//     notification: true,
//     doNotDisturb: true,
//     taskbarIcons: true,
//     allowSounds: true,
//     customSound: "Snooze",
//   });

//   const handleToggle = (key) => {
//     setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
//   };

//   const handleSelect = (e) => {
//     setSettings((prev) => ({ ...prev, customSound: e.target.value }));
//   };

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-3xl">
//       <h2 className="text-lg font-semibold mb-4">Notification</h2>

//       {/* Toggle Items */}
//       {[
//         {
//           key: "notification",
//           title: "Notification",
//           desc: "Get notification form orders and other senders.",
//         },
//         {
//           key: "doNotDisturb",
//           title: "Do not disturb",
//           desc: "Notifications will be sent directly to notification center.",
//         },
//         {
//           key: "taskbarIcons",
//           title: "Allow taskbar icons",
//           desc: "Display notification alerts from applications as icons on the taskbar.",
//         },
//         {
//           key: "allowSounds",
//           title: "Allow sounds",
//           desc: "Allow new notifications to play a sound alert when they arrive.",
//         },
//       ].map((item) => (
//         <div
//           key={item.key}
//           className="flex items-center justify-between p-3 bg-purple-100 rounded-lg mb-3"
//         >
//           <div>
//             <p className="font-medium text-gray-800">{item.title}</p>
//             <p className="text-sm text-gray-500">{item.desc}</p>
//           </div>
//           <label className="inline-flex items-center cursor-pointer">
//             <input
//               type="checkbox"
//               checked={settings[item.key]}
//               onChange={() => handleToggle(item.key)}
//               className="sr-only peer"
//             />
//             <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-purple-500 
//                             relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 
//                             after:w-5 after:h-5 after:bg-white after:rounded-full after:transition-all 
//                             peer-checked:after:translate-x-5"></div>
//           </label>
//         </div>
//       ))}

//       {/* Custom Sounds */}
//       <div className="flex items-center justify-between p-3 bg-purple-100 rounded-lg mb-3">
//         <div>
//           <p className="font-medium text-gray-800">Custom sounds</p>
//           <p className="text-sm text-gray-500">
//             Assign a unique sound to different types of notification for easy
//             identification.
//           </p>
//         </div>
//         <select
//           value={settings.customSound}
//           onChange={handleSelect}
//           className="border rounded-md px-3 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
//         >
//           <option value="Snooze">Snooze</option>
//           <option value="Default">Default</option>
//         </select>
//       </div>

//       {/* Save & Cancel */}
//       <div className="flex gap-3 mt-6">
//         <button className="px-6 py-2 rounded-lg bg-purple-500 text-white font-medium hover:bg-purple-600">
//           Save
//         </button>
//         <button className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300">
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Notification;

import React, { useState } from "react";

const Notification = () => {
  const [settings, setSettings] = useState({
    notification: true,
    doNotDisturb: false,
    taskbarIcons: true,
    allowSounds: true,
    customSound: "Snooze",
  });

  const notifications = [
    {
      id: 1,
      user: "Mi Mi",
      action: "approved your request",
      time: "5m ago",
      avatar: "https://i.pravatar.cc/40?img=1",
    },
    {
      id: 2,
      user: "Naing Aung",
      action: "assigned you a new task",
      time: "12m ago",
      avatar: "https://i.pravatar.cc/40?img=2",
    },
    {
      id: 3,
      user: "Admin",
      action: "sent you a message",
      time: "1h ago",
      avatar: "https://i.pravatar.cc/40?img=3",
    },
    {
      id: 4,
      user: "Team",
      action: "meeting scheduled for tomorrow",
      time: "2h ago",
      avatar: "https://i.pravatar.cc/40?img=4",
    },
  ];

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center gap-6">
      {/* ================= SETTINGS ================= */}
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-3xl">
        <h2 className="text-lg font-semibold mb-4">Notification Settings</h2>

        {[
          {
            key: "notification",
            title: "Notification",
            desc: "Get notification form orders and other senders.",
          },
          {
            key: "doNotDisturb",
            title: "Do not disturb",
            desc: "Notifications will be sent directly to notification center.",
          },
          {
            key: "taskbarIcons",
            title: "Allow taskbar icons",
            desc: "Display notification alerts from applications as icons on the taskbar.",
          },
          {
            key: "allowSounds",
            title: "Allow sounds",
            desc: "Allow new notifications to play a sound alert when they arrive.",
          },
        ].map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between p-3 bg-purple-100 rounded-lg mb-3"
          >
            <div>
              <p className="font-medium text-gray-800">{item.title}</p>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings[item.key]}
                onChange={() => handleToggle(item.key)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-purple-500 
                              relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 
                              after:w-5 after:h-5 after:bg-white after:rounded-full after:transition-all 
                              peer-checked:after:translate-x-5"></div>
            </label>
          </div>
        ))}

        {/* Custom Sounds */}
        <div className="flex items-center justify-between p-3 bg-purple-100 rounded-lg mb-3">
          <div>
            <p className="font-medium text-gray-800">Custom sounds</p>
            <p className="text-sm text-gray-500">
              Assign a unique sound to different types of notification for easy
              identification.
            </p>
          </div>
          <select
            value={settings.customSound}
            onChange={(e) =>
              setSettings((prev) => ({ ...prev, customSound: e.target.value }))
            }
            className="border rounded-md px-3 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="Snooze">Snooze</option>
            <option value="Default">Default</option>
          </select>
        </div>

        {/* Save & Cancel */}
        <div className="flex gap-3 mt-6">
          <button className="px-6 py-2 rounded-lg bg-purple-500 text-white font-medium hover:bg-purple-600">
            Save
          </button>
          <button className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300">
            Cancel
          </button>
        </div>
      </div>

      {/* ================= NOTIFICATION LIST ================= */}
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-3xl">
        <h2 className="text-lg font-semibold mb-4">All Notifications</h2>

        <ul className="divide-y divide-gray-200">
          {notifications.map((n) => (
            <li key={n.id} className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <img
                  src={n.avatar}
                  alt={n.user}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-gray-800 font-medium">
                    {n.user}{" "}
                    <span className="text-gray-600 font-normal">{n.action}</span>
                  </p>
                  <p className="text-sm text-gray-500">{n.time}</p>
                </div>
              </div>
              <button className="text-purple-500 text-sm hover:underline">
                View
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notification;
