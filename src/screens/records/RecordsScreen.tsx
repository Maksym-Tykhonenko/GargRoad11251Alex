import React, {useMemo, useState} from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {AppIcon} from '../../components/icons/AppIcon';
import {useGarage} from '../../context/GarageContext';
import {useRecords} from '../../context/RecordsContext';
import {formatMoney, monthKey} from '../../data/records';
import {colors, fonts} from '../../constants/theme';
import type {RecordsStackParamList} from '../../navigation/types';
import type {
  GarageRecord,
  RecordTimeFilter,
  RecordTypeFilter,
} from '../../types/records';

type Props = NativeStackScreenProps<RecordsStackParamList, 'RecordsHome'>;
type Mode = 'templates' | 'completed';

const TYPE_FILTERS: Array<{id: RecordTypeFilter; label: string}> = [
  {id: 'all', label: 'All types'},
  {id: 'mileage', label: 'Mileage'},
  {id: 'fuel', label: 'Fuel Fill-Up'},
  {id: 'ev', label: 'EV Charging'},
  {id: 'service', label: 'Service'},
  {id: 'tire', label: 'Tire'},
  {id: 'repair', label: 'Repair'},
  {id: 'inspection', label: 'Inspection'},
];

export function RecordsScreen({navigation}: Props) {
  const insets = useSafeAreaInsets();
  const {vehicles} = useGarage();
  const {
    templates,
    records,
    filterRecords,
    getStats,
    getTemplate,
    deleteRecord,
  } = useRecords();

  const [mode, setMode] = useState<Mode>('templates');
  const [vehicleFilter, setVehicleFilter] = useState<string | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<RecordTypeFilter>('all');
  const [timeFilter, setTimeFilter] = useState<RecordTimeFilter>('all');

  const filtered = useMemo(
    () =>
      filterRecords({
        vehicleId: vehicleFilter,
        type: typeFilter,
        time: timeFilter,
      }),
    [filterRecords, vehicleFilter, typeFilter, timeFilter],
  );

  const stats = useMemo(() => getStats(filtered), [filtered, getStats]);

  const grouped = useMemo(() => {
    const map = new Map<string, GarageRecord[]>();
    filtered.forEach(item => {
      const key = monthKey(item.date);
      const list = map.get(key) ?? [];
      list.push(item);
      map.set(key, list);
    });
    return Array.from(map.entries());
  }, [filtered]);

  const resetFilters = () => {
    setVehicleFilter('all');
    setTypeFilter('all');
    setTimeFilter('all');
  };

  const confirmDelete = (record: GarageRecord) => {
    Alert.alert(
      'Delete this record?',
      'This entry will be permanently removed.',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete record',
          style: 'destructive',
          onPress: () => deleteRecord(record.id),
        },
      ],
    );
  };

  return (
    <View style={styles.RecordsChassis}>
      <ScrollView
        contentContainerStyle={[
          styles.RecordsScroll,
          {
            paddingTop: insets.top + 12,
            paddingBottom: Math.max(insets.bottom, 16) + 100,
          },
        ]}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.RecordsEyebrow}>Mileage, fuel, service & more</Text>
        <Text style={styles.RecordsTitle}>Records</Text>

        <View style={styles.RecordsModeSwitch}>
          <Pressable
            onPress={() => setMode('templates')}
            style={[
              styles.RecordsModeButton,
              mode === 'templates' && styles.RecordsModeButtonActive,
            ]}>
            <Text
              style={[
                styles.RecordsModeLabel,
                mode === 'templates' && styles.RecordsModeLabelActive,
              ]}>
              Templates
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setMode('completed')}
            style={[
              styles.RecordsModeButton,
              mode === 'completed' && styles.RecordsModeButtonActive,
            ]}>
            <Text
              style={[
                styles.RecordsModeLabel,
                mode === 'completed' && styles.RecordsModeLabelActive,
              ]}>
              Completed · {records.length}
            </Text>
          </Pressable>
        </View>

        {mode === 'templates' ? (
          <>
            <Text style={styles.RecordsHint}>
              Tap a template to log a new entry — reuse it as often as you like.
            </Text>
            {templates.map(template => (
              <Pressable
                key={template.id}
                onPress={() =>
                  navigation.navigate('NewRecord', {templateId: template.id})
                }
                style={styles.TemplateCard}>
                <View
                  style={[
                    styles.TemplateIcon,
                    {backgroundColor: template.iconBg},
                  ]}>
                  <AppIcon
                    name={template.icon}
                    color={template.accent}
                    size={20}
                  />
                </View>
                <View style={styles.TemplateBody}>
                  <View style={styles.TemplateTitleRow}>
                    <Text style={styles.TemplateTitle}>{template.title}</Text>
                    <View style={styles.TemplateUses}>
                      <Text style={styles.TemplateUsesLabel}>
                        {template.uses}x
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.TemplateFields}>
                    {template.fieldsLabel}
                  </Text>
                  <Text style={[styles.TemplateLast, {color: template.accent}]}>
                    {template.lastLabel}
                  </Text>
                </View>
                <View
                  style={[
                    styles.TemplateAdd,
                    {backgroundColor: template.accent},
                  ]}>
                  <Text style={styles.TemplateAddLabel}>+</Text>
                </View>
              </Pressable>
            ))}
          </>
        ) : (
          <>
            <View style={styles.StatsRow}>
              <View style={styles.StatCard}>
                <Text style={styles.StatLabel}>Records</Text>
                <Text style={styles.StatValue}>{stats.count}</Text>
              </View>
              <View style={styles.StatCard}>
                <Text style={styles.StatLabel}>Spent</Text>
                <Text style={[styles.StatValue, {color: colors.orange}]}>
                  {formatMoney(stats.spent)}
                </Text>
              </View>
              <View style={styles.StatCard}>
                <Text style={styles.StatLabel}>Km logged</Text>
                <Text style={[styles.StatValue, {color: '#3d9bff'}]}>
                  {stats.kmLogged.toLocaleString('en-US')}
                </Text>
              </View>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.ChipScroll}
              contentContainerStyle={styles.ChipRow}>
              <Pressable
                onPress={() => setVehicleFilter('all')}
                style={[
                  styles.Chip,
                  vehicleFilter === 'all' && styles.ChipActive,
                ]}>
                <Text
                  style={[
                    styles.ChipLabel,
                    vehicleFilter === 'all' && styles.ChipLabelActive,
                  ]}>
                  All vehicles
                </Text>
              </Pressable>
              {vehicles.map(vehicle => (
                <Pressable
                  key={vehicle.id}
                  onPress={() => setVehicleFilter(vehicle.id)}
                  style={[
                    styles.Chip,
                    vehicleFilter === vehicle.id && styles.ChipActive,
                  ]}>
                  <Text
                    style={[
                      styles.ChipLabel,
                      vehicleFilter === vehicle.id && styles.ChipLabelActive,
                    ]}>
                    {vehicle.name}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.ChipScroll}
              contentContainerStyle={styles.ChipRow}>
              {TYPE_FILTERS.map(item => (
                <Pressable
                  key={item.id}
                  onPress={() => setTypeFilter(item.id)}
                  style={[
                    styles.Chip,
                    typeFilter === item.id && styles.ChipActive,
                  ]}>
                  <Text
                    style={[
                      styles.ChipLabel,
                      typeFilter === item.id && styles.ChipLabelActive,
                    ]}>
                    {item.label}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>

            <View style={styles.TimeRow}>
              {(
                [
                  ['all', 'All time'],
                  ['30', '30 days'],
                  ['90', '90 days'],
                ] as const
              ).map(([id, label]) => (
                <Pressable
                  key={id}
                  onPress={() => setTimeFilter(id)}
                  style={[
                    styles.TimeChip,
                    timeFilter === id && styles.TimeChipActive,
                  ]}>
                  <Text
                    style={[
                      styles.TimeChipLabel,
                      timeFilter === id && styles.TimeChipLabelActive,
                    ]}>
                    {label}
                  </Text>
                </Pressable>
              ))}
            </View>

            {filtered.length === 0 ? (
              <View style={styles.EmptyCard}>
                <AppIcon name="document" color="rgba(235,238,245,0.55)" size={36} />
                <Text style={styles.EmptyTitle}>No records</Text>
                <Pressable onPress={resetFilters} style={styles.EmptyButton}>
                  <Text style={styles.EmptyButtonLabel}>Reset filters</Text>
                </Pressable>
              </View>
            ) : (
              grouped.map(([month, list]) => (
                <View key={month} style={styles.MonthBlock}>
                  <View style={styles.MonthHeader}>
                    <Text style={styles.MonthTitle}>{month}</Text>
                    <Text style={styles.MonthCount}>
                      {list.length} entries
                    </Text>
                  </View>
                  {list.map(record => {
                    const template = getTemplate(record.templateId);
                    const accent = template?.accent ?? colors.orange;
                    return (
                      <View key={record.id} style={styles.RecordRow}>
                        <View style={styles.TimelineCol}>
                          <View
                            style={[
                              styles.TimelineDot,
                              {backgroundColor: accent},
                            ]}
                          />
                          <View style={styles.TimelineLine} />
                        </View>
                        <View style={styles.RecordCard}>
                          <View style={styles.RecordTop}>
                            <View
                              style={[
                                styles.RecordIcon,
                                {
                                  backgroundColor:
                                    template?.iconBg ??
                                    'rgba(255,178,63,0.16)',
                                },
                              ]}>
                              <AppIcon
                                name={template?.icon ?? 'document'}
                                color={accent}
                                size={18}
                              />
                            </View>
                            <View style={styles.RecordMain}>
                              <Text style={styles.RecordTitle}>
                                {record.title}
                              </Text>
                              <Text style={styles.RecordVehicle}>
                                {record.vehicleName}
                              </Text>
                            </View>
                            <Text
                              style={[
                                styles.RecordValue,
                                {
                                  color:
                                    record.cost != null
                                      ? colors.orange
                                      : '#3d9bff',
                                },
                              ]}>
                              {record.cost != null
                                ? formatMoney(record.cost)
                                : record.distanceKm != null
                                  ? `+${record.distanceKm} km`
                                  : ''}
                            </Text>
                          </View>
                          <Text style={styles.RecordDetails}>
                            {record.details}
                          </Text>
                          <View style={styles.RecordFooter}>
                            <Text style={styles.RecordDate}>
                              {record.dateLabel}
                            </Text>
                            <View style={styles.RecordActions}>
                              <Pressable
                                onPress={() =>
                                  navigation.navigate('NewRecord', {
                                    templateId: record.templateId,
                                  })
                                }
                                style={styles.RecordAction}>
                                <AppIcon name="edit" color={colors.cream} size={16} />
                              </Pressable>
                              <Pressable
                                onPress={() => confirmDelete(record)}
                                style={[
                                  styles.RecordAction,
                                  styles.RecordActionDelete,
                                ]}>
                                <AppIcon name="delete" color="#ff5a5f" size={16} />
                              </Pressable>
                            </View>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              ))
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  RecordsChassis: {
    backgroundColor: colors.background,
    flex: 1,
  },
  RecordsScroll: {
    paddingHorizontal: 16,
  },
  RecordsEyebrow: {
    color: 'rgba(235,238,245,0.55)',
    fontFamily: fonts.sansRegular,
    fontSize: 14,
    marginBottom: 4,
  },

  RecordsTitle: {
    color: colors.cream,
    fontFamily: fonts.sansBold,
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: -0.6,
    marginBottom: 16,
  },
  RecordsModeSwitch: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 16,
    flexDirection: 'row',
    marginBottom: 14,
    padding: 4,
  },
  RecordsModeButton: {
    borderRadius: 12,
    flex: 1,
    paddingVertical: 10,
  },

  RecordsModeButtonActive: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  RecordsModeLabel: {
    color: 'rgba(235,238,245,0.55)',
    fontFamily: fonts.sansSemiBold,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },

  RecordsModeLabelActive: {
    color: colors.cream,
  },
  RecordsHint: {
    color: 'rgba(235,238,245,0.55)',
    fontFamily: fonts.sansRegular,
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 14,
  },

  TemplateCard: {
    alignItems: 'center',
    backgroundColor: 'rgba(18,22,32,0.92)',
    borderRadius: 18,
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
    padding: 14,
  },
  TemplateIcon: {
    alignItems: 'center',
    borderRadius: 14,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  TemplateBody: {
    flex: 1,
  },

  TemplateTitleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    marginBottom: 4,
  },
  TemplateTitle: {
    color: colors.cream,
    fontFamily: fonts.sansBold,
    fontSize: 16,
    fontWeight: '700',
  },
  TemplateUses: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },

  TemplateUsesLabel: {
    color: 'rgba(235,238,245,0.6)',
    fontSize: 11,
  },
  TemplateFields: {
    color: 'rgba(235,238,245,0.5)',
    fontFamily: fonts.sansRegular,
    fontSize: 12,
    marginBottom: 4,
  },
  TemplateLast: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 12,
    fontWeight: '600',
  },

  TemplateAdd: {
    alignItems: 'center',
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  TemplateAddLabel: {
    color: '#10131a',
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 24,
  },
  StatsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },

  StatCard: {
    backgroundColor: 'rgba(18,22,32,0.92)',
    borderRadius: 16,
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  StatLabel: {
    color: 'rgba(235,238,245,0.5)',
    fontSize: 12,
    marginBottom: 6,
  },
  StatValue: {
    color: colors.cream,
    fontFamily: fonts.sansBold,
    fontSize: 20,
    fontWeight: '700',
  },

  ChipScroll: {
    marginBottom: 10,
    marginHorizontal: -16,
  },
  ChipRow: {
    gap: 8,
    paddingLeft: 16,
    paddingRight: 0,
  },
  Chip: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderColor: 'transparent',
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  ChipActive: {
    borderColor: colors.orange,
  },
  ChipLabel: {
    color: 'rgba(235,238,245,0.75)',
    fontSize: 13,
  },
  ChipLabelActive: {
    color: colors.orange,
  },

  TimeRow: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 14,
    flexDirection: 'row',
    marginBottom: 16,
    padding: 4,
  },
  TimeChip: {
    borderRadius: 10,
    flex: 1,
    paddingVertical: 8,
  },
  TimeChipActive: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },

  TimeChipLabel: {
    color: 'rgba(235,238,245,0.55)',
    fontSize: 13,
    textAlign: 'center',
  },
  TimeChipLabelActive: {
    color: colors.cream,
    fontWeight: '600',
  },

  EmptyCard: {
    alignItems: 'center',
    backgroundColor: 'rgba(18,22,32,0.92)',
    borderRadius: 20,
    gap: 12,
    paddingVertical: 48,
  },
  EmptyTitle: {
    color: colors.cream,
    fontFamily: fonts.sansBold,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 14,
  },

  EmptyButton: {
    backgroundColor: 'rgba(255,178,63,0.12)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  EmptyButtonLabel: {
    color: colors.orange,
    fontFamily: fonts.sansSemiBold,
    fontSize: 14,
    fontWeight: '600',
  },

  MonthBlock: {
    marginBottom: 12,
  },
  MonthHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  MonthTitle: {
    color: 'rgba(235,238,245,0.55)',
    fontFamily: fonts.sansBold,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  MonthCount: {
    color: 'rgba(235,238,245,0.45)',
    fontSize: 12,
  },
  RecordRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },

  TimelineCol: {
    alignItems: 'center',
    paddingTop: 18,
    width: 12,
  },
  TimelineDot: {
    borderRadius: 5,
    height: 10,
    width: 10,
  },
  TimelineLine: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    flex: 1,
    marginTop: 4,
    width: 2,
  },

  RecordCard: {
    backgroundColor: 'rgba(18,22,32,0.92)',
    borderRadius: 18,
    flex: 1,
    padding: 14,
  },
  RecordTop: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 10,
    marginBottom: 8,
  },
  RecordIcon: {
    alignItems: 'center',
    borderRadius: 12,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },

  RecordMain: {
    flex: 1,
  },
  RecordTitle: {
    color: colors.cream,
    fontFamily: fonts.sansBold,
    fontSize: 15,
    fontWeight: '700',
  },
  RecordVehicle: {
    color: 'rgba(235,238,245,0.5)',
    fontSize: 12,
    marginTop: 2,
  },

  RecordValue: {
    fontFamily: fonts.sansBold,
    fontSize: 15,
    fontWeight: '700',
  },
  RecordDetails: {
    color: 'rgba(235,238,245,0.6)',
    fontSize: 13,
    marginBottom: 10,
  },
  RecordFooter: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  RecordDate: {
    color: 'rgba(235,238,245,0.45)',
    fontSize: 12,
  },
  RecordActions: {
    flexDirection: 'row',
    gap: 6,
  },
  RecordAction: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    height: 28,
    justifyContent: 'center',
    width: 28,
  },

  RecordActionDelete: {
    backgroundColor: 'rgba(255,90,95,0.18)',
  },
  RecordActionLabel: {
    color: colors.cream,
    fontSize: 12,
  },
  RecordActionDeleteLabel: {
    color: '#ff5a5f',
    fontSize: 12,
  },
});
