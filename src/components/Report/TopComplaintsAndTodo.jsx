import React from "react";
import { CheckCircle2, Circle, AlertTriangle } from "lucide-react";

const TopComplaintsAndTodo = () => {
  const complaints = [
    { category: "Late Delivery", count: 45 },
    { category: "Wrong Order", count: 32 },
    { category: "Poor Packaging", count: 21 },
    { category: "Missing Items", count: 18 },
  ];

  const todos = [
    { task: "Respond to pending complaints", done: false },
    { task: "Check delivery partner issues", done: true },
    { task: "Verify product quality reports", done: false },
    { task: "Schedule customer feedback meeting", done: false },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      {/* Top Complaint Categories */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <AlertTriangle className="text-purple-500" /> Top Complaint Categories
        </h2>
        <ul className="space-y-3">
          {complaints.map((item, idx) => (
            <li
              key={idx}
              className="flex justify-between items-center p-3 rounded-lg bg-purple-50"
            >
              <span className="font-medium">{item.category}</span>
              <span className="text-sm text-gray-600">{item.count} reports</span>
            </li>
          ))}
        </ul>
      </div>

      {/* To Do List */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">To-Do List</h2>
        <ul className="space-y-3">
          {todos.map((todo, idx) => (
            <li
              key={idx}
              className="flex items-center gap-3 p-3 rounded-lg border border-gray-200"
            >
              {todo.done ? (
                <CheckCircle2 className="text-green-500" />
              ) : (
                <Circle className="text-gray-400" />
              )}
              <span
                className={`${
                  todo.done ? "line-through text-gray-500" : "text-gray-800"
                }`}
              >
                {todo.task}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TopComplaintsAndTodo;
