import React from 'react';
import Svg, {Circle, Path, Rect} from 'react-native-svg';

import type {KnowledgeIcon} from '../../types/knowledge';

type Props = {
  name: KnowledgeIcon;
  color: string;
  size?: number;
};

export function KnowledgeGlyph({name, color, size = 24}: Props) {
  const common = {width: size, height: size, viewBox: '0 0 24 24'};
  switch (name) {
    case 'bolt':
      return (
        <Svg {...common}>
          <Path d="M13 2 4 14h7l-1 8 10-14h-7l0-6z" fill={color} />
        </Svg>
      );
    case 'swirl':
      return (
        <Svg {...common}>
          <Path
            d="M12 3a9 9 0 1 0 8.2 5.4"
            stroke={color}
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
          />
          <Circle cx="12" cy="12" r="3.2" stroke={color} strokeWidth={2} fill="none" />
          <Circle cx="12" cy="12" r="1.2" fill={color} />
        </Svg>
      );
    case 'drop':
      return (
        <Svg {...common}>
          <Path
            d="M12 3s6 6.2 6 10.2A6 6 0 0 1 6 13.2C6 9.2 12 3 12 3z"
            fill={color}
          />
        </Svg>
      );
    case 'wind':
      return (
        <Svg {...common}>
          <Path
            d="M4 8h10a2.5 2.5 0 1 0-2.5-2.5M4 12h14a2.5 2.5 0 1 1-2.5 2.5M4 16h8"
            stroke={color}
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
          />
        </Svg>
      );
    case 'battery':
      return (
        <Svg {...common}>
          <Rect x="3" y="7" width="16" height="10" rx="2" stroke={color} strokeWidth={2} fill="none" />
          <Path d="M19 10h2v4h-2" fill={color} />
          <Path d="M6 12h8" stroke={color} strokeWidth={2} strokeLinecap="round" />
        </Svg>
      );
    case 'chip':
      return (
        <Svg {...common}>
          <Rect x="7" y="7" width="10" height="10" rx="2" stroke={color} strokeWidth={2} fill="none" />
          <Path d="M9 3v4M12 3v4M15 3v4M9 17v4M12 17v4M15 17v4M3 9h4M3 12h4M3 15h4M17 9h4M17 12h4M17 15h4" stroke={color} strokeWidth={2} strokeLinecap="round" />
        </Svg>
      );
    case 'wrench':
      return (
        <Svg {...common}>
          <Path
            d="M14.5 6.5a4 4 0 0 0-5.6 5.6L4 17l3 3 4.9-4.9a4 4 0 0 0 5.6-5.6l-2.2 2.2-2.8-2.8 2-2.4z"
            fill={color}
          />
        </Svg>
      );
    case 'flame':
      return (
        <Svg {...common}>
          <Path
            d="M12 3s5 4 5 8.2A5 5 0 1 1 8.2 8.5C9.4 10 11 10.2 11 10.2 11 7.5 12 3 12 3z"
            fill={color}
          />
        </Svg>
      );
    default:
      return (
        <Svg {...common}>
          <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth={2} fill="none" />
          <Path
            d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M18.4 5.6l-1.6 1.6M7.2 16.8 5.6 18.4"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
          />
        </Svg>
      );
  }
}
