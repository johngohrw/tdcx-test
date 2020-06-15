import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from "./Landing.module.scss";
import {Button} from 'antd';

function Landing() {

  const history = useHistory();

  const redirect = () => {
    history.replace('/login');
  }

  return (
    <div className={styles.landingWrapper}>
      <div style={{marginBottom: '20px', textAlign: 'center'}}>
        <p>Welcome to the Demo</p>
        <p>This is a simple landing page</p>
        </div>
      <Button type="primary" onClick={redirect}>Log in</Button>
    </div>
  );
}

export default Landing;
