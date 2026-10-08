import React from 'react';
import {Image, Pressable, ScrollView, Share, StyleSheet, Text, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {AppIcon} from '../../components/icons/AppIcon';
import {calculatorIcons, calculatorUiIcons} from '../../data/assets';
import {colors, fonts} from '../../constants/theme';
import {useCalculators, type SavedCalculation} from '../../context/CalculatorsContext';
import {getCalculatorTool} from '../../data/calculators';
import type {CalculatorsStackParamList} from '../../navigation/types';

type Props = NativeStackScreenProps<CalculatorsStackParamList, 'SavedCalculations'>;

function formatDate(timestamp: number) {
  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
}

export function SavedCalculationsScreen({navigation}: Props) {
  const insets = useSafeAreaInsets();
  const {saved, deleteCalculation} = useCalculators();

  const shareItem = async (item: SavedCalculation) => {
    const tool = getCalculatorTool(item.toolId);
    await Share.share({
      message: `${tool.title}\n${item.vehicleName}\n${item.metricLabel}: ${item.metricValue}\n${item.summary}`,
    });
  };

  return (
    <View style={styles.SavedCalculationsChassis}>
      <View style={[styles.SavedCalculationsNav, {paddingTop: insets.top + 8}]}>
        <Pressable
          onPress={() => navigation.goBack()}
          hitSlop={8}
          style={styles.SavedCalculationsBackRow}>
          <AppIcon name="back" color={colors.orange} size={20} />
          <Text style={styles.SavedCalculationsBack}>Back</Text>
        </Pressable>
        <Text style={styles.SavedCalculationsTitle}>Saved calculations</Text>
        <View style={styles.SavedCalculationsNavSpacer} />
      </View>
      <Text style={styles.SavedCalculationsMeta}>
        {saved.length} saved results · newest first
      </Text>

      {saved.length === 0 ? (
        <View style={styles.SavedCalculationsEmpty}>
          <View style={styles.SavedCalculationsEmptyIcon}>
            <Image source={calculatorUiIcons.empty} style={styles.SavedCalculationsGlyph} />
          </View>
          <Text style={styles.SavedCalculationsEmptyTitle}>No saved calculations</Text>
          <Text style={styles.SavedCalculationsEmptyBody}>
            Run any calculator and tap Save on the result card — it will appear here with its inputs, vehicle and date.
          </Text>
          <Pressable
            onPress={() => navigation.navigate('CalculatorsHome')}
            style={styles.SavedCalculationsEmptyButton}>
            <Text style={styles.SavedCalculationsEmptyButtonLabel}>Open calculators</Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{paddingBottom: insets.bottom + 24, paddingHorizontal: 16}}
          showsVerticalScrollIndicator={false}>
          {saved.map(item => {
            const tool = getCalculatorTool(item.toolId);
            return (
              <View key={item.id} style={styles.SavedCalculationsCard}>
                <View style={styles.SavedCalculationsCardHead}>
                  <View style={[styles.SavedCalculationsIcon, {backgroundColor: tool.accentSoft}]}>
                    <Image
                      source={calculatorIcons[item.toolId]}
                      style={styles.SavedCalculationsGlyph}
                    />
                  </View>
                  <View style={styles.SavedCalculationsCardCopy}>
                    <Text style={styles.SavedCalculationsCardTitle}>{tool.title}</Text>
                    <Text style={styles.SavedCalculationsCardWhen}>
                      {formatDate(item.createdAt)} · {item.vehicleName}
                    </Text>
                  </View>
                </View>
                <Text style={styles.SavedCalculationsSummary}>{item.summary}</Text>
                <Text style={styles.SavedCalculationsMetric}>{item.metricLabel}</Text>
                <Text style={[styles.SavedCalculationsValue, {color: tool.accent}]}>
                  {item.metricValue}
                </Text>
                <View style={styles.SavedCalculationsActions}>
                  <Pressable
                    onPress={() =>
                      navigation.navigate('Calculator', {
                        toolId: item.toolId,
                        savedId: item.id,
                      })
                    }
                    style={styles.SavedCalculationsOpen}>
                    <Text style={styles.SavedCalculationsOpenLabel}>Open</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => shareItem(item)}
                    style={styles.SavedCalculationsIconButton}>
                    <Image source={calculatorUiIcons.share} style={styles.SavedCalculationsGlyph} />
                  </Pressable>
                  <Pressable
                    onPress={() => deleteCalculation(item.id)}
                    style={styles.SavedCalculationsIconButton}>
                    <Image source={calculatorUiIcons.delete} style={styles.SavedCalculationsGlyph} />
                  </Pressable>
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  SavedCalculationsChassis: {
    backgroundColor: colors.background,
    flex: 1,
  },
  SavedCalculationsNav: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },

  SavedCalculationsBackRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 2,
    width: 80,
  },
  SavedCalculationsBack: {
    color: colors.orange,
    fontFamily: fonts.sansRegular,
    fontSize: 17,
  },

  SavedCalculationsTitle: {
    color: colors.cream,
    fontFamily: fonts.sansRegular,
    fontSize: 17,
  },
  SavedCalculationsNavSpacer: {
    width: 80,
  },
  SavedCalculationsMeta: {
    color: 'rgba(235,238,245,0.5)',
    fontFamily: fonts.sansRegular,
    fontSize: 13,
    marginBottom: 16,
    marginTop: 18,
    paddingHorizontal: 16,
  },

  SavedCalculationsEmpty: {
    alignItems: 'center',
    backgroundColor: 'rgba(18,22,32,0.9)',
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 24,
    borderWidth: 1,
    marginHorizontal: 16,
    marginTop: 40,
    padding: 28,
  },
  SavedCalculationsEmptyIcon: {
    alignItems: 'center',
    backgroundColor: 'rgba(61,155,255,0.16)',
    borderRadius: 18,
    height: 64,
    justifyContent: 'center',
    marginBottom: 16,
    width: 64,
  },
  SavedCalculationsEmptyTitle: {
    color: colors.cream,
    fontFamily: fonts.sansBold,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },

  SavedCalculationsEmptyBody: {
    color: 'rgba(235,238,245,0.6)',
    fontFamily: fonts.sansRegular,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 18,
    textAlign: 'center',
  },
  SavedCalculationsEmptyButton: {
    backgroundColor: colors.orangeBright,
    borderRadius: 16,
    paddingHorizontal: 22,
    paddingVertical: 12,
  },
  SavedCalculationsEmptyButtonLabel: {
    color: colors.buttonText,
    fontFamily: fonts.sansBold,
    fontSize: 16,
    fontWeight: '700',
  },

  SavedCalculationsCard: {
    backgroundColor: 'rgba(18,22,32,0.92)',
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 22,
    borderWidth: 1,
    marginBottom: 12,
    padding: 16,
  },
  SavedCalculationsCardHead: {
    flexDirection: 'row',
  },
  SavedCalculationsIcon: {
    alignItems: 'center',
    borderRadius: 14,
    height: 42,
    justifyContent: 'center',
    marginRight: 12,
    width: 42,
  },

  SavedCalculationsCardCopy: {
    flex: 1,
  },
  SavedCalculationsCardTitle: {
    color: colors.cream,
    fontFamily: fonts.sansBold,
    fontSize: 16,
    fontWeight: '700',
  },
  SavedCalculationsCardWhen: {
    color: 'rgba(235,238,245,0.55)',
    fontFamily: fonts.sansRegular,
    fontSize: 13,
    marginTop: 2,
  },

  SavedCalculationsSummary: {
    color: 'rgba(235,238,245,0.7)',
    fontFamily: fonts.sansRegular,
    fontSize: 13,
    marginTop: 12,
  },
  SavedCalculationsMetric: {
    color: 'rgba(235,238,245,0.45)',
    fontFamily: fonts.sansBold,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6,
    marginTop: 10,
    textTransform: 'uppercase',
  },

  SavedCalculationsValue: {
    fontFamily: fonts.condensedBoldItalic,
    fontSize: 28,
    fontStyle: 'italic',
    fontWeight: '700',
    marginTop: 2,
  },
  SavedCalculationsActions: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'flex-end',
    marginTop: 12,
  },

  SavedCalculationsOpen: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  SavedCalculationsOpenLabel: {
    color: colors.cream,
    fontFamily: fonts.sansBold,
    fontSize: 14,
    fontWeight: '700',
  },

  SavedCalculationsIconButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  SavedCalculationsGlyph: {
    height: 20,
    width: 20,
  },
});
