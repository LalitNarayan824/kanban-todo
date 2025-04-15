import React from "react";
import { useKbStore } from "../store/kanbanStore";

const TaskCard = ({ task }) => {
  if (!task) {
    return (
      <div className="card bg-neutral text-neutral-content w-96 p-4 rounded-lg shadow-lg">
        Task data is missing.
      </div>
    );
  }
  const { moveTask, deleteTask } = useKbStore();

  const moveLeft = (task) => {
    const order = ["todo", "in-progress", "done"];
    const currIndex = order.indexOf(task.status);
    if (currIndex > 0) {
      moveTask(task.id, order[currIndex - 1]);
    }
  };
  const moveRight = (task) => {
    const order = ["todo", "in-progress", "done"];
    const currIndex = order.indexOf(task.status);
    if (currIndex < order.length - 1) {
      moveTask(task.id, order[currIndex + 1]);
    }
  };

  return (
    <div className="card bg-white text-gray-800 w-96 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="card-body">
        <h2 className="card-title text-xl font-bold mb-2 text-center">
          {task?.title || "Untitled Task"}
        </h2>
        <p className="text-sm text-gray-600 mb-4 text-center">
          {task?.description || "No description available."}
        </p>
        <div className="card-actions flex justify-between">
          <button
            className="btn btn-primary btn-sm px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            onClick={() => moveLeft(task)}
          >
            Move Left
          </button>
          <button
            className="btn btn-info btn-sm px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
            onClick={() => moveRight(task)}
          >
            Move Right
          </button>
          <button
            className="btn btn-error btn-sm px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
            onClick={() => deleteTask(task.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
