import React, {useState} from "react";
import styles from "./TaskAddModal.module.scss";
import { apiRequest } from "../utils/api";
import { getAuthConfig } from "../utils/auth";
import { Modal, Form, Button, Input, notification } from "antd";

function TaskAddModal(props) {

  const [loading, setLoading] = useState(false);
  
  const handleCancel = () => {
    props.setShowModal(false);
  };

  const onTaskAdd = (values) => {
    setLoading(true)
    apiRequest
      .post(
        `/tasks`,
        {name: values.name},
        getAuthConfig()
      )
      .then((response) => {
        notification.success({
          message: response.data.msg,
        });
        props.setShowModal(false);
        
      })
      .catch((error) => {
        console.log(error);
        notification.error({
          message: "Something went wrong! Please try again.",
        });
        
      })
      .finally(()=> {
        setLoading(false)
        props.fetchTasks();
      })
  }

  const onTaskAddFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      className={styles.modal}
      visible={props.showModal}
      onCancel={handleCancel}
      footer={null}
    >
      <h2 style={{ marginBottom: "25px" }}>New Task</h2>
      <Form name="basic" onFinish={onTaskAdd} onFinishFailed={onTaskAddFailed}>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please enter a task!" }]}
        >
          <Input placeholder="Task name"/>
        </Form.Item>
        <Form.Item style={{ marginBottom: "0" }}>
          <Button
            type="primary"
            htmlType="submit"
            disabled={loading}
            className={styles.submitButton}
          >
            Add Task
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default TaskAddModal;
