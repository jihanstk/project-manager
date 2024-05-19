"use client";
import { useTasksStore } from "@/TaskStore/Tasks";
import React from "react";
import DropZon from "../TaskCard/DropZon";
import TaskCard from "../TaskCard/TaskCard";
const TaskColumn = ({ status, tasks, onDrop }) => {
  const taskIndex = useTasksStore((state) => state.tasksState.taskIndex);
  console.log(taskIndex);
  return (
    <section className="border-r px-4 w-full ">
      <h2 className="text-center text-xl font-bold py-3">{status}</h2>
      <hr />
      <DropZon onDrop={() => onDrop(status, 0, taskIndex)} />
      {tasks?.map((task, index) => {
        return (
          task?.status?.toLowerCase() == status.toLowerCase() && (
            <React.Fragment key={task.id}>
              <TaskCard task={task} />
              <DropZon onDrop={() => onDrop(status, index + 1, task.id)} />
            </React.Fragment>
          )
        );
      })}
    </section>
  );
};

export default TaskColumn;
