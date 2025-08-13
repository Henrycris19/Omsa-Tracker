import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

export const useResponsive = () => {
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenWidth(window.width);
      setScreenHeight(window.height);
    });

    return () => subscription?.remove();
  }, []);

  const isMobile = screenWidth < 768;
  const isTablet = screenWidth >= 768 && screenWidth < 1024;
  const isDesktop = screenWidth >= 1024;
  const isSmallScreen = screenHeight < 600;

  return {
    screenWidth,
    screenHeight,
    isMobile,
    isTablet,
    isDesktop,
    isSmallScreen,
  };
};
