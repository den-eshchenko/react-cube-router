import { FC, ReactElement, useCallback, useEffect, useRef } from "react";

import styles from './SideLayout.module.css';

type SideLayoutProps = {
  navigationComponent: ReactElement,
  headerComponent: ReactElement,
  contentComponent: ReactElement,
  footerComponent: ReactElement,
}

export const SideLayout: FC<SideLayoutProps> = ({ navigationComponent, headerComponent, contentComponent, footerComponent }) => {
  const mainContainerElement = useRef<HTMLDivElement>(null);

  const handleTransitionStart = useCallback((event: TransitionEvent) => {
    event.cancelBubble = true;

  }, []);

  useEffect(() => {
    const containerElement = mainContainerElement.current;

    containerElement?.addEventListener('transitionstart', handleTransitionStart, false);

    return () => {
      containerElement?.removeEventListener('transitionstart', handleTransitionStart, false);
    }
  }, [handleTransitionStart])

  return (
    <div ref={mainContainerElement} className={styles.main_container}>
        <div className={styles.navigation_container}>
          {navigationComponent}
        </div>
        <div className={styles.content_container}>
          <div className={styles.header}>
            {headerComponent}
          </div>
          <div className={styles.content}>
            {contentComponent}
          </div>
          <div className={styles.footer}>
            {footerComponent}
          </div>
        </div>
    </div>
  );
};