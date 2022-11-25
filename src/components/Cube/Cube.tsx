import { useCallback, useLayoutEffect, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { setRotationStyleProperty } from '../../utils/setRotationStyleProperty';
import { setSizeStyleProperty } from '../../utils/setSizeStyleProperty';
import { NavigationBar } from '../NavigationBar/NavigationBar';
import { SideLayout } from '../SideLayout/SideLayout';

import styles from './Cube.module.css';

export const CubeRouting = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const [, setSearchParams] = useSearchParams();

  // useEffect(() => {
  //   let rotateY = 0;
	// 	let rotateX = 0;

	//   document.onkeydown = function (e) {
  //     if (e.keyCode === 37) rotateY -= 4
  //     if (e.keyCode === 38) rotateX += 4
  //     if (e.keyCode === 39) rotateY += 4
  //     if (e.keyCode === 40) rotateX -= 4

  //   if (cubeRef.current) {
  //     cubeRef.current.style.transform = 
  //     'rotateY(' + rotateY + 'deg)'+
  //     'rotateX(' + rotateX + 'deg)';
  //   }
  //   }
  // }, []);


  const handleTransitionEnd = useCallback((event: TransitionEvent) => {
    event.stopPropagation();
    event.stopImmediatePropagation();
    const side = params.side || '';
    
    if (event.target === containerRef.current) {
      setSearchParams({ previousSide: side });
      setRotationStyleProperty(`/${side}`);
    }
    if (event.target === cubeRef.current) {
      setSizeStyleProperty('1, 1, 1');
    }
  }, [params.side, setSearchParams]);

  // смена позиции после перезагрузки страницы, если поставить useEffect, то нарисуется куб по стартовым позициям и только потом прокрутится до той что в url 
  useLayoutEffect(() => {
    const currentSide = `/${params.side}`;
    
    setRotationStyleProperty(currentSide);
    document.documentElement.style.setProperty("--window-width", `${window.innerWidth}px`);
    document.documentElement.style.setProperty("--window-height", `${window.innerHeight}px`);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // смена previousSide после анимации поворота
  useLayoutEffect(() => {
    const containerElement = containerRef.current;

    containerElement?.addEventListener('transitionend', handleTransitionEnd, false);

    return () => {
      containerElement?.removeEventListener('transitionend', handleTransitionEnd, false);
    };
  }, [handleTransitionEnd]);

  return (
    <div className={styles.cube_section}>
      <div className={styles.cube_inner_section}>
        <div ref={containerRef} className={styles.container}>
          <div ref={cubeRef} className={`${styles.cube} ${styles.current_side}`}>
            <div className={`${styles.side} ${styles.front}`}>
              <SideLayout
                navigationComponent={<NavigationBar />}
                headerComponent={<div>Топовый заголовок</div>}
                contentComponent={<div>Божественный контент FRONT стороны</div>}
                footerComponent={<div>Классный подвал</div>}
              />
            </div>
            <div className={`${styles.side} ${styles.back}`}>
              <SideLayout
                navigationComponent={<NavigationBar />}
                headerComponent={<div>Топовый заголовок</div>}
                contentComponent={<div>Божественный контент BACK стороны</div>}
                footerComponent={<div>Классный подвал</div>}
              />
            </div>
            <div className={`${styles.side} ${styles.right}`}>
              <SideLayout
                navigationComponent={<NavigationBar />}
                headerComponent={<div>Топовый заголовок</div>}
                contentComponent={<div>Божественный контент RIGHT стороны</div>}
                footerComponent={<div>Классный подвал</div>}
              />
            </div>
            <div className={`${styles.side} ${styles.left}`}>
              <SideLayout
                navigationComponent={<NavigationBar />}
                headerComponent={<div>Топовый заголовок</div>}
                contentComponent={<div>Божественный контент LEFT стороны</div>}
                footerComponent={<div>Классный подвал</div>}
              />
            </div>
            <div className={`${styles.external_top_side}`}></div>
            <div className={`${styles.side} ${styles.top} ${styles.inner_top_and_bottom_side}`}>
              <SideLayout
                navigationComponent={<NavigationBar />}
                headerComponent={<div>Топовый заголовок</div>}
                contentComponent={<div>Божественный контент TOP стороны</div>}
                footerComponent={<div>Классный подвал</div>}
              />
            </div>
            <div className={`${styles.external_bottom_side}`}></div>
            <div className={`${styles.side} ${styles.bottom} ${styles.inner_top_and_bottom_side}`}>
              <SideLayout
                navigationComponent={<NavigationBar />}
                headerComponent={<div>Топовый заголовок</div>}
                contentComponent={<div>Божественный контент BOTTOM стороны</div>}
                footerComponent={<div>Классный подвал</div>}
                />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
