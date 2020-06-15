import React from 'react';
import styles from './Dashboard.module.scss';
import NavBar from '../components/NavBar';

function DashboardLayout(props) {
  return (
    <div className={styles.layoutWrapper}>
      <NavBar />
      <div className={styles.contentWrapper}>
        <div className={styles.layoutContent}>{props.children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;
