export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export const Breakpoints = {
  mobile: 640,
  tablet: 1024,
  desktop: 1280,
};

export const getDeviceType = (width: number): DeviceType => {
  if (width < Breakpoints.mobile) return 'mobile';
  if (width < Breakpoints.tablet) return 'tablet';
  return 'desktop';
};