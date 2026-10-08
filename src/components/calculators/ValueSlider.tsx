import React, {useRef} from 'react';
import {PanResponder, StyleSheet, View} from 'react-native';

type ValueSliderProps = {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
};

export function ValueSlider({min, max, step, value, onChange}: ValueSliderProps) {
  const widthRef = useRef(1);
  const ratio = Math.min(1, Math.max(0, (value - min) / (max - min || 1)));

  const setFromX = (locationX: number) => {
    const raw = min + (locationX / widthRef.current) * (max - min);
    const stepped = Math.round(raw / step) * step;
    const clamped = Math.min(max, Math.max(min, stepped));
    const digits = step < 1 ? 1 : 0;
    onChange(Number(clamped.toFixed(digits)));
  };

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: event => setFromX(event.nativeEvent.locationX),
      onPanResponderMove: event => setFromX(event.nativeEvent.locationX),
    }),
  ).current;

  return (
    <View
      style={styles.ValueSliderTrack}
      onLayout={event => {
        widthRef.current = Math.max(1, event.nativeEvent.layout.width);
      }}
      {...pan.panHandlers}>
      <View style={[styles.ValueSliderFill, {width: `${ratio * 100}%`}]} />
      <View style={[styles.ValueSliderThumb, {left: `${ratio * 100}%`}]} />
    </View>
  );
}

const styles = StyleSheet.create({
  ValueSliderTrack: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 4,
    height: 4,
    justifyContent: 'center',
    marginTop: 14,
  },
  ValueSliderFill: {
    backgroundColor: '#ffb23f',
    borderRadius: 4,
    height: 4,
  },
  ValueSliderThumb: {
    backgroundColor: '#ffb23f',
    borderRadius: 9,
    height: 18,
    marginLeft: -9,
    position: 'absolute',
    top: -7,
    width: 18,
  },
});
