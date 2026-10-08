import React, {useMemo, useState} from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {AppIcon, type AppIconName} from '../components/icons/AppIcon';
import {CircularStat} from '../components/stats/CircularStat';
import {useGarage} from '../context/GarageContext';
import {colors, fonts} from '../constants/theme';
import type {GarageStackParamList} from '../navigation/types';
import type {ChecklistCategoryId} from '../types/vehicle';
import {
  getCategoryProgress,
  getStatusColor,
  getStatusFromPercent,
  getStatusLabel,
  getVehicleProgress,
} from '../types/vehicle';

type Props = NativeStackScreenProps<GarageStackParamList, 'VehicleDetail'>;

const CATEGORY_META: Record<
  ChecklistCategoryId,
  {icon: AppIconName; short: string}
> = {
  preTrip: {icon: 'check', short: 'Pre-Trip'},
  seasonal: {icon: 'snow', short: 'Seasonal'},
  longTrip: {icon: 'route', short: 'Long Trip'},
  usedCar: {icon: 'car', short: 'Used Car'},
};

export function VehicleDetailScreen({navigation, route}: Props) {
  const insets = useSafeAreaInsets();
  const {
    getVehicle,
    toggleCheckItem,
    clearCategoryProgress,
    resetCategory,
    addCustomCheck,
    deleteVehicle,
  } = useGarage();
  const vehicle = getVehicle(route.params.vehicleId);
  const [categoryId, setCategoryId] =
    useState<ChecklistCategoryId>('preTrip');
  const [customTitle, setCustomTitle] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const category = useMemo(
    () => vehicle?.checklists.find(item => item.id === categoryId),
    [categoryId, vehicle],
  );

  if (!vehicle || !category) {
    return (
      <View style={styles.VehicleDetailEmpty}>
        <Text style={styles.VehicleDetailEmptyText}>Vehicle not found</Text>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.VehicleDetailBackRow}>
          <AppIcon name="back" color={colors.orange} size={20} />
          <Text style={styles.VehicleDetailBack}>Garage</Text>
        </Pressable>
      </View>
    );
  }

  const overall = getVehicleProgress(vehicle);
  const categoryProgress = getCategoryProgress(category);
  const status = getStatusFromPercent(categoryProgress.percent);
  const statusColor = getStatusColor(status);
  const overallStatus = getStatusFromPercent(overall.percent);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 1600);
  };

  const openMoreMenu = () => {
    Alert.alert(
      vehicle.name,
      `${vehicle.year} ${vehicle.model} · ${vehicle.mileage.toLocaleString('en-US')} km`,
      [
        {
          text: 'Clear checklist progress',
          onPress: () => {
            clearCategoryProgress(vehicle.id, categoryId);
            showToast('Progress cleared');
          },
        },
        {
          text: 'Reset checklist',
          onPress: () => {
            Alert.alert(
              'Reset this checklist?',
              'Custom items are removed and all ready-made items are restored and unchecked.',
              [
                {text: 'Cancel', style: 'cancel'},
                {
                  text: 'Reset checklist',
                  style: 'destructive',
                  onPress: () => {
                    resetCategory(vehicle.id, categoryId);
                    showToast('Checklist reset');
                  },
                },
              ],
            );
          },
        },
        {
          text: 'Delete vehicle',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              `Delete ${vehicle.name}?`,
              'Its checklists and records will be removed from this device.',
              [
                {text: 'Cancel', style: 'cancel'},
                {
                  text: 'Delete vehicle',
                  style: 'destructive',
                  onPress: () => {
                    deleteVehicle(vehicle.id);
                    navigation.goBack();
                  },
                },
              ],
            );
          },
        },
        {text: 'Cancel', style: 'cancel'},
      ],
    );
  };

  return (
    <View style={styles.VehicleDetailChassis}>
      <View style={[styles.VehicleDetailHeader, {paddingTop: insets.top + 8}]}>
        <Pressable
          onPress={() => navigation.goBack()}
          hitSlop={10}
          style={styles.VehicleDetailBackRow}>
          <AppIcon name="back" color={colors.orange} size={20} />
          <Text style={styles.VehicleDetailBack}>Garage</Text>
        </Pressable>
        <Text style={styles.VehicleDetailTitle}>{vehicle.name}</Text>
        <Pressable onPress={openMoreMenu} style={styles.VehicleDetailMore}>
          <Text style={styles.VehicleDetailMoreLabel}>···</Text>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.VehicleDetailScroll,
          {paddingBottom: Math.max(insets.bottom, 16) + 28},
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.VehicleDetailSummary}>
          <CircularStat
            percent={categoryProgress.percent}
            size={92}
            width={8}
            tintColor={statusColor}
            label={CATEGORY_META[categoryId].short}
            valueFontSize={22}
          />
          <View style={styles.VehicleDetailSummaryText}>
            <Text style={styles.VehicleDetailModelLine}>
              {vehicle.year} {vehicle.model}
            </Text>
            <Text style={styles.VehicleDetailName}>{vehicle.name}</Text>
            <View
              style={[
                styles.VehicleDetailBadge,
                {borderColor: `${getStatusColor(overallStatus)}66`},
              ]}>
              <Text
                style={[
                  styles.VehicleDetailBadgeLabel,
                  {color: getStatusColor(overallStatus)},
                ]}>
                {overall.percent}% {getStatusLabel(overallStatus)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.VehicleDetailMiniStats}>
          <View style={styles.VehicleDetailMiniStat}>
            <Text style={styles.VehicleDetailMiniLabel}>Mileage</Text>
            <Text style={styles.VehicleDetailMiniValue}>
              {vehicle.mileage.toLocaleString('en-US')} km
            </Text>
          </View>
          <View style={styles.VehicleDetailMiniStat}>
            <Text style={styles.VehicleDetailMiniLabel}>Powertrain</Text>
            <Text style={[styles.VehicleDetailMiniValue, {color: colors.orange}]}>
              {vehicle.fuel}
            </Text>
          </View>
          <View style={styles.VehicleDetailMiniStat}>
            <Text style={styles.VehicleDetailMiniLabel}>All checks</Text>
            <Text style={styles.VehicleDetailMiniValue}>
              {overall.done}/{overall.total}
            </Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.VehicleDetailCategoriesScroll}
          contentContainerStyle={styles.VehicleDetailCategories}>
          {vehicle.checklists.map(item => {
            const progress = getCategoryProgress(item);
            const active = item.id === categoryId;
            return (
              <Pressable
                key={item.id}
                onPress={() => setCategoryId(item.id)}
                style={[
                  styles.VehicleDetailCategory,
                  active && styles.VehicleDetailCategoryActive,
                ]}>
                <AppIcon
                  name={CATEGORY_META[item.id].icon}
                  color={active ? colors.orange : colors.label}
                  size={16}
                />
                <Text
                  style={[
                    styles.VehicleDetailCategoryLabel,
                    active && styles.VehicleDetailCategoryLabelActive,
                  ]}>
                  {item.label}
                </Text>
                <Text style={styles.VehicleDetailCategoryCount}>
                  {progress.done}/{progress.total}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.VehicleDetailProgressRow}>
          <View style={styles.VehicleDetailProgressTextWrap}>
            <Text style={styles.VehicleDetailProgressTitle}>
              {categoryProgress.done} of {categoryProgress.total} checks
              completed
            </Text>
            <Text style={[styles.VehicleDetailProgressStatus, {color: statusColor}]}>
              {categoryProgress.percent}% {getStatusLabel(status)}
            </Text>
          </View>
          <View style={styles.VehicleDetailActions}>
            <Pressable
              onPress={() => {
                clearCategoryProgress(vehicle.id, categoryId);
                showToast('Progress cleared');
              }}
              style={styles.VehicleDetailActionButton}>
              <Text style={styles.VehicleDetailActionLabel}>Clear</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                Alert.alert(
                  'Reset this checklist?',
                  'Custom items are removed and all ready-made items are restored and unchecked.',
                  [
                    {text: 'Cancel', style: 'cancel'},
                    {
                      text: 'Reset checklist',
                      style: 'destructive',
                      onPress: () => {
                        resetCategory(vehicle.id, categoryId);
                        showToast('Checklist reset');
                      },
                    },
                  ],
                );
              }}
              style={[
                styles.VehicleDetailActionButton,
                styles.VehicleDetailActionReset,
              ]}>
              <Text style={styles.VehicleDetailActionResetLabel}>Reset</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.VehicleDetailProgressTrack}>
          <View
            style={[
              styles.VehicleDetailProgressFill,
              {
                backgroundColor: statusColor,
                width: `${Math.max(2, categoryProgress.percent)}%`,
              },
            ]}
          />
        </View>

        {category.items.map((item, index) => {
          const showSection =
            index === 0 || category.items[index - 1].section !== item.section;
          return (
            <View key={item.id}>
              {showSection ? (
                <Text style={styles.VehicleDetailSectionLabel}>
                  {item.section}
                </Text>
              ) : null}
              <Pressable
                onPress={() =>
                  toggleCheckItem(vehicle.id, categoryId, item.id)
                }
                style={styles.VehicleDetailCheckRow}>
                <View
                  style={[
                    styles.VehicleDetailCheckBox,
                    item.done && styles.VehicleDetailCheckBoxDone,
                  ]}>
                  {item.done ? (
                    <AppIcon name="check" color="#062416" size={18} />
                  ) : null}
                </View>
                <View style={styles.VehicleDetailCheckText}>
                  <View
                    style={[
                      styles.VehicleDetailCheckTitleRow,
                      item.description && styles.VehicleDetailCheckTitleRowSpaced,
                    ]}>
                    <Text style={styles.VehicleDetailCheckTitle}>
                      {item.title}
                    </Text>
                    {item.custom ? (
                      <View style={styles.VehicleDetailCustomTag}>
                        <Text style={styles.VehicleDetailCustomTagLabel}>
                          CUSTOM
                        </Text>
                      </View>
                    ) : null}
                  </View>
                  {item.description ? (
                    <Text style={styles.VehicleDetailCheckDescription}>
                      {item.description}
                    </Text>
                  ) : null}
                </View>
              </Pressable>
            </View>
          );
        })}

        <View style={styles.VehicleDetailAddRow}>
          <Text style={styles.VehicleDetailAddPlus}>+</Text>
          <TextInput
            value={customTitle}
            onChangeText={setCustomTitle}
            placeholder="Add a custom check..."
            placeholderTextColor="rgba(235,238,245,0.4)"
            style={styles.VehicleDetailAddInput}
          />
          <Pressable
            onPress={() => {
              addCustomCheck(vehicle.id, categoryId, customTitle);
              setCustomTitle('');
            }}
            style={styles.VehicleDetailAddButton}>
            <Text style={styles.VehicleDetailAddButtonLabel}>Add</Text>
          </Pressable>
        </View>

        <Pressable
          onPress={() => {
            Alert.alert(
              `Delete ${vehicle.name}?`,
              'Its checklists and records will be removed from this device.',
              [
                {text: 'Cancel', style: 'cancel'},
                {
                  text: 'Delete vehicle',
                  style: 'destructive',
                  onPress: () => {
                    deleteVehicle(vehicle.id);
                    navigation.goBack();
                  },
                },
              ],
            );
          }}
          style={styles.VehicleDetailDeleteButton}>
          <Text style={styles.VehicleDetailDeleteLabel}>Delete vehicle</Text>
        </Pressable>
      </ScrollView>

      {toast ? (
        <View style={[styles.VehicleDetailToast, {top: insets.top + 8}]}>
          <Text style={styles.VehicleDetailToastLabel}>{toast}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  VehicleDetailChassis: {
    backgroundColor: colors.background,
    flex: 1,
  },

  VehicleDetailEmpty: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center',
  },
  VehicleDetailEmptyText: {
    color: colors.cream,
    fontSize: 16,
    marginBottom: 12,
  },
  VehicleDetailHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingHorizontal: 16,
  },

  VehicleDetailBackRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 2,
    width: 90,
  },
  VehicleDetailBack: {
    color: colors.orange,
    fontFamily: fonts.sansRegular,
    fontSize: 17,
  },
  VehicleDetailTitle: {
    color: colors.cream,
    fontFamily: fonts.sansSemiBold,
    fontSize: 17,
    fontWeight: '600',
  },

  VehicleDetailMore: {
    alignItems: 'center',
    borderColor: 'rgba(255,178,63,0.35)',
    borderRadius: 16,
    borderWidth: 1,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  VehicleDetailMoreLabel: {
    color: colors.orange,
    fontSize: 16,
    letterSpacing: 1,
  },
  VehicleDetailScroll: {
    paddingHorizontal: 16,
  },

  VehicleDetailSummary: {
    alignItems: 'center',
    backgroundColor: 'rgba(18,22,32,0.92)',
    borderRadius: 24,
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
    padding: 16,
  },
  VehicleDetailSummaryText: {
    flex: 1,
  },

  VehicleDetailModelLine: {
    color: 'rgba(235,238,245,0.55)',
    fontFamily: fonts.sansRegular,
    fontSize: 13,
    marginBottom: 4,
  },
  VehicleDetailName: {
    color: colors.cream,
    fontFamily: fonts.sansBold,
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
  },

  VehicleDetailBadge: {
    alignSelf: 'flex-start',
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  VehicleDetailBadgeLabel: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 12,
    fontWeight: '600',
  },

  VehicleDetailMiniStats: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  VehicleDetailMiniStat: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 14,
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },

  VehicleDetailMiniLabel: {
    color: 'rgba(235,238,245,0.5)',
    fontFamily: fonts.sansRegular,
    fontSize: 11,
    marginBottom: 4,
  },
  VehicleDetailMiniValue: {
    color: colors.cream,
    fontFamily: fonts.sansBold,
    fontSize: 14,
    fontWeight: '700',
  },

  VehicleDetailCategoriesScroll: {
    marginBottom: 16,
    marginHorizontal: -16,
  },
  VehicleDetailCategories: {
    gap: 8,
    paddingLeft: 16,
    paddingRight: 0,
  },

  VehicleDetailCategory: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderColor: 'transparent',
    borderRadius: 16,
    borderWidth: 1,
    minWidth: 88,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  VehicleDetailCategoryActive: {
    backgroundColor: 'rgba(40,55,80,0.85)',
    borderColor: 'rgba(255,255,255,0.12)',
  },
  VehicleDetailCategoryIcon: {
    fontSize: 16,
    marginBottom: 6,
  },

  VehicleDetailCategoryLabel: {
    color: 'rgba(235,238,245,0.7)',
    fontFamily: fonts.sansSemiBold,
    fontSize: 12,
    fontWeight: '600',
  },
  VehicleDetailCategoryLabelActive: {
    color: colors.cream,
  },
  VehicleDetailCategoryCount: {
    color: 'rgba(235,238,245,0.45)',
    fontFamily: fonts.sansRegular,
    fontSize: 11,
    marginTop: 4,
  },

  VehicleDetailProgressRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  VehicleDetailProgressTextWrap: {
    flex: 1,
    paddingRight: 10,
  },

  VehicleDetailProgressTitle: {
    color: colors.cream,
    fontFamily: fonts.sansSemiBold,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  VehicleDetailProgressStatus: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    fontWeight: '700',
  },
  VehicleDetailActions: {
    flexDirection: 'row',
    gap: 8,
  },

  VehicleDetailActionButton: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  VehicleDetailActionReset: {
    backgroundColor: 'rgba(255,90,95,0.15)',
  },

  VehicleDetailActionLabel: {
    color: colors.cream,
    fontFamily: fonts.sansRegular,
    fontSize: 12,
  },
  VehicleDetailActionResetLabel: {
    color: '#ff5a5f',
    fontFamily: fonts.sansSemiBold,
    fontSize: 12,
    fontWeight: '600',
  },

  VehicleDetailProgressTrack: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 3,
    height: 6,
    marginBottom: 16,
    overflow: 'hidden',
  },
  VehicleDetailProgressFill: {
    borderRadius: 3,
    height: 6,
  },
  VehicleDetailSectionLabel: {
    color: colors.orange,
    fontFamily: fonts.sansBold,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.6,
    marginBottom: 8,
    marginTop: 6,
    textTransform: 'uppercase',
  },

  VehicleDetailCheckRow: {
    alignItems: 'center',
    backgroundColor: 'rgba(18,22,32,0.72)',
    borderRadius: 16,
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  VehicleDetailCheckBox: {
    alignItems: 'center',
    borderColor: 'rgba(255,255,255,0.25)',
    borderRadius: 14,
    borderWidth: 2,
    height: 28,
    justifyContent: 'center',
    width: 28,
  },
  VehicleDetailCheckBoxDone: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },

  VehicleDetailCheckText: {
    flex: 1,
    justifyContent: 'center',
  },
  VehicleDetailCheckTitleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  VehicleDetailCheckTitleRowSpaced: {
    marginBottom: 4,
  },
  VehicleDetailCheckTitle: {
    color: colors.cream,
    fontFamily: fonts.sansSemiBold,
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 20,
  },

  VehicleDetailCustomTag: {
    backgroundColor: 'rgba(61,155,255,0.18)',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  VehicleDetailCustomTagLabel: {
    color: '#3d9bff',
    fontFamily: fonts.sansBold,
    fontSize: 10,
    fontWeight: '700',
  },
  VehicleDetailCheckDescription: {
    color: 'rgba(235,238,245,0.5)',
    fontFamily: fonts.sansRegular,
    fontSize: 13,
    lineHeight: 18,
  },

  VehicleDetailAddRow: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 16,
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
    marginTop: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  VehicleDetailAddPlus: {
    color: colors.orange,
    fontSize: 22,
    fontWeight: '600',
  },
  VehicleDetailAddInput: {
    color: colors.cream,
    flex: 1,
    fontFamily: fonts.sansRegular,
    fontSize: 14,
    paddingVertical: 8,
  },

  VehicleDetailAddButton: {
    borderColor: 'rgba(255,178,63,0.5)',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  VehicleDetailAddButtonLabel: {
    color: colors.orange,
    fontFamily: fonts.sansBold,
    fontSize: 13,
    fontWeight: '700',
  },

  VehicleDetailDeleteButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,90,95,0.14)',
    borderRadius: 16,
    marginBottom: 8,
    paddingVertical: 16,
  },
  VehicleDetailDeleteLabel: {
    color: '#ff5a5f',
    fontFamily: fonts.sansBold,
    fontSize: 15,
    fontWeight: '700',
  },

  VehicleDetailToast: {
    alignSelf: 'center',
    backgroundColor: 'rgba(18,22,32,0.95)',
    borderColor: 'rgba(61,220,132,0.4)',
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    position: 'absolute',
  },
  VehicleDetailToastLabel: {
    color: colors.success,
    fontFamily: fonts.sansSemiBold,
    fontSize: 13,
    fontWeight: '600',
  },
});
