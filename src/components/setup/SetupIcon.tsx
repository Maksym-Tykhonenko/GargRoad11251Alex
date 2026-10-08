import React from 'react';
import {Image, type ImageSourcePropType} from 'react-native';
import Svg, {Path} from 'react-native-svg';

import {setupIconPaths} from '../../assets/setup/iconPaths';
import {setupIcons} from '../../data/assets';

export type SetupIconName =
  | 'back'
  | 'person'
  | 'car'
  | 'check'
  | 'info'
  | 'fuel'
  | 'bolt'
  | 'taskProfiles'
  | 'taskChecklist'
  | 'taskCalculators'
  | 'taskCards';

type Props = {
  name: SetupIconName;
  color?: string;
  size?: number;
};

const IMAGE_ICONS: Partial<Record<SetupIconName, ImageSourcePropType>> = {
  back: setupIcons.back,
  person: setupIcons.person,
  car: setupIcons.car,
  check: setupIcons.check,
  info: setupIcons.info,
  taskProfiles: setupIcons.taskProfiles,
  taskChecklist: setupIcons.taskChecklist,
  taskCalculators: setupIcons.taskCalculators,
  taskCards: setupIcons.taskCards,
};

const PATH_ICONS: Partial<Record<SetupIconName, string>> = {
  fuel: setupIconPaths.fuel,
  bolt: setupIconPaths.bolt,
};

export function SetupIcon({name, color = '#EBEEF5', size = 24}: Props) {
  const path = PATH_ICONS[name];
  if (path) {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <Path d={path} fill={color} />
      </Svg>
    );
  }

  const source = IMAGE_ICONS[name];
  if (!source) {
    return null;
  }

  return (
    <Image
      source={source}
      style={{width: size, height: size, tintColor: color}}
      resizeMode="contain"
    />
  );
}
