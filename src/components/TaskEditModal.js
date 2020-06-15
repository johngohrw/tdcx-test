import React, {useState} from "react";
import styles from "./TaskEditModal.module.scss";
import { apiRequest } from "../utils/api";
import { getAuthConfig } from "../utils/auth";
import { Modal, Form, Button, Input, notification } from "antd";

function TaskEditModal(props) {

  const [loading, setLoading] = useState(false);
  
  const handleCancel = () => {
    props.setShowModal(false);
  };

  const onTaskEdit = (values) => {
    setLoading(true)
    props.setLoading(true)
    apiRequest
    .put(`/tasks/${props.task._id}`,{
      name: values.name
    }, getAuthConfig())
    .then((response) => {
      notification.success({
        message: response.data.msg,
      });
      console.log(`task ${props.task.name} edited successfully!`)
      props.setShowModal(false);
      
    })
    .catch((error) => {
      notification.error({
        message: "Something went wrong! Please try again.",
      });
      
    })
    .finally(()=> {
      setLoading(false)
      props.fetchTasks(()=> {
        console.log('done loading')
        props.setLoading(false)
      });
    })
  }

  const onTaskEditFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      className={styles.modal}
      visible={props.showModal}
      onCancel={handleCancel}
      footer={null}
    >
      <h2 style={{ marginBottom: "25px" }}>Edit Task</h2>
      <Form name="basic" onFinish={onTaskEdit} onFinishFailed={onTaskEditFailed}>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please enter a task!" }]}
        >
          <Input placeholder="Task name" defaultValue={props.defaultValue}/>
        </Form.Item>
        <Form.Item style={{ marginBottom: "0" }}>
          <Button
            type="primary"
            htmlType="submit"
            disabled={loading}
            className={styles.submitButton}
          >
            Edit Task
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default TaskEditModal;
