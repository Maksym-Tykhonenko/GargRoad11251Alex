import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {colors, fonts, layout, radius} from '../../constants/theme';
import {AppIcon} from '../icons/AppIcon';

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export function PrimaryButton({label, onPress, style}: PrimaryButtonProps) {
  return (
    <Pressable onPress={onPress} style={style}>
      {({pressed}) => (
        <View
          style={[
            styles.PrimaryButtonShadow,
            pressed && styles.PrimaryButtonPressed,
          ]}>
          <LinearGradient
            colors={[colors.buttonGradientStart, colors.buttonGradientEnd]}
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.5}}
            style={styles.PrimaryButtonPortico}>
            <View style={styles.PrimaryButtonInner}>
              <Text style={styles.PrimaryButtonLabel}>{label}</Text>
              <AppIcon name="chevronRight" color={colors.buttonText} size={18} />
            </View>
          </LinearGradient>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  PrimaryButtonShadow: {
    backgroundColor: colors.buttonGradientEnd,
    borderRadius: radius.button,
    elevation: 8,
    shadowColor: colors.orangeBright,
    shadowOffset: {width: 0, height: 12},
    shadowOpacity: 0.4,
    shadowRadius: 15,
  },
  PrimaryButtonPortico: {
    borderRadius: radius.button,
    overflow: 'hidden',
  },

  PrimaryButtonInner: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
    height: layout.buttonHeight,
    justifyContent: 'center',
    paddingHorizontal: 22,
    paddingVertical: 16,
  },
  PrimaryButtonPressed: {
    opacity: 0.88,
  },
  PrimaryButtonLabel: {
    color: colors.buttonText,
    fontFamily: fonts.sansBold,
    fontSize: 17,
    fontWeight: '700',
  },
});

