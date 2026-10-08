import {Platform} from 'react-native';

import {fonts} from './fonts';

export const DESIGN_WIDTH = 393;
export const DESIGN_HEIGHT = 852;

export const colors = {
  background: '#07090f',
  surface: '#121620',
  surfaceDeep: '#0a0c12',
  card: 'rgba(18, 22, 32, 0.72)',
  cardBorder: 'rgba(255, 255, 255, 0.1)',
  orange: '#ffb23f',
  orangeBright: '#ff7a2f',
  orangeSoft: '#ffc94a',
  buttonGradientStart: '#ffc94a',
  buttonGradientEnd: '#ff7a2f',
  progressGradientStart: '#ffc94a',
  progressGradientEnd: '#ff5a5f',
  cream: '#f4f5f8',
  body: 'rgba(235, 238, 245, 0.68)',
  bodyMuted: 'rgba(235, 238, 245, 0.6)',
  label: 'rgba(235, 238, 245, 0.55)',
  border: 'rgba(255, 255, 255, 0.15)',
  black: '#000000',
  buttonText: '#1a0d00',
  progressTrack: 'rgba(255, 255, 255, 0.12)',
  skip: '#f4f5f8',
  skipBg: 'rgba(10, 12, 18, 0.45)',
  success: '#3ddc84',
  danger: '#ff5a5f',
  white: '#ffffff',
  dotInactive: 'rgba(255, 255, 255, 0.22)',
};

export const spacing = {
  s: 8,
  m: 12,
  l: 16,
  xl: 20,
  xxl: 28,
};

export const radius = {
  card: 20,
  button: 27,
  chip: 10,
  pill: 100,
  logo: 30,
};

export const fontSize = {
  caption: 12,
  small: 14,
  body: 16,
  button: 17,
  title: 32,
  hero: 46,
};

export const layout = {
  screenPadding: 28,
  buttonHeight: 54,
  heroImageHeight: 540,
  logoSize: 128,
};

export const topInset = (value: number) =>
  Platform.OS === 'android' ? Math.max(value, 30) : value;

export {fonts};
