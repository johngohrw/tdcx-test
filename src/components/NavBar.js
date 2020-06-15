import React, {useState} from "react";
import styles from "./NavBar.module.scss";
import { Button } from "antd";
import { clearAuthToken, setProfileImg, getProfileImg } from "../utils/auth";
import { useHistory } from "react-router-dom";
import { axiosBaseConfig } from "../utils/api";
import classNames from 'classnames';

function NavBar() {
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  const handleLogOut = () => {
    clearAuthToken();
    setProfileImg(null);
    history.replace("/login");
  };

  const handleImageLoad = () => {
    setLoading(false)
  }

  return (
    <div className={styles.navBarWrapper}>
      <div className={styles.navBarContainer}>
        <div className={styles.imageContainer}>
          {loading && (
            <div
              className={classNames(
                styles.skeletonLoaderShort,
                styles.imageRounded48,
                styles.onTop
              )}
            ></div>
          )}
          <img
            className={styles.profileImg}
            src={axiosBaseConfig.baseURL + "/" + getProfileImg()}
            onLoad={handleImageLoad}
            alt="profile"
          />
        </div>
        
        <Button onClick={handleLogOut} type="link">
          Logout
        </Button>
      </div>
    </div>
  );
}

export default NavBar;
