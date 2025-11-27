import { useState } from "react";

export default function Preference() {
  const [syncWithSystem, setSyncWithSystem] = useState(true);
  const [accentColor, setAccentColor] = useState("#B476FF");
  const [theme, setTheme] = useState("light");
  const [grouping, setGrouping] = useState(true);
  const [ordering, setOrdering] = useState(true);
  const [subIssues, setSubIssues] = useState(true);

  const colors = [
    "#000000",
    "#3F3F46",
    "#6B7280",
    "#8B5CF6",
    "#6366F1",
    "#3B82F6",
    "#22D3EE",
    "#A855F7",
    "#E5E7EB",
  ];

  return (
    <div className="space-y-8">
      {/* Intro */}
      <div>
        <h2 className="text-gray-700 text-sm">
          Select how you would like your interface to look. <br />
          Select a theme or sync with your system and have automatic theme
          switching.
        </h2>
      </div>

      {/* Sync with System */}
      <div className="flex items-center justify-between border-b pb-4">
        <h3 className="text-gray-700 font-medium">Sync with system</h3>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={syncWithSystem}
            onChange={() => setSyncWithSystem(!syncWithSystem)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-purple-500 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
        </label>
      </div>

      {/* Accent Color */}
      <div className="border-b pb-6">
        <h3 className="text-gray-700 font-medium mb-3">Accent colour</h3>
        <div className="flex items-center gap-3 flex-wrap">
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => setAccentColor(c)}
              className={`w-8 h-8 rounded-full border-2 ${
                accentColor === c ? "border-purple-500" : "border-transparent"
              }`}
              style={{ backgroundColor: c }}
            ></button>
          ))}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Custom</span>
            <input
              type="color"
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              className="w-10 h-8 rounded border cursor-pointer"
            />
            <span className="text-sm text-gray-600">{accentColor}</span>
          </div>
        </div>
      </div>

      {/* Interface Theme */}
      {/* <div className="border-b pb-6">
        <h3 className="text-gray-700 font-medium mb-4">Interface theme</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { id: "light", title: "Light Theme" },
            { id: "dark", title: "Dark Theme" },
            { id: "system", title: "System" },
          ].map((t) => (
            <div
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`cursor-pointer rounded-lg border-2 p-3 ${
                theme === t.id ? "border-purple-500" : "border-gray-200"
              }`}
            >
              <div className="h-32 bg-gray-100 rounded mb-2 flex items-center justify-center">
                <span className="text-gray-500">{t.title}</span>
              </div>
              <p className="text-sm text-gray-600">{t.title} preview...</p>
            </div>
          ))}
        </div>
        <div className="flex gap-3 mt-4">
          <button className="px-4 py-2 rounded-md bg-purple-500 text-white">
            Save
          </button>
          <button className="px-4 py-2 rounded-md bg-gray-200 text-gray-700">
            Cancel
          </button>
        </div>
      </div> */}

      {/* Toggles */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Grouping</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={grouping}
              onChange={() => setGrouping(!grouping)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-purple-500 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-700">Ordering</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={ordering}
              onChange={() => setOrdering(!ordering)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-purple-500 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-700">Show sub-issues</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={subIssues}
              onChange={() => setSubIssues(!subIssues)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-purple-500 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
          </label>
        </div>
      </div>

      {/* Reset & Save */}
      <div className="flex justify-between items-center border-t pt-6">
        <button className="text-gray-500">Reset to default</button>
        <div className="flex gap-3">
          <button className="px-5 py-2 rounded-md bg-gray-200 text-gray-700">
            Cancel
          </button>
          <button className="px-5 py-2 rounded-md bg-purple-500 text-white">
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}
