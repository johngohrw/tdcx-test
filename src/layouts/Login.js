import React from 'react';
import styles from './Login.module.scss';

function LoginLayout(props) {
  return (
    <div className={styles.pageWrapper}>
      {props.children}
    </div>
  );
}

export default LoginLayout;
