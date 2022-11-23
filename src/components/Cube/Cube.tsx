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
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
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
    
    // срабатывает по 2 раза - возможно можно чекать что уже стоит в значениях
    if (event.target === containerRef.current && event.propertyName === "font-size") {
      setSearchParams({ previousSide: side });
      setRotationStyleProperty(`/${side}`);
    }
    if (event.target === cubeRef.current && event.propertyName === "font-size") {
      setSizeStyleProperty(45);
    }
  }, [params.side, setSearchParams]);

  // смена позиции после перезагрузки страницы, если поставить useEffect, то нарисуется куб по стартовым позициям и только потом прокрутится до той что в url 
  useLayoutEffect(() => {
    const currentSide = `/${params.side}`;
    
    setRotationStyleProperty(currentSide);
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
            <div ref={frontRef} className={`${styles.side} ${styles.front}`}>
              <SideLayout
                navigationComponent={<NavigationBar />}
                headerComponent={<div>Топовый заголовок</div>}
                contentComponent={<div>Божественный контент front стороны</div>}
                footerComponent={<div>Классный подвал</div>}
              />
            </div>
            <div ref={backRef} className={`${styles.side} ${styles.back}`}>
              <SideLayout
                navigationComponent={<NavigationBar />}
                headerComponent={<div>Топовый заголовок</div>}
                contentComponent={<div>Божественный контент back стороны</div>}
                footerComponent={<div>Классный подвал</div>}
              />
            </div>
            <div ref={rightRef} className={`${styles.side} ${styles.right}`}>
              <SideLayout
                navigationComponent={<NavigationBar />}
                headerComponent={<div>Топовый заголовок</div>}
                contentComponent={<div>Божественный контент right стороны</div>}
                footerComponent={<div>Классный подвал</div>}
              />
            </div>
            <div ref={leftRef} className={`${styles.side} ${styles.left}`}>
              <SideLayout
                navigationComponent={<NavigationBar />}
                headerComponent={<div>Топовый заголовок</div>}
                contentComponent={<div>Божественный контент left стороны</div>}
                footerComponent={<div>Классный подвал</div>}
              />
            </div>
            <div ref={topRef} className={`${styles.side} ${styles.top}`}>
              <SideLayout
                navigationComponent={<NavigationBar />}
                headerComponent={<div>Топовый заголовок</div>}
                contentComponent={<div>Божественный контент top стороны</div>}
                footerComponent={<div>Классный подвал</div>}
              />
            </div>
            <div ref={bottomRef} className={`${styles.side} ${styles.bottom}`}>
              <SideLayout
                navigationComponent={<NavigationBar />}
                headerComponent={<div>Топовый заголовок</div>}
                contentComponent={<div>Божественный контент bottom стороны</div>}
                footerComponent={<div>Классный подвал</div>}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
