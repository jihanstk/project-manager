"use client";
import React from "react";
import DropZon from "../TaskCard/DropZon";
import TaskCard from "../TaskCard/TaskCard";
const TaskColumn = ({ status, tasks,onDrop }) => {
  return (
    <section className="border-r px-4 w-full ">
      <h2 className="text-center text-xl font-bold py-3">{status}</h2>
      <hr />
      <DropZon onDrop={()=>onDrop(status,0)}/>
      {tasks?.map((task,index) => {
        return task.status.toLowerCase() == status.toLowerCase()&& <React.Fragment key={task.id}>
            <TaskCard task={task} />
            <DropZon onDrop={()=>onDrop(status,index,task.id)}  />
        </React.Fragment>
      })}

    </section>
  );
};

export default TaskColumn;
