import { Dimensions, Platform } from 'react-native';
import { Breakpoints, getDeviceType, DeviceType } from '../constants/breakpoints';
import { Spacing } from '../constants/spacing';

export const useResponsive = () => {
  const { width, height } = Dimensions.get('window');
  const deviceType = getDeviceType(width);

  return {
    width,
    height,
    deviceType,
    isMobile: deviceType === 'mobile',
    isTablet: deviceType === 'tablet',
    isDesktop: deviceType === 'desktop',
  };
};

export const getTouchTargetSize = (deviceType: DeviceType, type: 'primary' | 'secondary' | 'icon' = 'primary') => {
  return Spacing.touchTarget[deviceType][type];
};

export const getCardPadding = (deviceType: DeviceType) => {
  return Spacing.card.padding[deviceType];
};

export const getCardGap = (deviceType: DeviceType) => {
  return Spacing.card.gap[deviceType];
};

export const getContainerPadding = (deviceType: DeviceType) => {
  return Spacing.container[deviceType];
};
