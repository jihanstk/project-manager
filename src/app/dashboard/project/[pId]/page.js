"use client";

import { userDB } from "@/DB/user";
import { useTasksStore } from "@/TaskStore/Tasks";
import { Button, DatePicker, Form, Input, Select, Space } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";

import EditModal from "@/components/common/EditModal/EditModal";
import { Card } from "antd";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoIosArrowRoundForward } from "react-icons/io";

const { Option } = Select;
// const layout = {
//   labelCol: {
//     span: 14,
//   },
//   wrapperCol: {
//     span: 16,
//   },
// };
const tailLayout = {
  wrapperCol: {
    offset: 2,
    span: 20,
  },
};
const Page = ({ params }) => {
  const tasks = useTasksStore((state) => state.tasksState.tasks);
  const assignTask = useTasksStore((state) => state.assignTask);
  const assignTaskDelete = useTasksStore((state) => state.assignTaskDelete);
 
  const [singleTask, setSingleTask] = useState({});
  useEffect(() => {
    const task = tasks.find((task) => task.id == params.pId);
    console.log("task:", task);
    setSingleTask(task);
  }, [tasks, params.pId]);
  console.log(singleTask);
  const [form] = Form.useForm();
  
  const onFinish = (values) => {
    console.log("values :", values);
    const AssignTask = {
      ...values,
      status: "To Do",
      id: tasks.length + 1,
    };
    assignTask(singleTask.id,AssignTask)
  };
  const onReset = () => {
    form.resetFields();
  };
  const onFill = () => {
    form.setFieldsValue({
      taskName: "Make Banner",
      user: singleTask.members,
    });
  };
  const handleAssignStatusChange = (status, id) => {
    editAssignTask({ status: status }, id);
  };
  const handleDeleteAssignTask = (id) => {
    assignTaskDelete(singleTask.id,id );
  };
  return (
    <section className="pr-3 mb-10">
      <div>
        <div className="bg-sky-700 h-52 w-full rounded-xl relative">
          <Image
            width={100}
            height={100}
            className="rounded-full w-20 h-20 border-4 object-cover absolute -bottom-10 left-4"
            src={singleTask?.photo}
            alt="image"
          />
        </div>
      </div>
        <h1 className="text-3xl font-bold ml-28"> {singleTask?.projectName}</h1>
      <div className="flex">
        <div className="lg:w-3/6 md:w-3/6 w-5/6 mt-20 ">
          <div className="">
            <h2 className="text-xl font-bold mr-20 mb-7">Assign Task</h2>
            <Form
              form={form}
              name="control-hooks"
              onFinish={onFinish}
              style={{
                maxWidth: 600,
              }}
            >
              <Form.Item
                name="taskName"
                label="Task Name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="deadline"
                label="Task Duration"
                rules={[
                  {
                    required: true,
                    message: "Please choose the dateTime",
                  },
                ]}
              >
                <DatePicker.RangePicker
                  style={{
                    width: "100%",
                  }}
                  getPopupContainer={(trigger) => trigger.parentElement}
                />
              </Form.Item>
              <Form.Item
                name="user"
                label="Assigned User"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  placeholder="Select a option and change input text above"
                  allowClear
                >
                  {userDB.map((user, i) => (
                    <Option key={i} value={user.email}>
                      {user.email}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="taskDescription"
                label="Task Description"
                rules={[
                  {
                    required: true,
                    message: "please enter Task description",
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="please enter Task description"
                />
              </Form.Item>
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues.gender !== currentValues.gender
                }
              >
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Space>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                  <Button htmlType="button" onClick={onReset}>
                    Reset
                  </Button>
                  <Button type="link" htmlType="button" onClick={onFill}>
                    Fill form
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
          <div className="grid grid-cols-3 gap-3">
                
            {singleTask?.task?.map((t, i) => (
              <motion.section
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="mt-3"
              draggable
              onDragStart={() => setActiveTaskIndex(t.id)}
              // onDragEnd={() => setActiveTaskIndex(null)}
            >
              <Card className="">
                <div className="">
                  <Link href={`/dashboard/project/${t.id}`}>
                    {" "}
                    <h3 className="text-xl font-semibold">{t.taskName}</h3>
                  </Link>
                  <p className="line-clamp-2 my-2 text-slate-400">{t.taskDescription}</p>
                  <p className="flex items-center gap-4">
                    <span className="px-2 bg-green-500 p-1 rounded-md text-xs text-white">
                      {t.status}
                    </span>
                    {t?.status?.toLowerCase() === "to do" ? (
                      <span
                        onClick={() => handleAssignStatusChange("In Progress", t.id)}
                        className="group px-2 bg-green-500 p-1 rounded-md text-xs text-white flex items-center cursor-pointer"
                      >
                        In Progress{" "}
                        <IoIosArrowRoundForward className="w-4 h-4 group-hover:translate-x-2 duration-300 " />
                      </span>
                    ) : t?.status?.toLowerCase() === "in progress" ? (
                      <span
                        onClick={() => handleAssignStatusChange("Done", t.id)}
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
                  <EditModal id={t.id} />
                  <FaRegTrashCan
                    onClick={() => handleDeleteAssignTask(t.id)}
                    className="text-lg cursor-pointer"
                  />
                </div>
              </Card>
            </motion.section>
            ))}
          </div>
    </section>
  );
};

export default Page;
