import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

import {colors, fonts} from '../../constants/theme';

type CircularStatProps = {
  percent: number;
  size?: number;
  width?: number;
  tintColor?: string;
  label?: string;
  valueFontSize?: number;
};

export function CircularStat({
  percent,
  size = 48,
  width = 5,
  tintColor = colors.orange,
  label,
  valueFontSize = 14,
}: CircularStatProps) {
  return (
    <View style={[styles.CircularStatChassis, {width: size, height: size}]}>
      <AnimatedCircularProgress
        size={size}
        width={width}
        fill={Math.max(0, Math.min(100, percent))}
        tintColor={tintColor}
        backgroundColor="rgba(255,255,255,0.08)"
        rotation={0}
        lineCap="round">
        {() => (
          <View style={styles.CircularStatInner}>
            <Text style={[styles.CircularStatValue, {fontSize: valueFontSize}]}>
              {Math.round(percent)}%
            </Text>
            {label ? (
              <Text style={styles.CircularStatLabel}>{label}</Text>
            ) : null}
          </View>
        )}
      </AnimatedCircularProgress>
    </View>
  );
}

const styles = StyleSheet.create({
  CircularStatChassis: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  CircularStatInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  CircularStatValue: {
    color: colors.cream,
    fontFamily: fonts.sansBold,
    fontWeight: '700',
  },
  CircularStatLabel: {
    color: 'rgba(235,238,245,0.55)',
    fontFamily: fonts.sansRegular,
    fontSize: 9,
    marginTop: 1,
    textTransform: 'uppercase',
  },
});
