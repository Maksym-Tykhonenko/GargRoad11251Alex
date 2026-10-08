import {Platform} from 'react-native';

const ios = {
  condensedBoldItalic: 'System',
  sansRegular: 'System',
  sansMedium: 'System',
  sansSemiBold: 'System',
  sansBold: 'System',
};

const android = {
  condensedBoldItalic: 'sans-serif-condensed',
  sansRegular: 'sans-serif',
  sansMedium: 'sans-serif-medium',
  sansSemiBold: 'sans-serif-medium',
  sansBold: 'sans-serif',
};

const platformFonts = Platform.OS === 'ios' ? ios : android;

export const fonts = {
  condensedBoldItalic: platformFonts.condensedBoldItalic,
  sansRegular: platformFonts.sansRegular,
  sansMedium: platformFonts.sansMedium,
  sansSemiBold: platformFonts.sansSemiBold,
  sansBold: platformFonts.sansBold,
};
