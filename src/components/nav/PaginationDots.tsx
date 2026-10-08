import React from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {colors, radius} from '../../constants/theme';

type PaginationDotsProps = {
  total: number;
  activeIndex: number;
};

export function PaginationDots({total, activeIndex}: PaginationDotsProps) {
  return (
    <View style={styles.PaginationDotsChassis}>
      {Array.from({length: total}).map((_, index) => {
        const isActive = index === activeIndex;

        if (isActive) {
          return (
            <LinearGradient
              key={index}
              colors={[colors.buttonGradientStart, colors.buttonGradientEnd]}
              start={{x: 0, y: 0.5}}
              end={{x: 1, y: 0.5}}
              style={styles.PaginationDotsDotActive}
            />
          );
        }

        return <View key={index} style={styles.PaginationDotsDot} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  PaginationDotsChassis: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },

  PaginationDotsDot: {
    backgroundColor: colors.dotInactive,
    borderRadius: radius.chip,
    height: 8,
    width: 8,
  },
  PaginationDotsDotActive: {
    borderRadius: 4,
    height: 8,
    width: 26,
  },
});
