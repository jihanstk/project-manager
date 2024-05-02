"use client";
import useTasks from "@/lib/Queries/useTasks";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import axios from "axios";
import { useState } from "react";
const { Option } = Select;
const TaskDrower = () => {
  const [open, setOpen] = useState(false);
  const[,refetch]=useTasks()
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const finishedHandler = (values) => {
    const projectTask={
      ...values,
      task:[values.task],
      status:"To Do"
    }
    axios.post("https://6630ec7fc92f351c03db97ac.mockapi.io/tasks",projectTask)
    .then(res=>{
      console.log(res.data)
      refetch()
    })
    console.log(values);
  };
  return (
    <>
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        Add Project
      </Button>
      <Drawer
        title="Create a new account"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        onFinish={finishedHandler}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            
          </Space>
        }
      >
        <Form layout="vertical"  onFinish={finishedHandler}>
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
                <Input placeholder="Please enter your task title" />
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
                <Input />
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
                <Input />
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
                  rows={4}
                  placeholder="please enter url description"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
              >
                 <Button onClick={onClose} htmlType="submit"  type="primary">
              Submit
            </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
export default TaskDrower;
