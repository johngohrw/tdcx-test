import React from "react";
import styles from "./WidgetLatestTasks.module.scss";
import _ from 'lodash';

function WidgetLatestTasks(props) {

  return (
    <div className={styles.widgetWrapper}>
      <h2>Latest Created Tasks</h2>
      <ul className={styles.taskList}>
        {
          _.take(props.tasks.sort((a, b) => {
            return a.createdAt < b.createdAt;
          }), 3).map((task) => {
            return <li className={styles.taskListItem}>
              <div className={styles.bullet}/>
              <span className={task.completed ? styles.completed : ''}>
                {task.name}
              </span>
              </li>
          })
        }
        
      </ul>
      
    </div>
  );
}

export default WidgetLatestTasks;
