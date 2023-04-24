import { useChangeSide } from '../../hooks/useChangeSide';
import { Auth } from '../Auth/Auth';
import { DefaultContentComponent } from '../Content/DefaultContentComponent';
import { Logout } from '../Logout/Logout';
import { NavigationBar } from '../NavigationBar/NavigationBar';
import { Registration } from '../Registration/Registration';
// import { Error } from '../NotFound/Error';
import { SideLayout } from '../SideLayout/SideLayout';
import { ChatPage } from '../SidePages/ChatPage/ChatPage';

import styles from './Cube.module.css';

export const Cube = () => {
  const { containerRef, cubeRef, isAuth } = useChangeSide()

  return (
    <div className={styles.cube_section}>
      <div className={styles.cube_inner_section}>
        <div ref={containerRef} className={styles.container}>
          <div ref={cubeRef} className={`${styles.cube} ${styles.current_side}`}>
            {/* <Error /> */}
            <div className={`${styles.side} ${styles.front}`}>
              <SideLayout
                navigationComponent={<NavigationBar />}
                contentComponent={isAuth ? <ChatPage /> : <Auth />}
              />
            </div>  
            <div className={`${styles.side} ${styles.back}`}>
              <SideLayout
                navigationComponent={<NavigationBar />}
                contentComponent={<DefaultContentComponent label="BACK" />}
              />
            </div>
            <div className={`${styles.side} ${styles.right}`}>
              <SideLayout
                navigationComponent={<NavigationBar />}
                contentComponent={isAuth ? <DefaultContentComponent label="RIGHT" /> : <Registration />}
              />
            </div>
            <div className={`${styles.side} ${styles.left}`}>
              <SideLayout
                navigationComponent={<NavigationBar />}
                contentComponent={<DefaultContentComponent label="LEFT" />}
              />
            </div>
            <div className={`${styles.external_top_side}`}></div>
            <div className={`${styles.side} ${styles.top} ${styles.inner_top_and_bottom_side}`}>
              <SideLayout
                navigationComponent={<NavigationBar />}
                contentComponent={<DefaultContentComponent label="TOP" />}
              />
            </div>
            <div className={`${styles.external_bottom_side}`}></div>
            <div className={`${styles.side} ${styles.bottom} ${styles.inner_top_and_bottom_side}`}>
              <SideLayout
                navigationComponent={<NavigationBar />}
                contentComponent={isAuth ? <Logout /> : <DefaultContentComponent label="BOTTOM" />}
                />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
