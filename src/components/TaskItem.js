import React, {useState} from "react";
import { Checkbox, Button, notification } from 'antd';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import { apiRequest } from "../utils/api";
import { getAuthConfig } from "../utils/auth";
import styles from "./TaskItem.module.scss";
import classNames from 'classnames';
import TaskEditModal from './TaskEditModal';

function TaskItem(props) {

  const [loading, setLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [completed, setCompleted] = useState(props.task.completed);

  const handleCompletion = (e) => {
    setCompleted(e.target.checked)
    apiRequest
    .put(`/tasks/${props.task._id}`,{
      completed: e.target.checked
    }, getAuthConfig())
    .then((response) => {
      console.log(`task ${props.task.name} completion set successfully!`)
    })
    .catch((error) => {
      notification.error({
        message: "Something went wrong! Please try again.",
      });
    })
    .finally(()=> {
      props.fetchData(()=> {
        setLoading(false)
      })
    })
  }

  const handleEdit = () => {
    setShowEditModal(true)
  }

  const handleDelete = () => {
    setLoading(true)
    apiRequest
    .delete(`/tasks/${props.task._id}`, getAuthConfig())
    .then((response) => {
      console.log(`task ${props.task.name} deleted successfully!`)
    })
    .catch((error) => {
      notification.error({
        message: "Something went wrong! Please try again.",
      });
      setLoading(false)
    })
    .finally(()=> {
      props.fetchData(()=> {
        setLoading(false)
      })
    })
  }

  return (
    <div className={classNames(styles.taskListItem, loading ? styles.loading : '')}>
      <Checkbox onChange={handleCompletion} checked={completed}/>
      <span className={classNames(styles.taskDescription, completed ? styles.completed : '')}>{props.task.name}</span>
      <Button className={styles.actionButton} type="link" onClick={handleEdit} icon={<EditFilled />} />
      <Button className={styles.actionButton} type="link" onClick={handleDelete} icon={<DeleteFilled />} />
      <TaskEditModal
        task={props.task}
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        setLoading={setLoading}
        fetchTasks={props.fetchData}
        defaultValue={props.task.name}
      />
    </div>
  );
}

export default TaskItem;
