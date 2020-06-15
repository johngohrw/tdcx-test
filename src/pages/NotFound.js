import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from "./NotFound.module.scss";
import {Button} from 'antd';


function NotFound() {

  const history = useHistory();

  const redirect = () => {
    history.replace('/login');
  }

  return (
    <div className={styles.landingWrapper}>
      <div style={{marginBottom: '20px', textAlign: 'center'}}>
        <h1>404</h1>
        <p>The page you are looking for can not be found</p>
        </div>
      <Button type="primary" onClick={redirect}>Login</Button>
    </div>
  );
}

export default NotFound;
 