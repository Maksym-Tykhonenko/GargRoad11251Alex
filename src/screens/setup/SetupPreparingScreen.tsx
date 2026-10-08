import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {createChecklists} from '../../data/checklists';
import {buildPreparingTasks} from '../../data/setup';
import {icons} from '../../data/assets';
import {SetupIcon} from '../../components/setup/SetupIcon';
import {colors, fonts} from '../../constants/theme';
import {useGarage} from '../../context/GarageContext';
import {useSetup} from '../../context/SetupContext';
import {useAppNavigation} from '../../navigation/NavigationContext';
import type {RootStackParamList, SetupStackParamList} from '../../navigation/types';
import type {Vehicle} from '../../types/vehicle';
import {saveJson, saveString, storageKeys} from '../../storage/persist';

type Props = NativeStackScreenProps<SetupStackParamList, 'SetupPreparing'>;

export function SetupPreparingScreen({navigation}: Props) {
  const insets = useSafeAreaInsets();
  const {userName, drafts, vehicleCount} = useSetup();
  const {replaceVehicles, setUserName} = useGarage();
  const {markSetupDone} = useAppNavigation();
  const [progress, setProgress] = useState(0);
  const finishedRef = useRef(false);

  const activeDrafts = useMemo(
    () => drafts.slice(0, vehicleCount),
    [drafts, vehicleCount],
  );
  const tasks = useMemo(
    () => buildPreparingTasks(activeDrafts),
    [activeDrafts],
  );

  const doneCount = Math.min(
    tasks.length,
    Math.floor((progress / 100) * tasks.length + (progress >= 100 ? 1 : 0)),
  );

  useEffect(() => {
    const started = Date.now();
    const duration = 3200;
    const timer = setInterval(() => {
      const ratio = Math.min(1, (Date.now() - started) / duration);
      setProgress(Math.round(ratio * 100));
      if (ratio >= 1) {
        clearInterval(timer);
      }
    }, 40);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress < 100 || finishedRef.current) {
      return;
    }
    finishedRef.current = true;

    const vehicles: Vehicle[] = activeDrafts.map((draft, index) => {
      const id = `setup-${Date.now()}-${index}`;
      return {
        id,
        name: draft.name.trim() || `Vehicle ${index + 1}`,
        model: draft.model.trim() || 'Unknown',
        year: Number(draft.year) || new Date().getFullYear(),
        type: draft.type,
        fuel: draft.fuel,
        plate: draft.plate.trim() || '—',
        mileage: Number(draft.mileage) || 0,
        accent: draft.accent,
        lastActivityLabel: 'Added in setup',
        lastActivityWhen: 'Just now',
        checklists: createChecklists(id, draft.fuel),
      };
    });

    setUserName(userName);
    replaceVehicles(vehicles);
    void Promise.all([
      saveString(storageKeys.userName, userName.trim()),
      saveJson(storageKeys.vehicles, vehicles),
    ]).then(() => {
      setTimeout(() => {
        markSetupDone();
        navigation
          .getParent<NativeStackNavigationProp<RootStackParamList>>()
          ?.navigate('MainNavigator');
      }, 700);
    });
  }, [
    progress,
    activeDrafts,
    userName,
    markSetupDone,
    navigation,
    replaceVehicles,
    setUserName,
  ]);

  return (
    <View style={styles.PrepChassis}>
      <Image source={icons.loaderBg} style={styles.PrepBg} resizeMode="cover" />
      <View style={styles.PrepOverlay} />

      <View
        style={[
          styles.PrepContent,
          {
            paddingTop: insets.top + 48,
            paddingBottom: Math.max(insets.bottom, 24) + 24,
          },
        ]}>
        <View style={styles.PrepRingWrap}>
          <AnimatedCircularProgress
            size={170}
            width={6}
            fill={progress}
            tintColor={colors.orangeSoft}
            backgroundColor="rgba(255,255,255,0.08)"
            rotation={-90}
            lineCap="round">
            {() => (
              <View style={styles.PrepRingInner}>
                <Text style={styles.PrepPercent}>{progress}%</Text>
                <Text style={styles.PrepSettingUp}>SETTING UP</Text>
              </View>
            )}
          </AnimatedCircularProgress>
        </View>

        <Text style={styles.PrepTitle}>
          Preparing {userName.trim() ? `${userName.trim()}’s garage` : 'your garage'}
        </Text>
        <Text style={styles.PrepSubtitle}>
          Tailoring checklists and tools to your vehicles
        </Text>

        <View style={styles.PrepChips}>
          {activeDrafts.map(draft => (
            <View key={draft.name} style={styles.PrepChip}>
              <SetupIcon name="car" color={draft.accent} size={16} />
              <Text style={styles.PrepChipLabel}>{draft.name}</Text>
            </View>
          ))}
        </View>

        <View style={styles.PrepCard}>
          {tasks.map((task, index) => {
            const done = index < doneCount;
            const working = index === doneCount && progress < 100;
            return (
              <View
                key={task.id}
                style={[
                  styles.PrepRow,
                  index < tasks.length - 1 && styles.PrepRowBorder,
                ]}>
                {done ? (
                  <SetupIcon name="check" color={colors.success} size={22} />
                ) : (
                  <SetupIcon
                    name={task.icon}
                    color={working ? colors.orange : colors.label}
                    size={22}
                  />
                )}
                <Text
                  style={[
                    styles.PrepRowLabel,
                    !done && !working && styles.PrepRowLabelMuted,
                  ]}>
                  {task.label}
                </Text>
                <Text
                  style={[
                    styles.PrepRowStatus,
                    done && styles.PrepRowStatusDone,
                    working && styles.PrepRowStatusWorking,
                  ]}>
                  {done ? 'Done' : working ? 'Working…' : 'Queued'}
                </Text>
              </View>
            );
          })}
        </View>

        <View style={styles.PrepBarTrack}>
          <LinearGradient
            colors={[colors.buttonGradientStart, colors.buttonGradientEnd]}
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.5}}
            style={[styles.PrepBarFill, {width: `${Math.max(progress, 4)}%`}]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  PrepChassis: {
    backgroundColor: colors.background,
    flex: 1,
  },
  PrepBg: {
    ...StyleSheet.absoluteFill,
    opacity: 0.35,
  },

  PrepOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(7,9,15,0.72)',
  },
  PrepContent: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 24,
  },

  PrepRingWrap: {
    marginBottom: 28,
  },
  PrepRingInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  PrepPercent: {
    color: colors.cream,
    fontFamily: fonts.condensedBoldItalic,
    fontSize: 50,
    fontStyle: 'italic',
    lineHeight: 50,
  },
  PrepSettingUp: {
    color: colors.label,
    fontFamily: fonts.sansRegular,
    fontSize: 11,
    letterSpacing: 1.4,
    marginTop: 2,
  },

  PrepTitle: {
    color: colors.cream,
    fontFamily: fonts.sansBold,
    fontSize: 26,
    letterSpacing: -0.4,
    textAlign: 'center',
  },
  PrepSubtitle: {
    color: colors.bodyMuted,
    fontFamily: fonts.sansRegular,
    fontSize: 15,
    marginTop: 8,
    textAlign: 'center',
  },
  PrepChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
    marginTop: 20,
  },

  PrepChip: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 17,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  PrepChipLabel: {
    color: colors.cream,
    fontFamily: fonts.sansRegular,
    fontSize: 13,
  },
  PrepCard: {
    backgroundColor: 'rgba(18,22,32,0.78)',
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 22,
    borderWidth: 1,
    marginTop: 24,
    paddingHorizontal: 16,
    paddingVertical: 6,
    width: '100%',
  },

  PrepRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    minHeight: 49,
    paddingVertical: 10,
  },
  PrepRowBorder: {
    borderBottomColor: 'rgba(255,255,255,0.05)',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  PrepRowLabel: {
    color: colors.cream,
    flex: 1,
    fontFamily: fonts.sansRegular,
    fontSize: 14.5,
  },

  PrepRowLabelMuted: {
    color: 'rgba(235,238,245,0.4)',
  },
  PrepRowStatus: {
    color: 'rgba(235,238,245,0.3)',
    fontFamily: fonts.sansRegular,
    fontSize: 12,
  },

  PrepRowStatusDone: {
    color: colors.success,
  },
  PrepRowStatusWorking: {
    color: colors.orange,
  },

  PrepBarTrack: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    height: 4,
    marginTop: 'auto',
    overflow: 'hidden',
    width: '100%',
  },
  PrepBarFill: {
    borderRadius: 2,
    height: 4,
  },
});
