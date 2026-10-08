import React, {useMemo, useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {ValueSlider} from '../../components/calculators/ValueSlider';
import {AppIcon} from '../../components/icons/AppIcon';
import {calculatorIcons, calculatorUiIcons} from '../../data/assets';
import {colors, fonts} from '../../constants/theme';
import {useCalculators} from '../../context/CalculatorsContext';
import {useGarage} from '../../context/GarageContext';
import {
  computeCalculator,
  defaultValues,
  fieldLabel,
  getCalculatorTool,
  type CalculatorResult,
} from '../../data/calculators';
import type {CalculatorsStackParamList} from '../../navigation/types';

type Props = NativeStackScreenProps<CalculatorsStackParamList, 'Calculator'>;

export function CalculatorScreen({navigation, route}: Props) {
  const insets = useSafeAreaInsets();
  const tool = getCalculatorTool(route.params.toolId);
  const {vehicles} = useGarage();
  const {saved, saveCalculation} = useCalculators();
  const restored = saved.find(item => item.id === route.params.savedId);

  const [values, setValues] = useState<Record<string, string>>(
    restored?.values ?? defaultValues(tool),
  );
  const [segment, setSegment] = useState(
    restored?.segment ?? tool.segment?.defaultValue ?? '',
  );
  const [vehicleId, setVehicleId] = useState(
    restored?.vehicleId ?? vehicles[0]?.id ?? '',
  );
  const [result, setResult] = useState<CalculatorResult | null>(
    restored
      ? computeCalculator(tool, restored.values, restored.segment)
      : null,
  );

  const vehicle = vehicles.find(item => item.id === vehicleId) ?? vehicles[0];

  const fields = useMemo(
    () =>
      tool.fields.map(field => ({
        ...field,
        label: fieldLabel(tool, field, segment),
      })),
    [segment, tool],
  );

  const updateValue = (id: string, next: string) => {
    setValues(current => ({...current, [id]: next}));
  };

  const onCalculate = () => {
    setResult(computeCalculator(tool, values, segment));
  };

  const onClear = () => {
    setValues(Object.fromEntries(tool.fields.map(field => [field.id, ''])));
    setResult(null);
  };

  const onSave = () => {
    if (!result) {
      return;
    }
    saveCalculation({
      toolId: tool.id,
      vehicleId: vehicle?.id ?? '',
      vehicleName: vehicle?.name ?? 'No vehicle',
      summary: result.summary,
      metricLabel: result.metricLabel,
      metricValue: result.suffix ? `${result.value} ${result.suffix}` : result.value,
      accent: tool.accent,
      values,
      segment,
    });
    navigation.navigate('SavedCalculations');
  };

  const onShare = async () => {
    if (!result) {
      return;
    }
    const lines = [
      tool.title,
      vehicle ? vehicle.name : '',
      `${result.eyebrow}: ${result.value}${result.suffix ? ` ${result.suffix}` : ''}`,
      ...result.stats.map(stat => `${stat.label}: ${stat.value}`),
      result.tip,
    ].filter(Boolean);
    await Share.share({message: lines.join('\n')});
  };

  return (
    <View style={styles.CalculatorScreenChassis}>
      <ScrollView
        contentContainerStyle={{paddingBottom: insets.bottom + 28}}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View style={[styles.CalculatorScreenHero, {paddingTop: insets.top + 8}]}>
          <View style={styles.CalculatorScreenNav}>
            <Pressable
              onPress={() => navigation.goBack()}
              hitSlop={8}
              style={styles.CalculatorScreenBackRow}>
              <AppIcon name="back" color={colors.orange} size={20} />
              <Text style={styles.CalculatorScreenBack}>Tools</Text>
            </Pressable>
            <Text style={styles.CalculatorScreenNavTitle}>{tool.title}</Text>
            <Pressable
              onPress={() => navigation.navigate('SavedCalculations')}
              style={styles.CalculatorScreenHistory}>
              <Image
                source={calculatorUiIcons.saved}
                style={styles.CalculatorScreenHistoryIcon}
              />
            </Pressable>
          </View>
          <View style={styles.CalculatorScreenIntro}>
            <View style={[styles.CalculatorScreenIcon, {backgroundColor: tool.accentSoft}]}>
              <Image
                source={calculatorIcons[tool.id]}
                style={styles.CalculatorScreenGlyph}
              />
            </View>
            <View style={styles.CalculatorScreenIntroCopy}>
              <Text style={styles.CalculatorScreenTitle}>{tool.title}</Text>
              <Text style={styles.CalculatorScreenDescription}>{tool.description}</Text>
            </View>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.CalculatorScreenChipsScroll}
          contentContainerStyle={styles.CalculatorScreenChips}>
          {vehicles.map(item => {
            const selected = item.id === vehicle?.id;
            return (
              <Pressable
                key={item.id}
                onPress={() => setVehicleId(item.id)}
                style={[
                  styles.CalculatorScreenChip,
                  selected && {
                    backgroundColor: 'rgba(255,178,63,0.15)',
                    borderColor: 'rgba(255,178,63,0.5)',
                  },
                ]}>
                <Image
                  source={calculatorUiIcons.car}
                  style={[
                    styles.CalculatorScreenChipIcon,
                    {tintColor: selected ? colors.orange : 'rgba(235,238,245,0.55)'},
                  ]}
                />
                <Text
                  style={[
                    styles.CalculatorScreenChipLabel,
                    selected && {color: colors.orange},
                  ]}>
                  {item.name}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {tool.segment ? (
          <View style={styles.CalculatorScreenSegment}>
            {tool.segment.options.map(option => {
              const selected = option.id === segment;
              return (
                <Pressable
                  key={option.id}
                  onPress={() => setSegment(option.id)}
                  style={[
                    styles.CalculatorScreenSegmentItem,
                    selected && styles.CalculatorScreenSegmentItemOn,
                  ]}>
                  <Text
                    style={[
                      styles.CalculatorScreenSegmentLabel,
                      selected && styles.CalculatorScreenSegmentLabelOn,
                    ]}>
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        ) : null}

        <View style={styles.CalculatorScreenFields}>
          {fields.map((field, index) => {
            const numeric = Number(String(values[field.id] ?? '').replace(',', '.'));
            return (
              <View
                key={field.id}
                style={[
                  styles.CalculatorScreenField,
                  index < fields.length - 1 && styles.CalculatorScreenFieldDivider,
                ]}>
                <View style={styles.CalculatorScreenFieldRow}>
                  <Text style={styles.CalculatorScreenFieldLabel}>{field.label}</Text>
                  <View style={styles.CalculatorScreenInputShell}>
                    <TextInput
                      value={values[field.id] ?? ''}
                      onChangeText={text => updateValue(field.id, text.replace(/[^0-9.,]/g, ''))}
                      keyboardType="decimal-pad"
                      placeholder="0"
                      placeholderTextColor="rgba(235,238,245,0.3)"
                      style={styles.CalculatorScreenInput}
                    />
                    <Text style={styles.CalculatorScreenUnit}>{field.unit}</Text>
                  </View>
                </View>
                {field.slider && Number.isFinite(numeric) ? (
                  <ValueSlider
                    min={field.slider.min}
                    max={field.slider.max}
                    step={field.slider.step}
                    value={numeric}
                    onChange={next =>
                      updateValue(
                        field.id,
                        field.slider && field.slider.step < 1
                          ? next.toFixed(1)
                          : String(next),
                      )
                    }
                  />
                ) : null}
              </View>
            );
          })}
        </View>

        <View style={styles.CalculatorScreenActions}>
          <Pressable onPress={onClear} style={styles.CalculatorScreenClear}>
            <Text style={styles.CalculatorScreenClearLabel}>Clear</Text>
          </Pressable>
          <Pressable onPress={onCalculate} style={styles.CalculatorScreenCalculateWrap}>
            <LinearGradient
              colors={[colors.buttonGradientStart, colors.buttonGradientEnd]}
              start={{x: 0, y: 0.5}}
              end={{x: 1, y: 0.5}}
              style={styles.CalculatorScreenCalculate}>
              <View style={styles.CalculatorScreenCalculateInner}>
                <Image
                  source={calculatorUiIcons.calculate}
                  style={styles.CalculatorScreenCalculateIcon}
                />
                <Text style={styles.CalculatorScreenCalculateLabel}>Calculate</Text>
              </View>
            </LinearGradient>
          </Pressable>
        </View>

        {result ? (
          <LinearGradient
            colors={['rgba(28,34,48,0.98)', 'rgba(12,16,24,0.98)']}
            style={styles.CalculatorScreenResult}>
            <Text style={[styles.CalculatorScreenEyebrow, {color: tool.accent}]}>
              {result.eyebrow}
            </Text>
            <View style={styles.CalculatorScreenValueRow}>
              <Text style={styles.CalculatorScreenValue}>{result.value}</Text>
              {result.suffix ? (
                <Text style={styles.CalculatorScreenSuffix}>{result.suffix}</Text>
              ) : null}
            </View>
            <View style={styles.CalculatorScreenStats}>
              {result.stats.map(stat => (
                <View key={stat.label} style={styles.CalculatorScreenStat}>
                  <Text style={styles.CalculatorScreenStatLabel}>{stat.label}</Text>
                  <Text style={styles.CalculatorScreenStatValue}>{stat.value}</Text>
                </View>
              ))}
            </View>
            <View style={[styles.CalculatorScreenTip, {backgroundColor: `${tool.accent}14`}]}>
              <Image source={calculatorUiIcons.pin} style={styles.CalculatorScreenPin} />
              <Text style={styles.CalculatorScreenTipText}>{result.tip}</Text>
            </View>
            <View style={styles.CalculatorScreenResultActions}>
              <Pressable onPress={onSave} style={styles.CalculatorScreenSave}>
                <Image source={calculatorUiIcons.bookmark} style={styles.CalculatorScreenActionIcon} />
                <Text style={styles.CalculatorScreenSaveLabel}>Save</Text>
              </Pressable>
              <Pressable onPress={onShare} style={styles.CalculatorScreenGhost}>
                <Image source={calculatorUiIcons.share} style={styles.CalculatorScreenActionIcon} />
                <Text style={styles.CalculatorScreenGhostLabel}>Share</Text>
              </Pressable>
              <Pressable onPress={() => setResult(null)} style={styles.CalculatorScreenGhost}>
                <Image source={calculatorUiIcons.redo} style={styles.CalculatorScreenActionIcon} />
                <Text style={styles.CalculatorScreenGhostLabel}>Redo</Text>
              </Pressable>
            </View>
          </LinearGradient>
        ) : (
          <View style={styles.CalculatorScreenEmpty}>
            <Text style={styles.CalculatorScreenEmptyText}>
              Adjust the values above and tap Calculate to see your result, derived figures and tips.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  CalculatorScreenChassis: {
    backgroundColor: colors.background,
    flex: 1,
  },
  CalculatorScreenHero: {
    paddingHorizontal: 16,
  },
  CalculatorScreenNav: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    minHeight: 44,
  },

  CalculatorScreenBackRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 2,
    width: 90,
  },
  CalculatorScreenBack: {
    color: colors.orange,
    fontFamily: fonts.sansRegular,
    fontSize: 17,
  },
  CalculatorScreenNavTitle: {
    color: colors.cream,
    fontFamily: fonts.sansRegular,
    fontSize: 17,
  },

  CalculatorScreenHistory: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  CalculatorScreenHistoryIcon: {
    height: 20,
    width: 20,
  },

  CalculatorScreenGlyph: {
    height: 28,
    width: 28,
  },
  CalculatorScreenIntro: {
    flexDirection: 'row',
    marginBottom: 16,
  },

  CalculatorScreenIcon: {
    alignItems: 'center',
    borderRadius: 18,
    height: 58,
    justifyContent: 'center',
    marginRight: 14,
    width: 58,
  },
  CalculatorScreenIntroCopy: {
    flex: 1,
  },

  CalculatorScreenTitle: {
    color: colors.cream,
    fontFamily: fonts.sansBold,
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.4,
  },
  CalculatorScreenDescription: {
    color: 'rgba(235,238,245,0.6)',
    fontFamily: fonts.sansRegular,
    fontSize: 13.5,
    lineHeight: 19,
    marginTop: 4,
  },

  CalculatorScreenChipsScroll: {
    marginBottom: 0,
  },
  CalculatorScreenChips: {
    gap: 8,
    paddingBottom: 14,
    paddingLeft: 16,
    paddingRight: 0,
  },

  CalculatorScreenChip: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderColor: 'rgba(255,255,255,0.06)',
    borderRadius: 17,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  CalculatorScreenChipIcon: {
    height: 14,
    width: 14,
  },
  CalculatorScreenChipLabel: {
    color: 'rgba(235,238,245,0.72)',
    fontFamily: fonts.sansRegular,
    fontSize: 13,
  },

  CalculatorScreenSegment: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 13,
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 14,
    padding: 3,
  },
  CalculatorScreenSegmentItem: {
    alignItems: 'center',
    borderRadius: 10,
    flex: 1,
    paddingVertical: 8,
  },
  CalculatorScreenSegmentItemOn: {
    backgroundColor: 'rgba(255,255,255,0.12)',
  },

  CalculatorScreenSegmentLabel: {
    color: 'rgba(235,238,245,0.55)',
    fontFamily: fonts.sansRegular,
    fontSize: 14,
  },
  CalculatorScreenSegmentLabelOn: {
    color: colors.cream,
  },
  CalculatorScreenFields: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderColor: 'rgba(255,255,255,0.07)',
    borderRadius: 22,
    borderWidth: 1,
    marginHorizontal: 16,
    paddingHorizontal: 16,
  },

  CalculatorScreenField: {
    paddingVertical: 12,
  },
  CalculatorScreenFieldDivider: {
    borderBottomColor: 'rgba(255,255,255,0.05)',
    borderBottomWidth: 1,
  },

  CalculatorScreenFieldRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  CalculatorScreenFieldLabel: {
    color: 'rgba(235,238,245,0.85)',
    flex: 1,
    fontFamily: fonts.sansRegular,
    fontSize: 14.5,
    marginRight: 12,
  },

  CalculatorScreenInputShell: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    height: 40,
    paddingHorizontal: 12,
    width: 150,
  },
  CalculatorScreenInput: {
    color: colors.cream,
    flex: 1,
    fontFamily: fonts.sansBold,
    fontSize: 16,
    fontWeight: '700',
    padding: 0,
    textAlign: 'right',
  },

  CalculatorScreenUnit: {
    color: 'rgba(235,238,245,0.5)',
    fontFamily: fonts.sansRegular,
    fontSize: 12,
    marginLeft: 6,
  },
  CalculatorScreenActions: {
    flexDirection: 'row',
    gap: 10,
    marginHorizontal: 16,
    marginTop: 14,
  },

  CalculatorScreenClear: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 17,
    height: 54,
    justifyContent: 'center',
    width: 114,
  },
  CalculatorScreenClearLabel: {
    color: colors.cream,
    fontFamily: fonts.sansRegular,
    fontSize: 16,
  },

  CalculatorScreenCalculateWrap: {
    borderRadius: 17,
    flex: 1,
    overflow: 'hidden',
  },
  CalculatorScreenCalculate: {
    borderRadius: 17,
    overflow: 'hidden',
  },
  CalculatorScreenCalculateInner: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    height: 54,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },

  CalculatorScreenCalculateIcon: {
    height: 18,
    width: 18,
  },
  CalculatorScreenCalculateLabel: {
    color: colors.buttonText,
    fontFamily: fonts.sansBold,
    fontSize: 17,
    fontWeight: '700',
  },

  CalculatorScreenEmpty: {
    borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: 22,
    borderStyle: 'dashed',
    borderWidth: 1,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 22,
  },
  CalculatorScreenEmptyText: {
    color: 'rgba(235,238,245,0.55)',
    fontFamily: fonts.sansRegular,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },

  CalculatorScreenResult: {
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 26,
    borderWidth: 1,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 18,
  },
  CalculatorScreenEyebrow: {
    fontFamily: fonts.sansBold,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },

  CalculatorScreenValueRow: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    marginTop: 4,
  },
  CalculatorScreenValue: {
    color: colors.cream,
    fontFamily: fonts.condensedBoldItalic,
    fontSize: 52,
    fontStyle: 'italic',
    fontWeight: '700',
  },

  CalculatorScreenSuffix: {
    color: 'rgba(235,238,245,0.6)',
    fontFamily: fonts.sansRegular,
    fontSize: 16,
    marginBottom: 10,
    marginLeft: 8,
  },
  CalculatorScreenStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 14,
  },

  CalculatorScreenStat: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    width: '48%',
  },
  CalculatorScreenStatLabel: {
    color: 'rgba(235,238,245,0.5)',
    fontFamily: fonts.sansRegular,
    fontSize: 11.5,
  },
  CalculatorScreenStatValue: {
    color: colors.cream,
    fontFamily: fonts.sansBold,
    fontSize: 16,
    fontWeight: '700',
    marginTop: 4,
  },

  CalculatorScreenTip: {
    borderRadius: 14,
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
    padding: 12,
  },
  CalculatorScreenPin: {
    height: 16,
    marginTop: 2,
    width: 16,
  },

  CalculatorScreenTipText: {
    color: 'rgba(235,238,245,0.75)',
    flex: 1,
    fontFamily: fonts.sansRegular,
    fontSize: 13,
    lineHeight: 19,
  },
  CalculatorScreenResultActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
  },

  CalculatorScreenSave: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,178,63,0.16)',
    borderRadius: 14,
    flex: 1,
    flexDirection: 'row',
    gap: 6,
    height: 46,
    justifyContent: 'center',
  },
  CalculatorScreenActionIcon: {
    height: 16,
    width: 16,
  },
  CalculatorScreenSaveLabel: {
    color: colors.orange,
    fontFamily: fonts.sansBold,
    fontSize: 14,
    fontWeight: '700',
  },

  CalculatorScreenGhost: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 14,
    flex: 1,
    flexDirection: 'row',
    gap: 6,
    height: 46,
    justifyContent: 'center',
  },
  CalculatorScreenGhostLabel: {
    color: colors.cream,
    fontFamily: fonts.sansBold,
    fontSize: 14,
    fontWeight: '700',
  },
});
