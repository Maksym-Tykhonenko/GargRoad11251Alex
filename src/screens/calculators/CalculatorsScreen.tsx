import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {AppIcon} from '../../components/icons/AppIcon';
import {calculatorIcons, calculatorUiIcons} from '../../data/assets';
import {CALCULATOR_TOOLS} from '../../data/calculators';
import {colors, fonts} from '../../constants/theme';
import {useCalculators} from '../../context/CalculatorsContext';
import type {CalculatorsStackParamList} from '../../navigation/types';

type Props = NativeStackScreenProps<CalculatorsStackParamList, 'CalculatorsHome'>;

function formatSavedDate(timestamp: number) {
  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export function CalculatorsScreen({navigation}: Props) {
  const insets = useSafeAreaInsets();
  const {saved} = useCalculators();
  const latest = saved[0];
  const grid = CALCULATOR_TOOLS.filter(tool => !tool.wide);
  const featured = CALCULATOR_TOOLS.find(tool => tool.wide);

  return (
    <View style={styles.CalculatorsScreenChassis}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + 18,
          paddingBottom: insets.bottom + 120,
          paddingHorizontal: 16,
        }}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.CalculatorsScreenEyebrow}>
          {CALCULATOR_TOOLS.length} tools · metric units
        </Text>
        <View style={styles.CalculatorsScreenHeaderRow}>
          <Text style={styles.CalculatorsScreenTitle}>Calculators</Text>
          <Pressable
            onPress={() => navigation.navigate('SavedCalculations')}
            style={styles.CalculatorsScreenSavedPill}>
            <Image source={calculatorUiIcons.bookmark} style={styles.CalculatorsScreenBookmark} />
            <Text style={styles.CalculatorsScreenSavedLabel}>Saved</Text>
            <View style={styles.CalculatorsScreenSavedBadge}>
              <Text style={styles.CalculatorsScreenSavedCount}>{saved.length}</Text>
            </View>
          </Pressable>
        </View>

        <Pressable
          onPress={() => navigation.navigate('SavedCalculations')}
          style={styles.CalculatorsScreenSavedCard}>
          <View style={styles.CalculatorsScreenSavedIcon}>
            <Image source={calculatorUiIcons.saved} style={styles.CalculatorsScreenGlyph} />
          </View>
          <View style={styles.CalculatorsScreenSavedCopy}>
            <Text style={styles.CalculatorsScreenSavedTitle}>Saved calculations</Text>
            <Text style={styles.CalculatorsScreenSavedMeta} numberOfLines={1}>
              {latest
                ? `${latest.metricValue.replace('€', '€')} · ${formatSavedDate(latest.createdAt)}`
                : 'Nothing saved yet'}
            </Text>
          </View>
          <AppIcon
            name="chevronRight"
            color="rgba(235,238,245,0.45)"
            size={20}
          />
        </Pressable>

        {featured ? (
          <Pressable
            onPress={() => navigation.navigate('Calculator', {toolId: featured.id})}
            style={styles.CalculatorsScreenWideCard}>
            <View style={styles.CalculatorsScreenCardTop}>
              <View
                style={[
                  styles.CalculatorsScreenIcon,
                  {backgroundColor: featured.accentSoft},
                ]}>
                <Image
                  source={calculatorIcons[featured.id]}
                  style={styles.CalculatorsScreenGlyph}
                />
              </View>
              <View style={styles.CalculatorsScreenBadge}>
                <Text style={styles.CalculatorsScreenBadgeText}>{featured.badge}</Text>
              </View>
            </View>
            <Text style={styles.CalculatorsScreenCardTitle}>{featured.title}</Text>
            <Text style={styles.CalculatorsScreenCardBody}>{featured.description}</Text>
            <View style={styles.CalculatorsScreenOpenRow}>
              <Text style={[styles.CalculatorsScreenOpen, {color: featured.accent}]}>
                Open
              </Text>
              <AppIcon name="chevronRight" color={featured.accent} size={16} />
            </View>
          </Pressable>
        ) : null}

        <View style={styles.CalculatorsScreenGrid}>
          {grid.map(tool => (
            <Pressable
              key={tool.id}
              onPress={() => navigation.navigate('Calculator', {toolId: tool.id})}
              style={styles.CalculatorsScreenCard}>
              <View style={styles.CalculatorsScreenCardTop}>
                <View
                  style={[
                    styles.CalculatorsScreenIcon,
                    {backgroundColor: tool.accentSoft},
                  ]}>
                  <Image
                    source={calculatorIcons[tool.id]}
                    style={styles.CalculatorsScreenGlyph}
                  />
                </View>
                <View style={styles.CalculatorsScreenBadge}>
                  <Text style={styles.CalculatorsScreenBadgeText}>{tool.badge}</Text>
                </View>
              </View>
              <Text style={styles.CalculatorsScreenCardTitle}>{tool.title}</Text>
              <Text style={styles.CalculatorsScreenCardBody} numberOfLines={3}>
                {tool.description}
              </Text>
              <View style={styles.CalculatorsScreenOpenRow}>
                <Text style={[styles.CalculatorsScreenOpen, {color: tool.accent}]}>
                  Open
                </Text>
                <AppIcon name="chevronRight" color={tool.accent} size={16} />
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  CalculatorsScreenChassis: {
    backgroundColor: colors.background,
    flex: 1,
  },
  CalculatorsScreenEyebrow: {
    color: 'rgba(235,238,245,0.55)',
    fontFamily: fonts.sansRegular,
    fontSize: 13,
    marginBottom: 6,
  },

  CalculatorsScreenHeaderRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  CalculatorsScreenTitle: {
    color: colors.cream,
    fontFamily: fonts.sansBold,
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: -0.6,
  },

  CalculatorsScreenSavedPill: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,178,63,0.16)',
    borderRadius: 16,
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  CalculatorsScreenBookmark: {
    height: 16,
    width: 16,
  },

  CalculatorsScreenSavedLabel: {
    color: colors.orange,
    fontFamily: fonts.sansBold,
    fontSize: 14,
    fontWeight: '700',
  },
  CalculatorsScreenSavedBadge: {
    alignItems: 'center',
    backgroundColor: colors.orange,
    borderRadius: 10,
    minWidth: 20,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  CalculatorsScreenSavedCount: {
    color: '#1a0d00',
    fontFamily: fonts.sansBold,
    fontSize: 12,
    fontWeight: '700',
  },

  CalculatorsScreenSavedCard: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderColor: 'rgba(255,178,63,0.35)',
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 14,
    padding: 14,
  },
  CalculatorsScreenSavedIcon: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,122,47,0.18)',
    borderRadius: 14,
    height: 44,
    justifyContent: 'center',
    marginRight: 12,
    width: 44,
  },
  CalculatorsScreenGlyph: {
    height: 22,
    width: 22,
  },

  CalculatorsScreenSavedCopy: {
    flex: 1,
  },
  CalculatorsScreenSavedTitle: {
    color: colors.cream,
    fontFamily: fonts.sansBold,
    fontSize: 16,
    fontWeight: '700',
  },
  CalculatorsScreenSavedMeta: {
    color: 'rgba(235,238,245,0.55)',
    fontFamily: fonts.sansRegular,
    fontSize: 13,
    marginTop: 2,
  },

  CalculatorsScreenWideCard: {
    backgroundColor: 'rgba(18,22,32,0.9)',
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 22,
    borderWidth: 1,
    marginBottom: 12,
    padding: 16,
  },
  CalculatorsScreenGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  CalculatorsScreenCard: {
    backgroundColor: 'rgba(18,22,32,0.9)',
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 22,
    borderWidth: 1,
    marginBottom: 12,
    minHeight: 176,
    padding: 14,
    width: '48.5%',
  },
  CalculatorsScreenCardTop: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  CalculatorsScreenIcon: {
    alignItems: 'center',
    borderRadius: 14,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },

  CalculatorsScreenBadge: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  CalculatorsScreenBadgeText: {
    color: 'rgba(235,238,245,0.7)',
    fontFamily: fonts.sansBold,
    fontSize: 11,
    fontWeight: '700',
  },

  CalculatorsScreenCardTitle: {
    color: colors.cream,
    fontFamily: fonts.sansBold,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  CalculatorsScreenCardBody: {
    color: 'rgba(235,238,245,0.6)',
    fontFamily: fonts.sansRegular,
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },

  CalculatorsScreenOpenRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 2,
    marginTop: 'auto',
  },
  CalculatorsScreenOpen: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    fontWeight: '700',
  },
});
