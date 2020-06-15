import React, {useState, useEffect} from "react";
import styles from "./WidgetCompleted.module.scss";
import {Tag} from 'antd';

function WidgetCompleted(props) {

  const [completedTasks, setCompletedTasks] = useState(0)

  useEffect(() => {
    let completed = 0;
    props.tasks.forEach((task) => {
      if (task.completed) {
        completed += 1
      }
    })
    setCompletedTasks(completed);
  }, [props.tasks])

  return (
    <div className={styles.widgetWrapper}>
      <h2>Tasks Completed</h2>
      <div className={styles.content}>
        <div className={styles.completedValue}>{completedTasks}</div>
        <div style={{ marginRight: "20px" }}>/ {props.tasks.length}</div>
        {completedTasks === props.tasks.length && (
          <Tag color="green">well done!</Tag>
        )}
      </div>
    </div>
  );
}

export default WidgetCompleted;
