import React from "react";
import styles from "./EmptyList.module.scss";
import classNames from "classnames";
import { Button } from "antd";

function EmptyList(props) {

  return (
    <div className={styles.emptyListWrapper}>
      <div className={classNames(styles.card, styles.emptyList)}>
        <h3>You have no tasks.</h3>
        <Button type="primary" onClick={props.buttonHandler}>New Task</Button>
      </div>
    </div>
  );
}

export default EmptyList;
