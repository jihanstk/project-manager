"use client";
import { useTasksStore } from "@/TaskStore/Tasks";

import { Card } from "antd";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoIosArrowRoundForward } from "react-icons/io";
import EditModal from "../EditModal/EditModal";

const { Meta } = Card;

const AssignTaskCard = ({ task }) => {
  const setActiveTaskIndex = useTasksStore((state) => state.setActiveTaskIndex);
  const removeTask = useTasksStore((state) => state.removeTasks);
  const editTask = useTasksStore((state) => state.editTasks);

  const handleStatusChange = (status, id) => {
    editTask({ status: status }, id);
  };
  const handleDeleteTask = (id) => {
    removeTask(id);
  };

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="mt-3"
      draggable
      onDragStart={() => setActiveTaskIndex(task.id)}
      // onDragEnd={() => setActiveTaskIndex(null)}
    >
      <Card style={{ width: 300 }}>
        <div className="">
          <Link href={`/dashboard/project/${task?.id}`}>
            {" "}
            <h3 className="text-xl font-semibold">{task?.projectName}</h3>
          </Link>
          <p className="line-clamp-2 my-2 text-slate-400">
            {task?.description}
          </p>
          <p className="flex items-center gap-4">
            <span className="px-2 bg-green-500 p-1 rounded-md text-xs text-white">
              {task?.status}
            </span>
            {task?.status.toLowerCase() === "to do" ? (
              <span
                onClick={() => handleStatusChange("In Progress", task?.id)}
                className="group px-2 bg-green-500 p-1 rounded-md text-xs text-white flex items-center cursor-pointer"
              >
                In Progress{" "}
                <IoIosArrowRoundForward className="w-4 h-4 group-hover:translate-x-2 duration-300 " />
              </span>
            ) : task?.status.toLowerCase() === "in progress" ? (
              <span
                onClick={() => handleStatusChange("Done", task?.id)}
                className="group px-2 bg-green-500 p-1 rounded-md text-xs text-white flex items-center cursor-pointer"
              >
                Done{" "}
                <IoIosArrowRoundForward className="w-4 h-4 group-hover:translate-x-2 duration-300 " />
              </span>
            ) : (
              ""
            )}
          </p>
        </div>

        <div className="flex justify-between border-t mt-3 pt-1 px-3">
          <EditModal id={task?.id} />
          <FaRegTrashCan
            onClick={() => handleDeleteTask(task?.id)}
            className="text-lg cursor-pointer"
          />
        </div>
      </Card>
    </motion.section>
  );
};

export default AssignTaskCard;
