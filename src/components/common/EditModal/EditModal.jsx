import { useTasksStore } from "@/TaskStore/Tasks";
import { EditOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Form, Input, Modal, Row } from "antd";
import { useEffect, useState } from "react";
const EditModal = ({ id }) => {
  const tasks = useTasksStore((state) => state.tasksState.tasks);
  const editTask = useTasksStore((state) => state.editTasks);
  const finishedHandler = (values) => {
    const projectTask = {
      ...values,
      task: [values.task],
      status: singleTask.status,
    };
    editTask(projectTask, id);
    setIsModalOpen(false);
    console.log(values);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [singleTask, setSingleTask] = useState({});
  useEffect(() => {
    const task = tasks.find((task) => task.id === id);
    setSingleTask(task);
  }, [tasks, id]);
  console.log(singleTask);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <EditOutlined
        onClick={showModal}
        className="text-lg cursor-pointer"
        key="edit"
      />

      <Modal
        title="Edit Your Project"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical" onFinish={finishedHandler}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="projectName"
                label="Project Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter user name",
                  },
                ]}
              >
                <Input
                  defaultValue={singleTask?.projectName}
                  placeholder="Please enter your task title"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="projectDuration"
                label="Project Duration"
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
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="members" label="Assign Members (1 Email)">
                <Input defaultValue={singleTask?.members} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="task"
                label="First Task"
                rules={[
                  {
                    required: true,
                    message: "Please choose the dateTime",
                  },
                ]}
              >
                <Input defaultValue={singleTask?.task} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "please enter url description",
                  },
                ]}
              >
                <Input.TextArea
                  defaultValue={singleTask?.description}
                  rows={4}
                  placeholder="please enter url description"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item>
                <Button htmlType="submit" type="primary">
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default EditModal;
