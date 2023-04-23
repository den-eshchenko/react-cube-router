import { useCallback, useRef, useLayoutEffect, useEffect } from 'react'
import { useLocation, useParams } from "react-router-dom";
import { rotateStrategy } from '..';
import { useAppSelector } from '../app/store';
import { setRotationStyleProperty } from '../utils/setRotationStyleProperty';
import { setSizeStyleProperty } from '../utils/setSizeStyleProperty';

export const useChangeSide = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const cubeRef = useRef<HTMLDivElement>(null)
  const params = useParams()
  const location = useLocation()
  const isAuth = useAppSelector((store) => store.auth.isAuth)

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
    const side = params.side || '';

    rotateStrategy.strategy.handleTransitionEnd({
      event,
      side,
      containerRef: containerRef.current,
      cubeRef: cubeRef.current
    })
  }, [params.side]);

  const handleResizeWindow = () => {
    setSizeStyleProperty(window.innerWidth, window.innerHeight)
  }

  useLayoutEffect(() => {
    const currentSide = `/${params.side}`;
    
    rotateStrategy.setCurrentSide(currentSide)
    setRotationStyleProperty(currentSide);
    setSizeStyleProperty(window.innerWidth, window.innerHeight)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    const containerElement = containerRef.current;

    containerElement?.addEventListener('transitionend', handleTransitionEnd, false);

    return () => {
      containerElement?.removeEventListener('transitionend', handleTransitionEnd, false);
    };
  }, [handleTransitionEnd]);

  useEffect(() => {
    rotateStrategy.runRotate({ nextSide: location.pathname, scale: '.5, .5, .5' })
  }, [location])

  useEffect(() => {
    window.addEventListener('resize', handleResizeWindow)

    return () => {
      window.removeEventListener('resize', handleResizeWindow)
    }
  }, [])

  return {
    containerRef,
    cubeRef,
    isAuth,
  }
}