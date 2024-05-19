"use client";
import { useTasksStore } from "@/TaskStore/Tasks";
import TaskDrower from "@/components/TaskCard/TaskDrower";
import TaskColumn from "@/components/TaskColumn/TaskColumn";
const Taskrander = () => {
  const taskIndex = useTasksStore((state) => state.tasksState.taskIndex);

  const tasks = useTasksStore((state) => state.tasksState.tasks);
  const taskUpdate = useTasksStore((state) => state.TaskUpdate);

  const onDrop = (status, position, id) => {
    if (taskIndex === undefined || taskIndex === null) return;
    const taskToMove = tasks[taskIndex];

    console.log("id :", id, "position :", position, "status:", status);
    const [movedTask] = tasks.filter((task) => task.id === id);
    console.log("movedTask :", movedTask);
    // const updatedTask = tasks.filter((t) => t.id !== id);
    console.log("tasks :", tasks);
    // updatedTask.splice(position - 1, 0, { ...movedTask, status: status });
    movedTask.status = status;
    console.log("updatedTask :", movedTask);
    taskUpdate(movedTask, position);
  };
  return (
    <div>
      <div className="border mt-2 py-3 px-4 rounded-md">
        {/* <button className="bg-gradient-to-r from-blue-500 via-sky-400 to-sky-600 px-4 py-2 rounded-lg  flex items-center gap-1 text-white font-bold">
          <GoPlus className="w-5  h-5 font-bold" />
           */}
        <TaskDrower />
        {/* </button> */}
      </div>
      <div className="flex justify-between  gap-3 w-11/12 mx-auto">
        <TaskColumn onDrop={onDrop} tasks={tasks} status="To Do" />
        <TaskColumn onDrop={onDrop} tasks={tasks} status="In Progress" />
        <TaskColumn onDrop={onDrop} tasks={tasks} status="Done" />
      </div>
    </div>
  );
};

export default Taskrander;
