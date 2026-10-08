import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { APP_TAGLINE } from '../constants/brand';
import { colors, fonts, fontSize } from '../constants/theme';
import { icons } from '../data/assets';
import { LOADER_DURATION_MS, LOADER_STATUS_MESSAGES } from '../data/loader';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'LoaderScreen'>;

export function LoaderScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const progress = useRef(new Animated.Value(0)).current;
  const onCompleteRef = useRef(() => navigation.navigate('OnboardingScreen'));
  const [percentLabel, setPercentLabel] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  onCompleteRef.current = () => navigation.navigate('OnboardingScreen');

  useEffect(() => {
    let cancelled = false;
    let didComplete = false;

    const complete = () => {
      if (cancelled || didComplete) {
        return;
      }
      didComplete = true;
      setPercentLabel(100);
      setStatusIndex(LOADER_STATUS_MESSAGES.length - 1);
      onCompleteRef.current();
    };

    progress.setValue(0);
    

    const listenerId = progress.addListener(({ value }) => {
      if (cancelled) {
        return;
      }
      setPercentLabel(Math.min(100, Math.round(value * 100)));
      setStatusIndex(
        Math.min(
          LOADER_STATUS_MESSAGES.length - 1,
          Math.floor(value * LOADER_STATUS_MESSAGES.length),
        ),
      );
    });

    const animation = Animated.timing(progress, {
      toValue: 1,
      duration: LOADER_DURATION_MS,
      useNativeDriver: false,
    });

    animation.start(({ finished }) => {
      if (finished) {
        complete();
      }
    });

    const timer = setTimeout(complete, LOADER_DURATION_MS);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      progress.removeListener(listenerId);
      animation.stop();
    };
  }, [progress]);

  const fillWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.LoaderScreenChassis}>
      <Image
        source={icons.loaderBg}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: windowWidth,
          height: windowHeight,
        }}
        resizeMode="cover"
      />

      <ScrollView
        style={styles.LoaderScreenScroll}
        contentContainerStyle={[
          styles.LoaderScreenScrollContent,
          {
            minHeight: windowHeight,
            paddingTop: insets.top + 24,
            paddingBottom: Math.max(insets.bottom, 16) + 48,
          },
        ]}
        showsVerticalScrollIndicator={false}
        bounces
      >
        <View style={styles.LoaderScreenCenter}>
          <Image
            source={icons.loaderLogo}
            style={styles.LoaderScreenLogo}
            resizeMode="contain"
          />
          <Text style={styles.LoaderScreenBrandWhite}>Garage</Text>
          <Text style={styles.LoaderScreenBrandWhite}>
            Road Ready <Text style={styles.LoaderScreenBrandAccent}>Hub</Text>
          </Text>
          <Text style={styles.LoaderScreenTagline}>{APP_TAGLINE}</Text>
        </View>

        <View style={styles.LoaderScreenProgressBlock}>
          <View style={styles.LoaderScreenProgressTrack}>
            <Animated.View
              style={[styles.LoaderScreenProgressFill, { width: fillWidth }]}
            />
          </View>
          <View style={styles.LoaderScreenProgressMeta}>
            <Text style={styles.LoaderScreenStatus}>
              {LOADER_STATUS_MESSAGES[statusIndex]}
            </Text>
            <Text style={styles.LoaderScreenPercent}>{percentLabel}%</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  LoaderScreenChassis: {
    backgroundColor: colors.black,
    flex: 1,
    overflow: 'hidden',
  },

  LoaderScreenScroll: {
    flex: 1,
  },
  LoaderScreenScrollContent: {
    flexGrow: 1,
    paddingHorizontal: 52,
  },

  LoaderScreenCenter: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  LoaderScreenLogo: {
    marginBottom: 34,
  },

  LoaderScreenBrandWhite: {
    color: colors.cream,
    fontFamily: fonts.sansBold,
    fontSize: fontSize.hero,
    fontStyle: 'italic',
    fontWeight: '800',
    letterSpacing: 0.5,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 24,
    textTransform: 'uppercase',
  },
  LoaderScreenBrandAccent: {
    color: colors.orangeBright,
    fontStyle: 'italic',
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  LoaderScreenTagline: {
    color: 'rgba(235, 238, 245, 0.75)',
    fontFamily: fonts.sansRegular,
    fontSize: 15,
    letterSpacing: 0.3,
    marginTop: 14,
    textAlign: 'center',
  },

  LoaderScreenProgressBlock: {
    alignSelf: 'center',
    width: '100%',
  },
  LoaderScreenProgressTrack: {
    backgroundColor: colors.progressTrack,
    borderRadius: 2,
    height: 4,
    overflow: 'hidden',
    width: '100%',
  },

  LoaderScreenProgressFill: {
    backgroundColor: colors.orangeBright,
    borderRadius: 2,
    height: 4,
  },
  LoaderScreenProgressMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  LoaderScreenStatus: {
    color: colors.bodyMuted,
    flex: 1,
    fontFamily: fonts.sansRegular,
    fontSize: 12,
    marginRight: 12,
  },
  LoaderScreenPercent: {
    color: colors.bodyMuted,
    fontFamily: fonts.sansRegular,
    fontSize: 12,
  },
});
