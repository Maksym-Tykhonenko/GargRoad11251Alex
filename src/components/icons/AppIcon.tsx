import React from 'react';
import {Image, type ImageSourcePropType, type StyleProp, type ViewStyle} from 'react-native';
import Svg, {Path} from 'react-native-svg';

import {
  appIconPaths,
  type AppIconName,
} from '../../assets/icons/paths';
import {calculatorUiIcons} from '../../data/assets';

export type {AppIconName};

type Props = {
  name: AppIconName | 'share' | 'redo' | 'empty';
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
};

const IMAGE_ICONS: Partial<Record<string, ImageSourcePropType>> = {
  share: calculatorUiIcons.share,
  redo: calculatorUiIcons.redo,
  empty: calculatorUiIcons.empty,
};

export function AppIcon({name, color = '#EBEEF5', size = 24, style}: Props) {
  const image = IMAGE_ICONS[name];
  if (image) {
    return (
      <Image
        source={image}
        style={[{width: size, height: size, tintColor: color}, style as object]}
        resizeMode="contain"
      />
    );
  }

  const icon = appIconPaths[name as AppIconName];
  if (!icon) {
    return null;
  }

  return (
    <Svg
      width={size}
      height={size}
      viewBox={icon.viewBox}
      style={style}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants">
      {icon.paths.map((d, index) => (
        <Path key={index} d={d} fill={color} />
      ))}
    </Svg>
  );
}
